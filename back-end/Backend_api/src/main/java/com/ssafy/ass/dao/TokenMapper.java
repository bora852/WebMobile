package com.ssafy.ass.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.ass.dto.TokenDto;

@Mapper
public interface TokenMapper {
	public List<TokenDto> searchAllToken();
	public TokenDto searchOnceToken(String email);
	public int deleteToken(String email);
	public int updateToken(TokenDto token);
	public int insertToken(TokenDto token);	
}
