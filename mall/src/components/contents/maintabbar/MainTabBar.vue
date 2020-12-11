<template>
  <TabBar>
      <TabBarItem path='/home'>
        <img src="~assets/img/tabbar/home.svg" slot="icon">
        <img src="~assets/img/tabbar/home_active.svg" slot="icon-active">
        <div slot="text">首页</div> 
      </TabBarItem>
      <TabBarItem path='/category'>
        <img src="~assets/img/tabbar/category.svg" slot="icon">
        <img src="~assets/img/tabbar/category_active.svg" slot="icon-active">
        <div slot="text">分类</div> 
      </TabBarItem>
      <TabBarItem path='/shopcart'>
        <img src="~assets/img/tabbar/shopcart.svg" slot="icon">
        <img src="~assets/img/tabbar/shopcart_active.svg" slot="icon-active">
        <div slot="text">购物车</div>
      </TabBarItem>
      <TabBarItem path='/profile'>
        <img src="~assets/img/tabbar/profile.svg" slot="icon">
        <img src="~assets/img/tabbar/profile_active.svg" slot="icon-active">
        <div slot="text">我的</div>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>