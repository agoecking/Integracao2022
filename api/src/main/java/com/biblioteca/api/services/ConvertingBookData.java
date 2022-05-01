package com.biblioteca.api.services;

import org.springframework.stereotype.Service;

import com.biblioteca.api.models.GoogleItem;
import com.biblioteca.api.models.GoogleItemListPrice;
import com.biblioteca.api.models.GoogleItemVolInfo;
import com.biblioteca.api.models.GoogleResponse;
import com.biblioteca.api.models.Livro;

@Service
public class ConvertingBookData {

	public Livro convertingGoogleResponseToLivro(GoogleResponse googleResponse) {
		GoogleItem item = googleResponse.items.get(0);
		GoogleItemVolInfo volume = item.volumeInfo;
		GoogleItemListPrice listPrice = item.saleInfo.listPrice;
		
		Livro livro = new Livro();
		livro.nome = volume.title;
		livro.descricao = volume.description;
		livro.img = volume.imageLinks.thumbnail;
		livro.paginas = volume.pageCount;
		livro.language = volume.language;
		livro.preco = listPrice.amount;
		livro.moeda = listPrice.currencyCode;
		
		return livro; 
	}
}
