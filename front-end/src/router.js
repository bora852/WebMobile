import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import LoginPage from "./views/LoginPage.vue";
import PortfolioWrite from "./views/PortfolioWritePage.vue";
import Repository from "./views/RepositoryPage.vue";
import SignUpPage from "./views/SignUpPage.vue";
import ChatPage from "./views/ChatPage.vue";
import AdminPage from "./views/AdminPage.vue";
import PostWritePage from "./views/PostWritePage.vue";
import PortfolioDetailPage from "./views/PortfolioDetailPage.vue";
import PortfolioEditPage from "./views/PortfolioEditPage.vue";
import PostDetailPage from "./views/PostDetailPage.vue";
import PostEditPage from "./views/PostEditPage.vue";
import CalendarsPage from "./views/CalendarsPage.vue";

Vue.use(Router);
export default new Router({
  components: {
    Vue,
    Router,
    HomePage,
    PostPage,
    PortfolioPage,
    LoginPage,
    PortfolioWrite,
    SignUpPage,
    ChatPage,
    Repository,
    AdminPage,
    PostWritePage,
    PortfolioDetailPage,
    PortfolioEditPage,
    PostDetailPage,
    PostEditPage,
    CalendarsPage
  },
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 100 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/post",
      name: "post",
      component: PostPage
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage
    },
    {
      path: "/portfolioDetail",
      name: "portfolioDetail",
      component: PortfolioDetailPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/portfolioWrite",
      name: "portfolioWrite",
      component: PortfolioWrite
    },
    {
      path: "/repository",
      name: "Repository",
      component: Repository
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpPage
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatPage
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage
    },
    {
      path: "/postWrite",
      name: "postWrite",
      component: PostWritePage
    },
    {
      path: "/portfolioEdit",
      name: "portfolioEdit",
      component: PortfolioEditPage
    },
    {
      path: "/postdetail",
      name: "postdetail",
      component: PostDetailPage
    },
    {
      path: "/postedit",
      name: "postedit",
      component: PostEditPage
    },
    {
      path: "/calendars",
      name: "calendars",
      component: CalendarsPage
    }
  ]
});
