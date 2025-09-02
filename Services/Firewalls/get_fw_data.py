import paramiko
import netmiko
import time
import re
import logging
import traceback
import logger_config
import os
from dotenv import load_dotenv
from netmiko import ConnectHandler

load_dotenv()
NETMIKO_USER = os.getenv("NETMIKO_USER")
NETMIKO_PASSWORD = os.getenv("NETMIKO_PASSWORD")


def diagnose_fw_vdom(host, vdom, channelFw, ssh_timeout=45):
    """
    Diagnostica el estado de la salud de una conexión SD-WAN en un dispositivo FortiGate.

    Esta función se conecta a un dispositivo FortiGate a través de SSH, ejecuta comandos en el contexto de `config vdom`
    para diagnosticar el estado de la conexión SD-WAN y analiza la salida para extraer información sobre el estado, pérdida
    de paquetes, latencia y jitter. En este caso es obligatorio el uso de la libreria paramiko en vez de netmiko debido
    a que esta tiene la capacidad de genera subterminales en la terminal principal (virtual domain - vdom)

    Args:
        host (str): La dirección IP o nombre del host del dispositivo FortiGate.
        vdom (str): El nombre del VDOM a diagnosticar. Usa "N/A" para el VDOM predeterminado.
        channel (str): El canal que se va a diagnosticar.
        ssh_timeout (int, opcional): Tiempo de espera en segundos para la conexión SSH. El valor predeterminado es 45.

    Returns:
        dict: Un diccionario con el estado de la conexión SD-WAN, pérdida de paquetes, latencia y jitter. Los valores
              estarán en el formato adecuado o "Not Found" si no se encuentran en la salida. En caso de error, se
              devolverá un diccionario con "Error DevNet" para cada campo.

    Raises:
        Exception: Si ocurre un error durante la conexión SSH o la ejecución de comandos, se registrará el error y se
                   devolverán valores de error en el diccionario de resultados.
    """
    try:

        # Crear una instancia SSHClient de Paramiko
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Conectar al dispositivo
        client.connect(
            hostname=host,
            port=2221,
            username=NETMIKO_USER,
            password=NETMIKO_PASSWORD,
            timeout=ssh_timeout,
        )

        # Abrir un canal SSH
        channel = client.invoke_shell()

        # Enviar el comando 'config vdom'zz
        channel.send("config vdom\n")
        time.sleep(1)  # Esperar para que el comando se procese

        # Enviar otros comandos dentro del contexto 'config vdom'
        commands = [
            f"edit {vdom}\n",
            "diagnose sys sdwan health-check Check_Internet\n",
            "exit\n",  # Salir del contexto 'config vdom'
        ]

        for command in commands:
            channel.send(command)
            time.sleep(1)  # Esperar para que el comando se procese

        channel.close()
        client.close()
        # Recopilar la salida
        output = ""
        while channel.recv_ready():
            output += channel.recv(1024).decode("utf-8")
        # print(output)
        # Verificar si ocurrió un fallo en el comando
        if "Command fail" in output:
            logging.warning("Fallo detectado, intentando enviar nuevos comandos.")
            # Crear una instancia SSHClient de Paramiko
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            # Conectar al dispositivo
            client.connect(
                hostname=host,
                port=2221,
                username=NETMIKO_USER,
                password=NETMIKO_PASSWORD,
                timeout=ssh_timeout,
            )

            # Abrir un canal SSH
            channel = client.invoke_shell()

            # Enviar el comando 'config vdom'
            channel.send("config vdom\n")
            time.sleep(1)  # Esperar para que el comando se procese

            # Enviar otros comandos dentro del contexto 'config vdom'
            newcommands = [
                f"edit {vdom}\n",
                "diagnose sys sdwan health-check status\n",
                "exit\n",  # Salir del contexto 'config vdom'
            ]

            for command in newcommands:
                channel.send(command)
                time.sleep(1)  # Esperar para que el comando se procese
            channel.close()
            client.close()

            while channel.recv_ready():
                output += channel.recv(1024).decode("utf-8")
            logging.info(output)

        # Analizar la salida con regex
        pattern = r"Seq\(\d+ ([^\)]+)\): state\(([^)]+)\), packet-loss\(([^)]+)\)(?: latency\(([^)]+)\), jitter\(([^)]+)\))?.*"
        matches = re.findall(pattern, output)

        # Inicializamos return
        data = {
            "state": "Not Found",
            "packet_loss": "Not Found",
            "latency": "Not Found",
            "jitter": "Not Found",
        }

        for match in matches:
            try:
                output_channel = match[0]
                if output_channel == channelFw:
                    state = match[1]
                    packet_loss = match[2]
                    packet_loss = packet_loss.replace("%", "")
                    latency = match[3] if match[3] else "Not Found"
                    jitter = match[4] if match[4] else "Not Found"

                    data = {
                        "state": state,
                        "packet_loss": packet_loss,
                        "latency": latency,
                        "jitter": jitter,
                    }

                    return data

            except IndexError:
                logging.error(traceback.format_exc())
                logging.error("Error en el archivo vdom funcion vdom_connection")
                logging.error("No se encuentra regex en el output del comando")
                return data

        return data

    except Exception as e:
        errData = {
            "state": "Error DevNet",
            "packet_loss": "Error DevNet",
            "latency": "Error DevNet",
            "jitter": "Error DevNet",
        }
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en el archivo VDOM funcion vdom_connection")
        logging.error(host, vdom, channelFw)
        return errData


