package com.ssafy.ass.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.ass.dao.CalendarsMapper;
import com.ssafy.ass.dto.CalendarsDto;

@Service
public class CalendarsService {

	@Autowired
	private CalendarsMapper calendarsMapper;
	
	//CRUD
	public List<CalendarsDto> searchAllCalen(String user_email){
		return calendarsMapper.searchAllCalen(user_email);
	};
	
	public CalendarsDto searchOnceCalen(int idx){
		return calendarsMapper.searchOnceCalen(idx);
	};
	
	public int deleteCalen(int idx){
		return calendarsMapper.deleteCalen(idx);
	};
	
	public int updateCalen(CalendarsDto calen){
		return calendarsMapper.updateCalen(calen);
	};
	
	public int insertCalen(CalendarsDto calen){
		return calendarsMapper.insertCalen(calen);
	};
}
