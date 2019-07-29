export default {
  updatePostMemory(data) {
    localStorage.setItem("post", JSON.stringify(data));
  },
  loadPostMemory() {
    return JSON.parse(localStorage.getItem("post"));
  },
  updatePortfolioMemory(data) {
    localStorage.setItem("portfolio", JSON.stringify(data));
  },
  loadPortfolioMemory() {
    return JSON.parse(localStorage.getItem("portfolio"));
  }
};
