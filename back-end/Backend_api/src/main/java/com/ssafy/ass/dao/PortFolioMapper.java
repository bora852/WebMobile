package com.ssafy.ass.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.ass.dto.PortFolioDto;

@Mapper
public interface PortFolioMapper {
	public List<PortFolioDto> searchAllPort();
	public PortFolioDto searchOncePort(int idx);
	public int deletePort(int idx);
	public int updatePort(PortFolioDto port);
	public int insertPort(PortFolioDto port);
	
}
