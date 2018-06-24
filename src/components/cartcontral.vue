<template>
  <div class="cart-contral">
    <span class="decrease icon-remove_circle_outline" @click="remove" v-show="food.count > 0"></span>
    <span class="count" v-show="food.count > 0">{{food.count}}</span>
    <span class="increase icon-add_circle" @click="add"></span>
  </div>
</template>


<script>
import Vue from 'vue'

export default {
    props: {
        food:{
          type: Object
        }
    },
    methods: {
      add(event){
        if(event._constructed){
          if(!this.food.count){         //如果不存在count属性
            Vue.set(this.food,"count")  //通过vue.set()添加属性count
            this.food.count = 1
          }else{
              this.food.count++
          }
        }
      },
      remove(){
          if (event._constructed) {
            if (this.food.count === 0) {
              return
            }else{
              this.food.count--
            }
          }
            
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'

.cart-contral
    font-size 0
  .icon-remove_circle_outline,.icon-add_circle
    width 24px
    height 24px
    line-height 24px
    color rgb(0,160,220)
    font-size 24px
    padding 6px
  .count
    display inline-block
    width 12px
    font-size 10px
    color rgb(147,153,159)
    line-height 24px
    vertical-align top
    text-align center
</style>
