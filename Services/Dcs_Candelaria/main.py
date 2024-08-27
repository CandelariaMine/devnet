import logger_config
import requests
import os
import time
import traceback
import datetime
import sched
import logging
import re
import mysql.connector
from dotenv import load_dotenv
from config import database
from db_connections import devnet_connection
from db_get_data import get_data_clients
from api_cisco import get_cisco_id, get_cisco_data
from api_prtg import get_prtg_id, get_prtg_data
from db_insert_historic import save_historic_data
from db_update_devnet import update_devnet_data

# Importamos las credenciales
load_dotenv()

def main():
    try:

        # Obtenemos los datos de los Clientes de la BD
        clients = get_data_clients(table_name="candelaria_clients")
        # print(clients)
        if clients is None:
            raise ValueError(
                "No se pudo establecer la conexión con la base de datos: el conector es None."
            )
    
        counter = 1
        clients_updated = []
        for client in clients:
            logging.info(f'Procesando Cliente # {counter} de {len(clients)}: {client["ip"]}')
            counter += 1
        
            client = get_prtg_id(client)
            # print(f"get_prtg_id {client}")
            client = get_prtg_data(client)
            # print(f"get_prtg_data {client}")
            client = get_cisco_id(client)
            # print(f"get_cisco_id {client}")
            client = get_cisco_data(client)
            # print(f"get_cisco_data {client}")
            clients_updated.append(client)
            now = datetime.datetime.now()
            now_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
            now_datetime = str(now_datetime)
            client["datetime"] = now_datetime
        save_historic_data(clients_updated)
        update_devnet_data(clients_updated)
            
        logging.info("Ciclo finalizado con Exito!")
                    
    except Exception:
        logging.error(traceback.format_exc())
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        # devnet_cursor.execute(f"INSERT INTO dcs.fechas_consultas_clientes (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'ERROR')")
        # db_connector.commit()
        # devnet_cursor.close()

                  
# def bucle(scheduler):
#     main()
#     scheduler.enter(300, 1, bucle, (scheduler,))

# if __name__ == '__main__':
#     s = sched.scheduler(time.time, time.sleep)
#     s.enter(0, 1, bucle, (s,))
#     s.run()

main()
    