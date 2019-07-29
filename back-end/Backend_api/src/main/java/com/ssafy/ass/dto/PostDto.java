package com.ssafy.ass.dto;

import java.util.Date;

public class PostDto {
	String title;
	String body;
	Date created_at;
 	String authority;
 	String email;
 	int idx;
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
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	@Override
	public String toString() {
		return "PostDto [title=" + title + ", body=" + body + ", created_at=" + created_at + ", authority=" + authority
				+ ", email=" + email + ", idx=" + idx + "]";
	}
 	
	
}
