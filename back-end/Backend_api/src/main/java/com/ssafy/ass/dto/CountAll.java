package com.ssafy.ass.dto;

public class CountAll {
	int postCount;
	int portfolioCount;
	public int getPostCount() {
		return postCount;
	}
	public void setPostCount(int postCount) {
		this.postCount = postCount;
	}
	public int getPortfolioCount() {
		return portfolioCount;
	}
	public void setPortfolioCount(int portfolioCount) {
		this.portfolioCount = portfolioCount;
	}
	@Override
	public String toString() {
		return "CountAll [postCount=" + postCount + ", portfolioCount=" + portfolioCount + "]";
	}
	
	
	
}
