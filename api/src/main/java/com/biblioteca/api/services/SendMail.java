package com.biblioteca.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.biblioteca.api.models.GoogleResponse;

@Service
public class SendMail {
	
	@Autowired
	private JavaMailSender emailSender;
	
	public void send(GoogleResponse googleResponse) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom("gregorisimei2@gmail.com");
			message.setTo("gregorisimei@gmail.com");
			message.setSubject("TESTE");
			message.setText("Enviou");
			emailSender.send(message);
		}
		catch (MailException e){
			System.out.print("Erro ao enviar");	
		}
	}
}
