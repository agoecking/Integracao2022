from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from ..services.GoogleISBNRequest import google_isbn_request
from ..services.turnGoogleResponseToBook import turn_google_response_to_book

router = APIRouter()


@router.get('/getBookInfo')
def homePage(isbn: str):
    google_response = google_isbn_request(isbn)
    response_data = turn_google_response_to_book(google_response)
    return response_data
