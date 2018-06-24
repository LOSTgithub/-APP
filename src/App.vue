<template>
  <div id="app">
   <!--  <div class="header">header</div> -->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to='goods'>商品</router-link></div>
      <div class="tab-item"><router-link to='ratings'>评价</router-link></div>
      <div class="tab-item"><router-link to='sellers'>商家</router-link></div>       
    </div>
    <div class="content">
        <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import header from './components/header'
import goods from './components/goods'
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  /*
    拉取这个模拟的假接口
  */
  created () {
    axios.get('/good/seller').then(res =>{
      //写等号时双等会有隐式转换的问题，工作上尽量写三等
      if(res.data.code === 0){  //当code是0时(成功)
        this.seller = res.data.data

      }
    })
  },
  components: {
    'v-header': header,
    goods
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import 'assets/stylus/index.styl'
  #app
    .tab
      display flex
      height 40px
      line-height 40px
      border-1px(rgba(240,20,20,0.1))
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77,85,93)
        a
          width 100%
          height 100%
          display block
        a.active
          color rgb(240,20,20) !important
</style>
