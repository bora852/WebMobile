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

import com.ssafy.ass.dto.PostDto;
import com.ssafy.ass.dto.TokenDto;
import com.ssafy.ass.service.TokenService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api")
public class TokenController {

	@Autowired
	TokenService tokenService;

	@RequestMapping(value = "/tokenAll", method = RequestMethod.GET)
	public List<TokenDto> tokenAll() throws Exception {
		return tokenService.searchAllToken();
	}

	@RequestMapping(value = "/tokenSelect", method = RequestMethod.GET)
	public TokenDto postSelect(@RequestParam String email) throws Exception {
		return tokenService.searchOnceToken(email);
	}

	@RequestMapping(value = "/tokenDelete", method = RequestMethod.DELETE)
	public HashMap<String, Object> tokenDelete(@RequestParam String email) throws Exception {
		int res = tokenService.deleteToken(email);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}

	@RequestMapping(value = "/tokenInsert", method = RequestMethod.POST)
	public HashMap<String, Object> tokenAdd(@RequestBody TokenDto token) throws Exception {
		System.out.println("token : " + token);
		HashMap<String, Object> result = new HashMap<>();
		result.put("state", "-1");
		TokenDto tok = tokenService.searchOnceToken(token.getEmail());
		
		if (tok != null) {
			if (tok.getToken().equals(token.getToken())) {
				return result;
			}
			else {
				int res = tokenService.updateToken(token);
				if (res > 0) {
					result.put("state", "1");
				} else {
					result.put("state", "-1");
				}
				return result;
			}
		}
		int res = tokenService.insertToken(token);
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}

	@RequestMapping(value = "/tokenUpdate", method = RequestMethod.PUT)
	public HashMap<String, Object> tokenUpdate(@RequestBody TokenDto token) throws Exception {
		int res = tokenService.updateToken(token);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
}
