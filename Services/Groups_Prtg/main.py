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


warnings.filterwarnings("ignore", message="Unverified HTTPS request")

logging.basicConfig(level=logging.INFO, format="%(message)s")
file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter("%(message)s"))
logging.getLogger().addHandler(file_handler)

load_dotenv()
env = os.getenv("ENVIRONMENT")


def database_connection():
    try:
        if env == "local":
            mydb = mysql.connector.connect(
                host=database["local"]["DB_HOST"],
                user=database["local"]["DB_USER"],
                password=database["local"]["DB_PASSWORD"],
                database=database["local"]["DB_DATABASE"],
            )

        else:
            mydb = mysql.connector.connect(
                host=database["production"]["DB_HOST"],
                user=database["production"]["DB_USER"],
                password=database["production"]["DB_PASSWORD"],
                database=database["production"]["DB_DATABASE"],
            )
        return mydb

    except Exception as e:
        logging.error("Error al conectarse a la base de datos")
        logging.error(traceback.format_exc())
        logging.error(e)


def get_data():
    try:
        mydb = database_connection()
        cursor = mydb.cursor()

        # En esta lista almacenamos todos los datos
        prtg_data = []
        
        # lista de id de los grupos de prtg
        id_list = [15959, 18016, 8681, 4418, 14635, 10160]

        for id_group in id_list:
            api_endpoint = os.getenv("GROUP_PRTG").format(id_group=id_group)
            api_request = requests.get(api_endpoint, verify=False).json()
            data = api_request["sensors"]
            if data:
                prtg_data.extend(data)
            
        # Guardamos en la base de datos
        values = [(item["device"], item["group"], item["status"], item["objid"]) for item in prtg_data]
        query = """
                INSERT INTO dcs.prtg_groups (`name`, `group`, `status`, `id_prtg`)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE `status` = VALUES(`status`)
                """
        cursor.executemany(query, values)
        mydb.commit()
        cursor.close()

        logging.info("Datos actualizados")

    except Exception as e:
        logging.error(f"Error")
        logging.error(e)
        logging.error(traceback.format_exc())



def bucle(scheduler):
    get_data()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()