package com.biblioteca.api.services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.biblioteca.api.models.EmailDTO;
import com.biblioteca.api.models.GoogleItem;
import com.biblioteca.api.models.GoogleItemVolInfo;
import com.biblioteca.api.models.GoogleResponse;
import com.biblioteca.api.models.LivroRequest;

@Service
public class SendMail {
	
	@Autowired
	private JavaMailSender emailSender;
	
	public void send(GoogleResponse googleResponse, LivroRequest livroRequest) {
		EmailDTO emailBody = this.generateEmailBody(googleResponse, livroRequest);
		this.pushEmail(emailBody);
	}
	
	private EmailDTO generateEmailBody(GoogleResponse ggResp, LivroRequest livroRequest) {
		EmailDTO bodyMail = new EmailDTO();
		
		GoogleItem item = ggResp.items.get(0);
		GoogleItemVolInfo volume = item.volumeInfo;
		
		bodyMail.bookName = volume.title;
		bodyMail.categories = volume.categories;
		bodyMail.description = volume.description;
		bodyMail.img = volume.imageLinks.thumbnail;
		bodyMail.language = volume.language;
		bodyMail.pages = volume.pageCount;
		bodyMail.subject = livroRequest.type.toUpperCase() +" - " + volume.title;
		bodyMail.title = "TYPE";
		
		return bodyMail;
	}
	
	private void pushEmail(EmailDTO emailBody) {
		try {
			MimeMessage message = emailSender.createMimeMessage();
			message.setSubject(emailBody.subject);

			MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

			helper.setFrom("gregorisimei2@gmail.com");
			helper.setTo("gregorisimei@gmail.com");
			
			String mailStructure = this.generateHTMLMail(emailBody);
			helper.setText(mailStructure, true);
			
			emailSender.send(message);
		}
		catch (MailException e){
			System.out.print("Erro ao enviar");	
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private String generateHTMLMail(EmailDTO email) {
		String html = "";
		
		html += "<div style='border: 1px solid black; margin: 5px; padding: 5px; display: flex; flex-direction: row;'>";
		
		html += "<div>";
		html += "<img src=\"" + email.img + "\"/>";
		html += "</div>";
		
		html += "<div style='border: 1px solid black; margin: 0px 0px 0px 5px; padding: 5px; width: auto'>";
		html += "<p>";
		html += "<b>Título: </B>" + email.bookName + ".";
		html += "</p>";
		
		html += "<p>";
		html += "<b>Descrição: </B>" + email.description + ".";
		html += "</p>";
		
		html += "<p>";
		html += "<b>Linguagem: </B>" + email.language.toUpperCase();
		html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		html += "<b>Páginas: </B>" + email.pages;
		html += "</p>";
		html += "</div>";
		
		html += "</div>";
		
		return html;
	}
}
