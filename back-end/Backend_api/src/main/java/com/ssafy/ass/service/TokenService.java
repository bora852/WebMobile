package com.ssafy.ass.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.ass.dao.TokenMapper;
import com.ssafy.ass.dto.TokenDto;
@Service
public class TokenService {
	
	@Autowired
	TokenMapper tokenmapper;
	
	public List<TokenDto> searchAllToken(){
		return tokenmapper.searchAllToken();
	}
	public TokenDto searchOnceToken(String email) {
		return tokenmapper.searchOnceToken(email);
	}
	public int deleteToken(String email) {
		return tokenmapper.deleteToken(email);
	}
	public int updateToken(TokenDto token) {
		return tokenmapper.updateToken(token);
	}
	public int insertToken(TokenDto token) {
		return tokenmapper.insertToken(token);
	}
}
