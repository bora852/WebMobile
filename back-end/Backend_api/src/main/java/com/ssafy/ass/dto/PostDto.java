package com.ssafy.ass.dto;

import java.util.Date;

public class PostDto {
	String title;
	String body;
	Date date;
 	String authority;
 	String User_id;
 	int num;
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
	public String getUser_id() {
		return User_id;
	}
	public void setUser_id(String user_id) {
		User_id = user_id;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	@Override
	public String toString() {
		return "PostDto [title=" + title + ", body=" + body + ", date=" + date + ", authority=" + authority
				+ ", User_id=" + User_id + ", num=" + num + "]";
	}
}
