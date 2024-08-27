import logger_config
import requests
import os
import traceback
import logging
import re
from dotenv import load_dotenv
from db_get_data import get_historic_cisco_data

load_dotenv()
CISCO_API_USERNAME=os.getenv("CISCO_API_USERNAME")
CISCO_API_PASSWORD=os.getenv("CISCO_API_PASSWORD")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")

def get_cisco_id(client):
    """
    Consulta la API de Cisco para obtener el identificador de Cisco asociado con la dirección IP del cliente proporcionado.
    
    La función construye la URL de la API de Cisco usando la dirección IP del cliente y las credenciales de la API 
    obtenidas de las variables de entorno. Luego, realiza una solicitud GET a esta URL y procesa la respuesta 
    para extraer el identificador de Cisco.

    Parámetros:
        client (dict): Diccionario que contiene la dirección IP del cliente bajo la clave 'ip'. 
                       El diccionario se actualiza con el identificador de Cisco bajo la clave 'cisco_id'.
    
    Retorno:
        dict: El diccionario `client` con el identificador de Cisco actualizado en la clave 'cisco_id'. 
              Si ocurre un error o si no se encuentra el identificador, se asigna un valor correspondiente 
              ('Not Found', 'Unknown Error', 'Error CISCO', o 'Unexpected Response').

    Excepciones:
        Exception: Captura cualquier excepción que ocurra durante la solicitud o procesamiento de la respuesta.

    Ejemplo de uso:
        client = {"ip": "10.225.196.21"}
        updated_client = get_cisco_id(client)
        print(updated_client["cisco_id"])
    """
    try:
        url_cisco_id = os.getenv('URL_CISCO_IP').format(ip=client["ip"], username=CISCO_API_USERNAME, password=CISCO_API_PASSWORD)
        cisco_response = requests.get(url_cisco_id, verify=False).json()
        
        # Verifica si 'queryResponse' está en la respuesta
        if 'queryResponse' in cisco_response:
            if cisco_response['queryResponse']['@count'] == 0:
                client["cisco_id"] = 'Not Found'
            elif cisco_response['queryResponse'].get('entityId'):
                client["cisco_id"] = cisco_response['queryResponse']['entityId'][0]['$']
            else:
                client["cisco_id"] = 'Unknown Error'
        elif 'errorDocument' in cisco_response:
            client["cisco_id"] = 'Error CISCO'
        else:
            client["cisco_id"] = 'Unexpected Response'
        
        return client

    except Exception as e:
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error(f'Error con el Cliente {client["ip"]}')
        logging.error("Error en la funcion `get_cisco_id` del archivo `api_cisco`")
        return client
    

    
def get_cisco_data(client):
    #* Obtiene la data del sensor del device de la api prtg
    try:
        if client["cisco_id"] == "Not Found" or client["cisco_id"] == "Error CISCO":
            client_data_backup = get_historic_cisco_data(client)
            return client_data_backup
        
        else:
            url_cisco_id = os.getenv('URL_CISCO_ID').format(cisco_id=client["cisco_id"], username=CISCO_API_USERNAME, password=CISCO_API_PASSWORD)
            cisco_client_response = requests.get(url_cisco_id, verify=False).json()
            
            cisco_client_data = cisco_client_response.get('queryResponse', {}).get('entity', [{}])[0].get('clientsDTO', {})
            client["port_cisco"] = cisco_client_data.get('clientInterface', 'Not Found')
            client["status_cisco"] = cisco_client_data.get('status', 'Not Found')
            client["device_cisco"] = cisco_client_data.get('deviceName', 'Not Found')
            client["cisco_device_ip_adrress"] = cisco_client_data.get('deviceIpAddress', {}).get('address', 'Not Found')

            prtg_device_ip_url = os.getenv('URL_PRTG_IP').format(ip=client["cisco_device_ip_adrress"], username=PRTG_USERNAME, password=PRTG_PASSWORD)
            prtg_device_ip_response = requests.get(prtg_device_ip_url, verify=False).json()
            devices_list = prtg_device_ip_response.get('devices', [])
            prtg_device_id = devices_list[0].get('objid', 'Not Found') if devices_list else 'Not Found'
            
            prtg_device_id_url = os.getenv('URL_PRTG_ID').format(id_device=prtg_device_id, username=PRTG_USERNAME, password=PRTG_PASSWORD)
            prtg_device_status_response = requests.get(prtg_device_id_url, verify=False).json()
            client["status_device_cisco"] = prtg_device_status_response.get('sensors', [{}])[0].get('status', 'Not Found')
            
            cisco_device_ip_url = os.getenv('URL_CISCO_IP_DEVICE').format(ip=client["cisco_device_ip_adrress"], username=PRTG_USERNAME, password=PRTG_PASSWORD)
            cisco_device_ip_response = requests.get(cisco_device_ip_url, verify=False).json()
            count = cisco_device_ip_response.get('queryResponse', {}).get('@count', 0)

            if count == 0:
                client["reachability_cisco"] = 'Not Found'
            else:
                cisco_device_id = cisco_device_ip_response.get('queryResponse', {}).get('entityId', [{}])[0].get('$', 'Not Found')
                cisco_device_id_url = os.getenv('URL_CISCO_ID_DEVICE').format(id_device=cisco_device_id)
                cisco_device_id_response = requests.get(cisco_device_id_url, verify=False).json()
                client["reachability_cisco"] = cisco_device_id_response.get('queryResponse', {}).get('entity', [{}])[0].get('devicesDTO', {}).get('reachability', 'Not Found')
            client["data_backup"] = "false"
            return client

        
    except Exception as e:
        # client["status_prtg"] = "Error PRTG"
        # client["last_up_prtg"] = "Error PRTG"
        # client["last_down_prtg"]= "Error PRTG"
        logging.error(e)
        logging.error(traceback.format_exc())
        # logging.error(f'Error con el Cliente {client["ip"]}')
        # logging.error("Error en la funcion `get_prtg_id` del archivo `main`")
        # return client
        pass
    
# client = {"ip": "10.225.196.21", 'cisco_id': '1321377572'}
# response = get_cisco_data(client)
# print(response)