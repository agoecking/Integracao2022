package com.biblioteca.api.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.api.models.GoogleResponse;
import com.biblioteca.api.models.Livro;
import com.biblioteca.api.services.GoogleBookAPI;

@RestController
@RequestMapping("/sendMail")
public class SendMailEndPoint {

	GoogleBookAPI googleBookService = new GoogleBookAPI();
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public GoogleResponse sendBookToEmail(@RequestBody Livro livro) {
		GoogleResponse response = googleBookService.getBookByISBN(livro.ISBN);
		return response;
	}
	
}
