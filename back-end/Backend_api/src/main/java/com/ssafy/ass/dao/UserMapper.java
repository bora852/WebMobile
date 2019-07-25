package com.ssafy.ass.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.ass.dto.UserDto;

@Mapper
public interface UserMapper {
	public List<UserDto> findAllUser();
	public UserDto searchOnceUser(String eamil);
	public int deleteUser(String email);
	public int updateUser(UserDto user);
	public int insertUser(UserDto user);
}
