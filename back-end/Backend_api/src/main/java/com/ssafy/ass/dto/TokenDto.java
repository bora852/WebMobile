package com.ssafy.ass.dto;

public class TokenDto {
	String authority;
	String email;
	String token;
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
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	@Override
	public String toString() {
		return "TokenDto [authority=" + authority + ", email=" + email + ", token=" + token + "]";
	}
}
