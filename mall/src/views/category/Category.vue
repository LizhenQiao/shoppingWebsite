<template>
  <div>
    <!-- <h2>分类</h2> -->
    <div class="wrapper" ref="aaa">
      <ul class="content">
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      <li>111111111</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data(){
    return {
      scroll: null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.aaa, {
      probeType: 3,
      pullUpLoad: true
    })

    this.scroll.on('scroll', (position) => {
      console.log(position);
    })

    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
    })

  }
}

</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: cornflowerblue;
    overflow: hidden;
  }
</style>