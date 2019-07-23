import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import LoginPage from './views/LoginPage.vue'
import WritePortfolio from './views/WritePortfolioPage.vue'

import Repository from './views/RepositoryPage.vue'
import SignUpPage from './views/SignUpPage.vue'
import ChatPage from './views/ChatPage.vue'

Vue.use(Router);
export default new Router({
  components: {
    Vue,
    Router,
    HomePage,
    PostPage,
    PortfolioPage,
    LoginPage,
    WritePortfolio,
    SignUpPage,
    ChatPage,
    Repository,
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/post',
      name: 'post',
      component: PostPage
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/writePortfolio',
      name: 'writePortfolio',
      component: WritePortfolio
    },
    {
      path: '/repository',
      name: 'Repository',
      component: Repository
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatPage
    }
  ]
})
