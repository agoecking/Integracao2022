package com.biblioteca.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.api.models.GoogleResponse;
import com.biblioteca.api.models.Livro;
import com.biblioteca.api.services.ConvertingBookData;
import com.biblioteca.api.services.GoogleBookAPI;

@RestController
@RequestMapping("/book")
public class GetBookInformation {

	@Autowired
	private GoogleBookAPI googleBookService;
	
	@Autowired
	private ConvertingBookData convertingBookDataService;
	
	@GetMapping(produces = "application/json")
	public Livro getBookInfoByISBN(@RequestParam(name = "isbn") String isbn) {
		GoogleResponse ggResponse = googleBookService.getBookByISBN(isbn);
		Livro livro = convertingBookDataService.convertingGoogleResponseToLivro(ggResponse);
		return livro;
	}
}
