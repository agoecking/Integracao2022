import requests

GOOGLE_API = "https://www.googleapis.com/books"


def google_isbn_request(isbn: str):
    url = GOOGLE_API + "/v1/volumes?" + "q=" + isbn + "&" + \
        "key=AIzaSyB0VmaCm7gL1QmPta6wsWsmV1PJv8vWdCY&" + "maxResults=1&" + "startIndex=0"

    google_response = requests.get(url)
    return google_response.json()
