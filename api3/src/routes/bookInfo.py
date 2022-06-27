from fastapi import APIRouter
from ..controller import InfoBookISBN

router = APIRouter()

router.include_router(InfoBookISBN.router)
