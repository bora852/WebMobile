package com.ssafy.ass.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.ass.dao.PortFolioMapper;
import com.ssafy.ass.dto.PortFolioDto;

@Service
public class PortFolioService {

	@Autowired
	private PortFolioMapper portfolioMapper;

	//CRUD
	public List<PortFolioDto> searchAllPort(){
		return portfolioMapper.searchAllPort();
	}

	public PortFolioDto searchOncePort(int idx){
		return portfolioMapper.searchOncePort(idx);
	}

	public int deletePort(int idx){
		return portfolioMapper.deletePort(idx);
	}

	public int updatePort(PortFolioDto port){
		return portfolioMapper.updatePort(port);
	}

	public int insertPort(PortFolioDto port){
		return portfolioMapper.insertPort(port);
	} 
	public int countPortfolio() {
		return portfolioMapper.countPortfolio();
	}
}
