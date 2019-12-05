import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import Less from 'Less'
import axios from 'axios'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
// import Loading from './components/loading'
import VueCordova from 'vue-cordova'
import LoadingComponent from './components/loading/Loading.vue'

Vue.use(VueCordova)
require('./assets/css/base.css')
Vue.use(Less)
Vue.use(VueRouter)

// Vue.use(Loading);

Vue.component('loading', LoadingComponent)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/err.png'),
  loading: require('./assets/images/loading.gif'),
  attempt: 1,
  listenEvents: ['scroll']
})
const router = new VueRouter({
  mode: 'history',
  scorllBehavior: () => ({
    y: 0

  }),
  routes
})
// axios的一些配置，比如发送请求显示loading，
// 请求回来loading消失之类的
// 拦截器实现，网络请求开始，进度条出现
axios.interceptors.request.use(function (config) {
  // 配置发送请求的信息
  store.dispatch('showLoading')
  return config
}, function (error) {
  return Promise.reject(error)
})
// 拦截器实现，网络请求之后，进度条消失
axios.interceptors.response.use(function (response) {
  // 配置请求回来的信息
  store.dispatch('hideLoading')
  return response
}, function (error) {
  return Promise.reject(error)
})

axios.defaults.baseURL = 'http://localhost:3333/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios
/* axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; */
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo))
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
// 路由的全局钩子，每个路由进入前都会执行
router.beforeEach((to, from, next) => {
  console.log('luyou,luyou,luyou')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.user_id) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
    console.log('================')
  } else {
    console.log('nnnnnnnnnnnnnnnnnn')
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
