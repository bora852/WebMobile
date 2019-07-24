package com.ssafy.ass.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.ass.dao.PostMapper;
import com.ssafy.ass.dto.PostDto;

@Service
public class PostService {
	@Autowired
	private PostMapper postMapper;
	
	public List<PostDto> findAllPosts(){
		return postMapper.findAllPost();
	}
}
