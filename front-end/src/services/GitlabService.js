import Api from "@/services/Api";

const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  getRepos(userName) {
    return Api(BASE_URL).get(`/users/${userName}/projects`);
  },
  getCommits(fullName) {
    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    return Api(BASE_URL).get(
      `/projects/${fullName}/repository/commits?per_page=100`
    );
  },
  getPJTList() {
    return Api(BASE_URL).get(`/projects?membership=true&per_page=5`);
  },
  getMembers() {
    return Api(BASE_URL).get("/projects/6086/members");
  },
  getMembersPJTList(userName, token) {
    return Api(BASE_URL).get(
      `/users/${userName}/projects?private_token=${token}`
    );
  }
};
