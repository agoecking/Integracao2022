package com.biblioteca.api.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Service;

import com.biblioteca.api.models.GoogleResponse;
import com.google.gson.Gson;

@Service
public class GoogleBookAPI {
	
	private static HttpURLConnection con;
	private String googleBookAPIURL = "https://www.googleapis.com/books";
	
	public GoogleResponse getBookByISBN(String isbn) {
		String url = this.googleBookAPIURL + "/v1/volumes?"
				+ "q=" + isbn + "&"
				+ "key=AIzaSyB0VmaCm7gL1QmPta6wsWsmV1PJv8vWdCY&"
				+ "maxResults=1&"
				+ "startIndex=0";
		
		String response = this.getJSONResponseFromURL(url);
		
		GoogleResponse googleResp = new Gson().fromJson(response, GoogleResponse.class);
		
		return googleResp;
	}
	
	private String getJSONResponseFromURL(String url) {
		StringBuilder content = null;
		
        try {
 
            URL myurl = new URL(url);
            con = (HttpURLConnection) myurl.openConnection();
            con.setRequestProperty("Content-Type", "application/json");
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
        
        return content != null ? content.toString() : "";
	}
}