def diagnose_fw(host, channel):
    """
    Realiza un diagnóstico del estado de la conexión SD-WAN en un dispositivo FortiGate.

    Esta función se conecta a un dispositivo FortiGate utilizando Netmiko, ejecuta un comando para verificar la salud de
    la conexión SD-WAN y analiza la salida para extraer información sobre el estado, pérdida de paquetes, latencia y jitter.

    Args:
        host (str): La dirección IP o nombre del host del dispositivo FortiGate.
        channel (str): El canal que se va a diagnosticar.

    Returns:
        dict: Un diccionario con el estado de la conexión SD-WAN, pérdida de paquetes, latencia y jitter. Los valores
              estarán en el formato adecuado o "Not Found" si no se encuentran en la salida. En caso de error, se
              devolverá un diccionario con "Error DevNet" para cada campo.

    Raises:
        Exception: Si ocurre un error durante la conexión o la ejecución de comandos, se registrará el error y se
                   devolverán valores de error en el diccionario de resultados.
    """
    try:
        network_device_list = {
            "host": host,
            "username": NETMIKO_USER,
            "password": NETMIKO_PASSWORD,
            "device_type": "fortinet",
            "port": 2221,
            "timeout": 10000,
        }

        net_connect = ConnectHandler(**network_device_list)

        output = None
        output = net_connect.send_command("diagnose sys sdwan health-check Check_Internet")
        if "Command fail" in output:
            output = net_connect.send_command("diagnose sys sdwan health-check status")

        net_connect.disconnect()

        # Inicializamos return
        data = {
            "state": "Not Found",
            "packet_loss": "Not Found",
            "latency": "Not Found",
            "jitter": "Not Found",
        }

        if "Health Check" in output:
            pattern = r"Seq\(\d+ ([^\)]+)\): state\(([^)]+)\), packet-loss\(([^)]+)\)(?: latency\(([^)]+)\), jitter\(([^)]+)\))?.*"
            matches = re.findall(pattern, output)
            for match in matches:
                try:
                    canal = match[0]
                    if canal == channel:
                        state = match[1]
                        packet_loss = match[2]
                        packet_loss = packet_loss.replace("%", "")
                        latency = match[3] if match[3] else "Not Found"
                        jitter = match[4] if match[4] else "Not Found"

                        data = {
                            "state": state,
                            "packet_loss": packet_loss,
                            "latency": latency,
                            "jitter": jitter,
                        }

                        return data

                except IndexError:
                    logging.error(traceback.format_exc())
                    logging.error("Error en el archivo vdom funcion vdom_connection")
                    logging.error("No se encuentra regex en el output del comando")
                    logging.error(host, channel)
                    return errData

            return data

    except Exception as e:
        errData = {
            "state": "Error DevNet",
            "packet_loss": "Error DevNet",
            "latency": "Error DevNet",
            "jitter": "Error DevNet",
        }
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en el archivo VDOM funcion vdom_connection")
        return errData


