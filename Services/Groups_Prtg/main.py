import requests
import warnings
import os
import datetime
import time
import calendar
import mysql.connector
import logging
import traceback
import sched
from config import database
from dotenv import load_dotenv

import logger_config
from db_update_devnet import datetime_register, update_devnet_data
from db_get_data import get_data


load_dotenv()

PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def main():
    try:
        print("Inicia")
        # Obtenemos informacion de la BD de prod
        data_prtg_groups = get_data(table_name="data_prtg_groups")
        counter = 1
        print(data_prtg_groups)
        # En esta lista almacenamos todos los datos
        final_data = []

        for group_element in data_prtg_groups:
            logging.info(f"# {counter}: {group_element['prtg_id']}")
            counter += 1
            api_endpoint = os.getenv("GROUP_PRTG").format( id_group=group_element["prtg_id"], username=PRTG_USERNAME, password=PRTG_PASSWORD, )
            api_request = requests.get(api_endpoint, verify=False).json()
            data = api_request["sensors"]

            if data != []:
                for elem in data:
                    elem["rol"] = group_element["rol"]
                    elem["first_down_datetime"] = None
                    if "Up" in group_element['status'] and "Down" in elem['status']:
                        elem["first_down_datetime"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    elif "Down" in group_element['status'] and "Down" not in elem['status']:
                        elem["first_down_datetime"] = None
                    print(elem)
                    final_data.append(elem)

        db_response = update_devnet_data(final_data)

        if db_response == True:
            datetime_register(system_name="groups_prtg", status="OK")
        else:
            datetime_register(system_name="groups_prtg", status="ERROR")

        logging.info("Datos actualizados")

    except Exception as e:
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error(f"Error en main")
        datetime_register(system_name="groups_prtg", status="ERROR")


def bucle(scheduler):
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
