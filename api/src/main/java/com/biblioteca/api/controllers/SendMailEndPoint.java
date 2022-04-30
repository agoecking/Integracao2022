package com.biblioteca.api.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.api.models.Livro;

@RestController
@RequestMapping("/sendMail")
public class SendMailEndPoint {

	private static HttpURLConnection con;
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public StringBuilder sendBookToEmail(@RequestBody Livro livro) {
		String url = "https://www.googleapis.com/books/v1/volumes?q="+ livro.ISBN +"&key=AIzaSyB0VmaCm7gL1QmPta6wsWsmV1PJv8vWdCY&maxResults=1&startIndex=0";
		StringBuilder content = null;
		
        try {
 
            URL myurl = new URL(url);
            con = (HttpURLConnection) myurl.openConnection();
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Authorization", "YOUR_REST_KEY");
            con.setRequestMethod("GET");
 
            try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()))) {
 
                String line;
                content = new StringBuilder();
 
                while ((line = in.readLine()) != null) {
                    content.append(line);
                    content.append(System.lineSeparator());
                }
            }
 
        } catch (IOException e) {
			e.printStackTrace();
		} finally {
            con.disconnect();
        }
		return content;
	}
	
}
