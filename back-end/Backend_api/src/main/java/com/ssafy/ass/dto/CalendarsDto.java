package com.ssafy.ass.dto;

import java.util.Date;

public class CalendarsDto {
	int idx;
	String title;
	String body;
	Date created_at;
	String email;
	
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
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
	public Date getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Override
	public String toString() {
		return "CalendarsDto [idx=" + idx + ", title=" + title + ", body=" + body + ", created_at=" + created_at
				+ ", email=" + email + "]";
	}
	
	
}
