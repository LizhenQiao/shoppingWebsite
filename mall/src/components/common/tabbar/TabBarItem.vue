<template>
  <div>
      <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
          <slot name="icon"></slot>
        </div>
        <div v-else>
          <slot name="icon-active"></slot>
        </div> 
        <div :style="activeStyle" class="text">
          <slot name="text" ></slot>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  computed: {
    isActive(){
      return this.$route.path === this.path
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  props:{
    path: String,
    activeColor: {
      type: String,
      default: 'darkgreen'
    }
  },
   
  methods: {
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item {
    text-align: center;
    height: 49px;
    font-size: 12px;
  }

  .tab-bar-item img {
    margin-top: 5px;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 1px;
  }

  .text {
    font-weight: 900;
  }
</style>