package com.ssafy.ass.dao;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.ssafy.ass.dto.PostDto;

@Mapper
public interface PostMapper {
	public List<PostDto> findAllPost();
}
