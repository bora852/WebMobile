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

import com.ssafy.ass.dto.UserDto;
import com.ssafy.ass.service.UserService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/userAll", method = RequestMethod.GET)
	public List<UserDto> userAll() throws Exception {
		return userService.findAllUser();
	}

	@RequestMapping(value = "/userSelect", method = RequestMethod.GET)
	public UserDto userSelect(@RequestParam String email) throws Exception {
		return userService.searchOnceUser(email);
	}

	@RequestMapping(value = "/userDelete", method = RequestMethod.DELETE)
	public HashMap<String, Object> userDelect(@RequestParam String email) throws Exception {
		int res = userService.deleteUser(email);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}

	@RequestMapping(value = "/userUpdate", method = RequestMethod.PUT)
	public HashMap<String, Object> userUpdate(@RequestBody UserDto user) throws Exception {
		String user_authority = userService.searchOnceUser(user.getEmail()).getAuthority();
		int res = -1;
		HashMap<String, Object> result = new HashMap<>();
		result.put("state", "-1");
		if (user_authority.equals("admin")) {
			int admin_num = userService.countUserAdmin();
			if (admin_num == 1) {
				return result;
			}
		}
		user.setEmail(user.getEmail());
		user.setAuthority(user.getAuthority());
		res = userService.updateUser(user);
		if (res > 0) {
			result.put("state", "1");
		}
		return result;

	}

	@RequestMapping(value = "/userInsert", method = RequestMethod.POST)
	public HashMap<String, Object> userInsert(@RequestBody UserDto user) throws Exception {
		int res = userService.insertUser(user);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
}
