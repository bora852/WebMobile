export default {
  updatePostMemory(data) {
    localStorage.setItem("post", JSON.stringify(data));
  },
  loadPostMemory() {
    return JSON.parse(localStorage.getItem("post"));
  },
  selectPostWithMemory(idx) {
    var data = JSON.parse(localStorage.getItem("post"));
    var result;
    data.forEach(element => {
      if (element.idx == idx) {
        result = element;
      }
    });
    return result;
  },
  updatePortfolioMemory(data) {
    localStorage.setItem("portfolio", JSON.stringify(data));
  },
  loadPortfolioMemory() {
    return JSON.parse(localStorage.getItem("portfolio"));
  },
  selectPortfolioWithMemory(idx) {
    var data = JSON.parse(localStorage.getItem("portfolio"));
    var result;
    data.forEach(element => {
      if (element.idx == idx) {
        result = element;
      }
    });
    return result;
  }
};
