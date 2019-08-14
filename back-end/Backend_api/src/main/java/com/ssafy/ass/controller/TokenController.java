package com.ssafy.ass.controller;

import java.util.ArrayList;
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
import com.ssafy.ass.dto.UserDto;
import com.ssafy.ass.service.TokenService;
import com.ssafy.ass.service.UserService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api")
public class TokenController {

	@Autowired
	TokenService tokenService;
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/tokenAll", method = RequestMethod.GET)
	public List<TokenDto> tokenAll() throws Exception {
		return tokenService.searchAllToken();
	}
	@RequestMapping(value = "/adminSelect", method = RequestMethod.GET)
	public List<String> adminSelect() throws Exception{
		List<TokenDto> tokenlist = tokenService.searchAllToken();
		List<String> adminList = new ArrayList<String>();
		UserDto userTemp = new UserDto();
		for(int token_num=0; token_num<tokenlist.size();token_num++) {
			 userTemp = userService.searchOnceUser(tokenlist.get(token_num).getEmail());
			if(userTemp.getAuthority().equals("admin")) {
				adminList.add(tokenlist.get(token_num).getToken());
			}
		}
		return adminList;
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
