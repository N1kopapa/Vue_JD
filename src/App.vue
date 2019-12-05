<template>
  <div id="app">
    <loading v-show="loading"></loading>
    <router-view></router-view>
    <NavBottomView v-show="shownav"></NavBottomView>
  </div>
</template>

<script>
  /* eslint-disable brace-style */

  import NavBottomView from './components/NavBottom.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
// mapGetters工具函数会将store中的getter映射到局部计算属性中。
// 使用对象扩展操作符把getter混入到computed中
    computed: mapGetters(['loading', 'shownav']),
    // 监听路由的变化
    watch: {
      $route (to, from) {
        if (to.path.indexOf('detail') !== -1 ||
          to.path.indexOf('cart') !== -1 ||
          to.path.indexOf('search') !== -1 ||
          to.path.indexOf('login') !== -1 ||
          to.path.indexOf('register') !== -1
        ) {
          // 使用this.$store.dispatch('xxx')分发action
          this.$store.dispatch('hideNav')
          console.log(to.path.indexOf('detail'), '-----')
        }
        else {
          this.$store.dispatch('showNav')
          console.log(to.path.indexOf('detail'), '==========')
        }
      }
    },
    components: {
      NavBottomView
    }
  }
</script>

<style>
  @import './assets/css/index.css';
</style>

