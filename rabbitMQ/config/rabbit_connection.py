import os
import pika


def rabbit_connection():
    pika_credentials = pika.PlainCredentials(
        os.getenv('RABBIT_USER'),
        os.getenv('RABBIT_PASS'),
    )

    pika_parameters = pika.ConnectionParameters(
        'localhost',
        credentials=pika_credentials,
    )

    pika_connection = pika.BlockingConnection(pika_parameters)

    return pika_connection
