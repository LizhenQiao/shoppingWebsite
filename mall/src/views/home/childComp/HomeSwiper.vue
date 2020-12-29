<template>
  <Swiper>
      <SwiperItem v-for="item in banners" :key="item.id">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: 'HomeSwiper',
  props:{
    banners:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad(){
      if (!this.isload){
        this.$emit('swiperImageLoadFinish')
        this.isLoad = true
      }      
    }
  }
}
</script>

<style>

</style>