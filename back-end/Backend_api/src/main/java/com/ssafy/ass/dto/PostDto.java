package com.ssafy.ass.dto;

import java.util.Date;

public class PostDto {
	String id;
	String title;
	String body;
	Date date;
 	String authority;
 	String img_address;
 	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
 
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getImg_address() {
		return img_address;
	}
 
	public void setImg_address(String img_address) {
		this.img_address = img_address;
	}

	@Override
	public String toString() {
		return "PostDto [id=" + id + ", title=" + title + ", body=" + body + ", date=" + date + ", authority="
				+ authority + ", img_address=" + img_address + "]";
	}
}
