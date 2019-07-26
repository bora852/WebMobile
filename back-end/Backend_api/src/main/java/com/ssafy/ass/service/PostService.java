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
	
	//CRUD
	public List<PostDto> findAllPosts(){
		return postMapper.findAllPost(); 
	}
	
	public int addPost(PostDto post) {
		return postMapper.addPost(post);
	}
	
	public PostDto serchPost(int idx) {
		return postMapper.searchPost(idx);
	}
	
	public int deletePost(int idx) {
		return postMapper.deletePost(idx);
	}
	
	public int updatePost(PostDto post) {
		return postMapper.updatePost(post);
	}
}
