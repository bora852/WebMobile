package com.ssafy.ass.dao;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.ssafy.ass.dto.PostDto;

@Mapper
public interface PostMapper {
	public List<PostDto> findAllPost();
	public int addPost(PostDto post);
	public PostDto searchPost(int num);
	public int deletePost(int num);
	public int updatePost(PostDto post);
}
