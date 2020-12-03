<template>
  <div id="app">
    <router-view></router-view>
    <TabBar>
      <TabBarItem path='/home'>
        <img src="./assets/img/tabbar/home.svg" slot="icon">
        <img src="./assets/img/tabbar/home-active.svg" slot="icon-active">
        <div slot="text">首页</div> 
      </TabBarItem>
      <TabBarItem path='/catagory'>
        <img src="./assets/img/tabbar/catagory.svg" slot="icon">
        <img src="./assets/img/tabbar/catagory-active.svg" slot="icon-active">
        <div slot="text">分类</div> 
      </TabBarItem>
      <TabBarItem path='/addcart'>
        <img src="./assets/img/tabbar/add-cart.svg" slot="icon">
        <img src="./assets/img/tabbar/add-cart-active.svg" slot="icon-active">
        <div slot="text">购物车</div>
      </TabBarItem>
      <TabBarItem path='/user'>
        <img src="./assets/img/tabbar/user.svg" slot="icon">
        <img src="./assets/img/tabbar/user-active.svg" slot="icon-active">
        <div slot="text">我的</div>
      </TabBarItem>
      
    </TabBar>
  </div>
</template>

<script>
import TabBar from './components/tabbar/TabBar'
import TabBarItem from './components/tabbar/TabBarItem'


export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  @import './assets/css/base.css';

</style>
