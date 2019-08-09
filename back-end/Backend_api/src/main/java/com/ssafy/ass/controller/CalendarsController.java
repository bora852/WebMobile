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

import com.ssafy.ass.dto.CalendarsDto;
import com.ssafy.ass.service.CalendarsService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("api")
public class CalendarsController {

	@Autowired
	private CalendarsService calendarsService;

	@RequestMapping(value = "/calenAll", method = RequestMethod.GET)
	public List<CalendarsDto> calenAll(@RequestParam String user_email) throws Exception {
		System.out.println(user_email + "   :  calen test");
		System.out.println("Calendars목록 : " + calendarsService.searchAllCalen(user_email));
		return calendarsService.searchAllCalen(user_email);
	}

	@RequestMapping(value = "/calenOnce", method = RequestMethod.GET)
	public CalendarsDto calenOnce(@RequestParam int idx) throws Exception {
		return calendarsService.searchOnceCalen(idx);
	}

	@RequestMapping(value = "/calenDelete", method = RequestMethod.DELETE)
	public HashMap<String, Object> deleteCalen(@RequestParam int idx) throws Exception {
		int res = calendarsService.deleteCalen(idx);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}

	@RequestMapping(value = "/calenUpdate", method = RequestMethod.PUT)
	public HashMap<String, Object> updateCalen(@RequestBody CalendarsDto calen) throws Exception {
		int res = calendarsService.updateCalen(calen);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}

	@RequestMapping(value = "calenInsert", method = RequestMethod.POST)
	public HashMap<String, Object> insertCalen(@RequestBody CalendarsDto calen) throws Exception {
		System.out.println(calen);
		HashMap<String, Object> result = new HashMap<>();
		int res = 0;
		if (calen.getIdx() != 0) {
			res = calendarsService.updateCalen(calen);
		} else {
			res = calendarsService.insertCalen(calen);
		}
		
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
}
