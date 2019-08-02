package com.ssafy.ass.dto;

import java.util.Date;

public class UserDto {

	String email;
	Date created_at;
	String authority;
	int idx;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
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
	public int getIdx() {
		return idx;
	}
	public void setInx(int idx) {
		this.idx = idx;
	}
	@Override
	public String toString() {
		return "UserDto [email=" + email + ", created_at=" + created_at + ", authority=" + authority + ", idx=" + idx
				+ "]";
	}

	
}
