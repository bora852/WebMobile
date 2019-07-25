package com.ssafy.ass.dto;

import java.util.Date;

public class PortFolioDto {
	String title;
	String body;
	Date date;
	String authority;
	String img_adderss;
	String user_id;
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
	public String getImg_adderss() {
		return img_adderss;
	}
	public void setImg_adderss(String img_adderss) {
		this.img_adderss = img_adderss;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}

	@Override
	public String toString() {
		return "PortPolioDto [title=" + title + ", body=" + body + ", date=" + date + ", authority=" + authority
				+ ", img_adderss=" + img_adderss + ", user_id=" + user_id + ", num=" + num + "]";
	}


}
