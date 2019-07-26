package com.ssafy.ass.controller;

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
		return  userService.findAllUser();
	}

	@RequestMapping(value = "/userSelect", method = RequestMethod.GET)
	public UserDto userSelect(@RequestParam String email) throws Exception {
		return userService.searchOnceUser(email);
	}

	@RequestMapping(value = "/userDelect", method = RequestMethod.GET)
	public int userDelect(@RequestParam String email) throws Exception {
		return userService.deleteUser(email);
	}

	@RequestMapping(value = "/userUpdate", method = RequestMethod.GET)
	public int userUpdate(@RequestBody UserDto user) throws Exception {
		return userService.updateUser(user);
	}

	@RequestMapping(value = "/userInsert", method = RequestMethod.GET)
	public int userInsert(@RequestBody UserDto user) throws Exception {
		return userService.insertUser(user);
	}
}
