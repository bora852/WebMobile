package com.ssafy.ass.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ass.dto.CountAll;
import com.ssafy.ass.dto.PostDto;
import com.ssafy.ass.dto.TokenDto;
import com.ssafy.ass.dto.UserDto;
import com.ssafy.ass.service.PortFolioService;
import com.ssafy.ass.service.PostService;
import com.ssafy.ass.service.SendMessageService;
import com.ssafy.ass.service.TokenService;
import com.ssafy.ass.service.UserService;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api")
public class PostController {
	@Autowired
	private PostService postService;
	@Autowired
	private PortFolioService portfolioService;
	@Autowired
	private UserService userService;
	@Autowired
	private TokenService tokenService;

	private SendMessageService sendMessageService = new SendMessageService();

	@RequestMapping(value = "/postAll", method = RequestMethod.GET)
	public List<PostDto> postAll() throws Exception {
		return postService.findAllPosts();
	}

	@RequestMapping(value = "/postSelect", method = RequestMethod.GET)
	public PostDto postSelect(@RequestParam int idx) throws Exception {
		return postService.serchPost(idx);
	}

	@RequestMapping(value = "/postDelete", method = RequestMethod.DELETE)
	public HashMap<String, Object> postDelete(@RequestParam int idx) throws Exception {
		int res = postService.deletePost(idx);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		return result;
	}

	@RequestMapping(value = "/postInsert", method = RequestMethod.POST)
	public HashMap<String, Object> postAdd(@RequestBody PostDto post) throws Exception {
		int res = postService.addPost(post);
		HashMap<String, Object> result = new HashMap<>();
		if (res > 0) {
			result.put("state", "1");
		} else {
			result.put("state", "-1");
		}
		List<TokenDto> tokenlist = tokenService.searchAllToken();

		for (int tokenNum = 0; tokenNum < tokenlist.size(); tokenNum++) {
			UserDto user = userService.searchOnceUser(tokenlist.get(tokenNum).getEmail());
			if (!user.getAuthority().equals("guest")&&!post.getEmail().equals(tokenlist.get(tokenNum).getEmail())) {
				sendMessageService.MessageSend("post", tokenlist.get(tokenNum).getToken());
			}
		}
		return result;
	}

	@RequestMapping(value = "/postUpdate", method = RequestMethod.PUT)
	public HashMap<String, Object> postUpdate(@RequestBody PostDto post) throws Exception {
		int res = postService.updatePost(post);
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
		CountAll cnt = new CountAll();
		cnt.setPortfolioCount(portfolioService.countPortfolio());
		cnt.setPostCount(postService.countPost());
		return cnt;
	}
}
