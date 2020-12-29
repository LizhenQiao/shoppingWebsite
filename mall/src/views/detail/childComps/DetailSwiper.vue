<template>
  <div class="detail-swiper">
    <Swiper>
      <SwiperItem class="swiper-item" v-for="item in topImages" :key="item.id">
        <img :src="item">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .swiper-item {
    height: 300px;
    overflow: hidden;
  }
</style>