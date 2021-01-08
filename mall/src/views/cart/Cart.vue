<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import CartList from './childComps/CartList.vue'
import BottomBar from './childComps/BottomBar.vue'


export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    cartLength(){
      return this.$store.getters.cartLength
    },
    cartList(){
      return this.$store.getters.cartList
    }
  }
}
</script>

<style>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  
  .cart {
    height: 100vh;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>