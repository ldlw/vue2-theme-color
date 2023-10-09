<template>
  <div id="app">
    <div class="nav-top">
      <div class="nav-logo">
        <img src="./assets/logo.png">
      </div>
      <div class="nav-con">
        <el-menu :default-active="activeIndex" :router="true" mode="horizontal" background-color="#000000" text-color="#ffffff" active-text-color="#42b983">
          <el-menu-item v-for="item in navArr" :key="item.path" :index="item.path">{{item.name}}</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <span class="choice-color">主题颜色选择</span>
        <el-color-picker v-model="themeColor" style="vertical-align: middle;" @change="handleChangeTheme"></el-color-picker>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { changeThemeColor } from './utils/color'
const navList = [
  {
    name: '首页',
    path: '/home'
  },
  {
    name: '表单',
    path: '/form'
  },
  {
    name: '其他表单',
    path: '/others'
  }
]
export default {
  name: 'App',
  data () {
    return {
      navArr: navList,
      activeIndex: '/home',
      themeColor: '#409EFF'
    }
  },
  methods: {
    handleChangeTheme(color) {
      changeThemeColor(color)
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.nav-top {
  background-color: #000000;
  height: 60px;
  line-height: 60px;
  .nav-logo {
    float: left;
    height: 60px;
    margin-left: 100px;
    img {
      display: inline-block;
      max-height: 40px;
      vertical-align: middle;
    }
  }
}
.nav-con{
  float:left;
  margin-left: 20px;
  height: 60px;
}
.right {
  float: right;
  height: 60px;
  margin-top: 0;
  margin-right: 100px;
  color: #42b983;
  .choice-color {
   vertical-align: middle;
  }
}
</style>
