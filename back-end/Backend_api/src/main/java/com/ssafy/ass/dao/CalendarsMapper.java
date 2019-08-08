package com.ssafy.ass.dao;


import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.ssafy.ass.dto.CalendarsDto;

@Mapper
public interface CalendarsMapper {
	public List<CalendarsDto> searchAllCalen(String user_email);
	public CalendarsDto searchOnceCalen(int idx);
	public int deleteCalen(int idx);
	public int updateCalen(CalendarsDto calen);
	public int insertCalen(CalendarsDto calen);
}
