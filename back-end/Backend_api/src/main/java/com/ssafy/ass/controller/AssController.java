package com.ssafy.ass.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ass.dto.PostDto;
import com.ssafy.ass.service.PostService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api")
public class AssController {
	@Autowired
	private PostService postService;
	@RequestMapping(value = "/postAll", method = RequestMethod.GET)
	public String postAll() throws Exception {
		System.out.println("함수호출 테스트 1");
		System.out.println("Post목록 : " + postService.findAllPosts());
		return "index.do";
	}
}
