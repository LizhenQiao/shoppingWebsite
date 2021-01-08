<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </Scroll>
    <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShowBackUp"></BackTop>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"


import Scroll from "components/common/scroll/Scroll"
import GoodsList from 'components/contents/goods/GoodsList'
import BackTop from 'components/contents/backtop/BackTop'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"


export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Scroll
  },
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs:[0, 0, 0, 0],
      currentIndex: 0,
      isShowBackUp: false
    }
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      const data = res.result
      // 1. 获取顶部图片数据
      this.topImages = data.itemInfo.topImages

      // 2. 获取商品详情信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3. 获取商家信息
      this.shop = new Shop(data.shopInfo)

      // 4. 保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5. 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      
      // 6. 获取评论信息
      if (data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs[0] = 0
      this.themeTopYs[1] = this.$refs.params.$el.offsetTop
      this.themeTopYs[2] = this.$refs.comment.$el.offsetTop
      this.themeTopYs[3] = this.$refs.recommend.$el.offsetTop
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i=0; i<length; i++){
        if (this.currentIndex != i && ((i<length-1 && positionY>this.themeTopYs[i] && positionY <
        this.themeTopYs[i+1]) || (i === length-1 && positionY > 
        this.themeTopYs[i]))){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      if (-position.y > 1000){
        this.isShowBackUp = true
      }
      else {
        this.isShowBackUp = false
      }
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 100)
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      this.$store.commit('addCart', product)
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>