from ..model.BookInfoRequest import Book


def turn_google_response_to_book(google_response):
    item = google_response['items'][0]
    volume = item['volumeInfo']
    listPrice = item['saleInfo']['listPrice']

    book: Book = Book()
    book.nome = volume['title']
    book.descricao = volume['description']
    book.img = volume['imageLinks']['thumbnail']
    book.paginas = volume['pageCount']
    book.language = volume['language']
    book.preco = listPrice['amount']
    book.moeda = listPrice['currencyCode']

    return book