def numUsers_fw_vdom(host, vdom, ssh_timeout=45):
    """
    Obtiene el número total de usuarios logueados en un VDOM específico de un dispositivo FortiGate.

    Esta función se conecta a un dispositivo FortiGate a través de SSH, entra en el contexto del VDOM especificado, 
    ejecuta un comando para obtener el número total de usuarios logueados y analiza la salida para extraer este número.

    Args:
        host (str): La dirección IP o nombre del host del dispositivo FortiGate.
        vdom (str): El nombre del VDOM del cual obtener el número de usuarios.
        ssh_timeout (int, opcional): Tiempo de espera en segundos para la conexión SSH. El valor predeterminado es 45.

    Returns:
        int or str: El número total de usuarios logueados en el VDOM. Si no se encuentra el número o ocurre un error,
                    se devuelve "Not Found".

    Raises:
        TimeoutError: Si ocurre un error de tiempo de espera durante la conexión SSH o la ejecución de comandos,
                      se registrará el error y se devolverá "Not Found".
    """
    client = None
    channel = None
    try:

        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        client.connect(
            hostname=host,
            port=2221,
            username=NETMIKO_USER,
            password=NETMIKO_PASSWORD,
            timeout=ssh_timeout,
        )

        channel = client.invoke_shell()

        channel.send("config vdom\n")
        time.sleep(1)

        commands = [
            f"edit {vdom}\n",
            "diagnose debug authd fsso list | grep 'Total number'\n",
            "exit\n",
        ]

        for command in commands:
            channel.send(command)
            time.sleep(1)

        output = ""
        while channel.recv_ready():
            output += channel.recv(1024).decode("utf-8")

        # Usamos una expresión regular para encontrar el número en la última línea
        result = re.search(r"Total number of logons listed:\s*(\d+)", output)

        if result:
            # Si se encuentra el número, lo extraemos
            number = int(result.group(1))
        else:
            number = "Not Found"
        return number

    except TimeoutError as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error("Error en el archivo VDOM funcion numUsers_fw_vdom")
        return "Not Found"

    finally:
        if channel:
            channel.close()
        if client:
            client.close()


def numUsers_fw(host):
    """
    Obtiene el número total de usuarios logueados en un dispositivo FortiGate.

    Esta función se conecta a un dispositivo FortiGate utilizando Netmiko, ejecuta un comando para obtener el número total
    de usuarios logueados y analiza la salida para extraer este número.

    Args:
        host (str): La dirección IP o nombre del host del dispositivo FortiGate.

    Returns:
        str: El número total de usuarios logueados en el dispositivo. Si no se encuentra el número o ocurre un error,
             se devuelve "Not Found".

    Raises:
        Exception: Si ocurre un error durante la conexión o la ejecución del comando, se registrará el error y se
                   devolverá "Not Found".
    """
    try:
        network_device_list = {
            "host": host,
            "username": NETMIKO_USER,
            "password": NETMIKO_PASSWORD,
            "device_type": "fortinet",
            "port": 2221,
        }

        net_connect = ConnectHandler(**network_device_list)
        output = net_connect.send_command(
            "diagnose debug authd fsso list | grep 'Total number'"
        )
        net_connect.disconnect()
        match = re.search(r"\b(\d+)\b", output)
        if match:
            number = match.group(0)  # Cambia group(1) a group(0)
            return number
        else:
            number = "Not Found"
            return number

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error("Error en el archivo VDOM funcion numUsers_fw_vdom")
        return "Not Found"


# print(diagnose_fw_vdom(host="10.224.113.129", channelFw="port7", vdom="Villa"))
