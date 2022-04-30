package com.biblioteca.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.api.models.GoogleResponse;
import com.biblioteca.api.models.Livro;
import com.biblioteca.api.services.GoogleBookAPI;
import com.biblioteca.api.services.SendMail;

@RestController
@RequestMapping("/sendMail")
public class SendMailEndPoint {

	private GoogleBookAPI googleBookService = new GoogleBookAPI();
	
	@Autowired
	private SendMail sendEmailService; 
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public GoogleResponse sendBookToEmail(@RequestBody Livro livro) {
		GoogleResponse response = googleBookService.getBookByISBN(livro.ISBN);
		sendEmailService.send(response);
		return response;
	}
	
}
