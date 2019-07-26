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

import com.ssafy.ass.dto.CountAll;
import com.ssafy.ass.dto.PostDto;
import com.ssafy.ass.service.PortFolioService;
import com.ssafy.ass.service.PostService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api")
public class PostController {
	@Autowired
	private PostService postService;
	@Autowired
	private PortFolioService portfolioService;
	@RequestMapping(value = "/postAll", method = RequestMethod.GET)
	public List<PostDto> postAll() throws Exception {
		System.out.println("함수호출 테스트 1");
		System.out.println("Post목록 : " + postService.findAllPosts());
		return postService.findAllPosts();
	}
	@RequestMapping(value = "/postSelect", method = RequestMethod.GET)
	public PostDto postSelect(@RequestParam int idx) throws Exception {
		System.out.println("함수호출 테스트 2");
		System.out.println("Post Select : " + postService.serchPost(idx));
		return postService.serchPost(idx);
	}
	@RequestMapping(value = "/postDelete", method = RequestMethod.GET)
	public HashMap<String, Object> postDelete(@RequestParam int idx) throws Exception {
		int res = postService.deletePost(idx);
		System.out.println("함수호출 테스트 3");
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
	
	@RequestMapping(value = "/postAdd", method = RequestMethod.GET)
	public HashMap<String, Object> postAdd(@RequestBody PostDto post) throws Exception {
		int res = postService.addPost(post);
		System.out.println("함수호출 테스트 4");
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
	
	@RequestMapping(value = "/postUpdate", method = RequestMethod.GET)
	public HashMap<String, Object> postUpdate(@RequestBody PostDto post) throws Exception {
		int res = postService.updatePost(post);
		System.out.println("함수호출 테스트 5");
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}
	@RequestMapping(value = "/counting", method = RequestMethod.GET)
	public CountAll postUpdate() throws Exception {
		System.out.println("함수호출 테스트 6");
		System.out.println("Post cnt : " + postService.countPost());
		System.out.println("portfolio cnt : " + portfolioService.countPortfolio());
		CountAll cnt = new CountAll();
		cnt.setPortfolioCount(portfolioService.countPortfolio());
		cnt.setPostCount(postService.countPost());
		return cnt;
	}
}
