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
	
	public int addPost(PostDto post) {
		return postMapper.addPost(post);
	}
	
	public PostDto serchPost(int num) {
		return postMapper.searchPost(num);
	}
	
	public int deletePost(int num) {
		return postMapper.deletePost(num);
	}
	
	public int updatePost(PostDto post) {
		return postMapper.updatePost(post);
	}
}
