from config.env_config import dotenv_config
from config.rabbit_connection import rabbit_connection

dotenv_config()

connection = rabbit_connection()

channel = connection.channel()
channel.queue_declare(queue='TESTE2')
