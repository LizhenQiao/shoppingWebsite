<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">Lady Mall</div></NavBar>
    <TabControl :titles="['流行', '新款', '精选']"
      @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></TabControl>

    <Scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoadFinish="swiperImageLoadFinish"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行', '新款', '精选']"
      @tabClick="tabClick" ref="tabControl2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackUp"></BackTop>
  
  </div>
</template>

<script>
import HomeSwiper from "./childComp/HomeSwiper"
import RecommendView from "./childComp/RecommendView"
import FeatureView from "./childComp/FeatureView"

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/contents/tabcontrol/TabControl'
import GoodsList from 'components/contents/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/contents/backtop/BackTop'

import {getHomeMultidata, getHomeGoods} from "network/home"
import {debounce} from 'common/utils'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackUp: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },

  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },

  deactivated(){
    // 1. 保存y值
    this.saveY =  this.$refs.scroll.getScrollY()

  },

  created(){
    this.getHomeMultidata();
    
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },

  mounted(){
    // 1. 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

  },

  methods: {
    /*
    事件监听相关
    */

    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    backClick(){
      this.$refs.scroll.scrollTo(0, 0);
    },

    contentScroll(position){
      if (-position.y > 1000){
        this.isShowBackUp = true
      }
      else {
        this.isShowBackUp = false
      }

      if (-position.y > this.tabOffsetTop){
        this.isTabFixed = true
      }
      else {
        this.isTabFixed = false
      }

    },

    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoadFinish(){
      // 2. 获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


    /*
    网络请求相关
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成下拉加载更多
        this.$refs.scroll.finishPullUp()
    })
    }
  }
}
</script>


<style scoped>
  #home {
    height: 100vh;

    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;

  }

  .tab-control {
    position: relative;
    z-index: 1;
  }

  .content {
    /* height: 300px; */
    overflow: hidden;
    
    position: absolute;
    top: 44px;
    bottom: 49px;
  }


</style>