package com.biblioteca.api.models;

import java.util.List;

public class GoogleItemVolInfo {
	public String title;
	public String subtitle;
	public List<String> authors;
	public String publisher;
	public String publishedDate;
	public String description;
	public int pageCount;
	public String printType;
	public List<String> categories;
	public String language;
	public GoogleImageLinks imageLinks;
	public List<GoogleIndustryIdentifier> industryIdentifiers;
}
