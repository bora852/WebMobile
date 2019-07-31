package com.ssafy.ass.controller;

import java.util.HashMap;
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
	public List<PortFolioDto> portAll() throws Exception {
		return portfolioService.searchAllPort();
	}
	
	@RequestMapping(value = "/portSelect", method = RequestMethod.GET)
	public PortFolioDto portSelect(@RequestParam int idx) throws Exception {
		return portfolioService.searchOncePort(idx);
	}
	
	@RequestMapping(value = "/portDelect", method = RequestMethod.DELETE)
	public HashMap<String, Object> portDelect(@RequestParam int idx) throws Exception {
		int res = portfolioService.deletePort(idx);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
	
	@RequestMapping(value = "/portUpdate", method = RequestMethod.PUT)
	public HashMap<String, Object> portUpdate(@RequestBody PortFolioDto port) throws Exception {
		
		int res = portfolioService.updatePort(port);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
	
	@RequestMapping(value = "/portInsert", method = RequestMethod.POST)
	public HashMap<String, Object> portInsert(@RequestBody PortFolioDto port) throws Exception {
		int res = portfolioService.insertPort(port);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
	
}
