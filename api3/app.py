from fastapi import FastAPI
from src.routes import bookInfo

app = FastAPI()

app.include_router(bookInfo.router)


@app.get('/')
def homePage():
    return 'Hello Word.'
