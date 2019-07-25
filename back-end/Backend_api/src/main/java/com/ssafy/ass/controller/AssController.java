package com.ssafy.ass.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	public int postDelete(@RequestParam int idx) throws Exception {
		System.out.println("함수호출 테스트 3");
		System.out.println("Post Delete : " + postService.deletePost(idx));
		return postService.deletePost(idx);
	}
	
	@RequestMapping(value = "/postAdd", method = RequestMethod.GET)
	public int postAdd(@RequestBody PostDto post) throws Exception {
		System.out.println("함수호출 테스트 4");
		System.out.println("Post Add : " + postService.addPost(post));
		return postService.addPost(post);
	}
	
	@RequestMapping(value = "/postUpdate", method = RequestMethod.GET)
	public int postUpdate(@RequestBody PostDto post) throws Exception {
		System.out.println("함수호출 테스트 5");
		System.out.println("Post Update : " + postService.updatePost(post));
		return postService.updatePost(post);
	}
	
}
