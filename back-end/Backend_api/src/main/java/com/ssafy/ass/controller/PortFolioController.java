package com.ssafy.ass.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ass.dto.PortFolioDto;
import com.ssafy.ass.service.PortFolioService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api")
public class PortFolioController {

	@Autowired
	private PortFolioService portfolioService;
	
	@RequestMapping(value = "/portAll", method = RequestMethod.GET)
	public List<PortFolioDto> postAll() throws Exception {
		return portfolioService.searchAllPort();
	}
	
	@RequestMapping(value = "/portSelect", method = RequestMethod.GET)
	public PortFolioDto portSelect(@RequestParam int idx) throws Exception {
		return portfolioService.searchOncePort(idx);
	}
	
	@RequestMapping(value = "/portDelect", method = RequestMethod.GET)
	public int portDelect(@RequestParam int idx) throws Exception {
		return portfolioService.deletePort(idx);
	}
	
	@RequestMapping(value = "/portUpdate", method = RequestMethod.GET)
	public int portUpdate(@RequestBody PortFolioDto port) throws Exception {
		return portfolioService.updatePort(port);
	}
	
	@RequestMapping(value = "/portInsert", method = RequestMethod.GET)
	public int portInsert(@RequestBody PortFolioDto port) throws Exception {
		return portfolioService.insertPort(port);
	}
	
}
