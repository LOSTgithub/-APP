<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
		<div v-for="(item,index) in goods" :key="index" class="menu-item" @click="selectIndex(index,$event)" 
		:class="{current : currentIndex === index}">
			<div class="text-wrapper border-1px">
				<span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
				<span class="text">{{item.name}}</span>
			</div>
		</div>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
      	<ul>
      		<li v-for="(items,index) in goods" :key="index" class="foods-list-hook">
      			<div class="items-title">{{items.name}}</div>
      			<ul>
      				<li v-for="(item2,index) in items.foods" class="item-contnet-wrapper">
      					<div class="items-icon">
      						<img :src="item2.icon">
      					</div>
      					<div class="items-content border-1px">
      						<div class="items-name">{{item2.name}}</div>
      						<div v-show="item2.description" class="items-description">{{item2.description}}</div>
      						<div class="ratings">
      							<span>月售{{item2.sellCount}}份</span>
      							<span style="margin-left:12px">好评率{{item2.rating}}%</span>
      						</div>
      						<div class="prices">
      							<span class="price">{{item2.price}}</span>
      							<span v-if="item2.oldPrice" class="oldPrice" style="margin-left:8px">￥{{item2.oldPrice}}</span>
      						</div>
      						<div class="cart-control-wrapper">
      							<cartcontral :food="item2"></cartcontral>
      						</div>
      					</div>
      				</li>
      			</ul>
      		</li>
      	</ul>
      </div>
      <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue'
import BScroll from 'better-scroll'
import shopcart from './shopcart'
import cartcontral from './cartcontral'
export default {
    props: {
  	  seller: {
  	  	type: Object
  	   	}
    },
    components: {
    	shopcart,
    	cartcontral
    },
  	data() {
	    return {
	      goods: [],
	      heightList: [],
	      scrollY: 0
	    }
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice_1','guarantee']
      axios.get('/good/goods').then(res =>{
      	if(res.data.code === 0){
      		this.goods = res.data.data
      		/*
      			在dom没有出现前，是不能绑定事件，所以要用Vue.nextTick()来给dom绑定事件
      		*/
      		Vue.nextTick(() =>{
      			this._initscroll()	//dom绑定一个scroll
      			this._caculateHeight()	//计算foods的高度
      		})
      	}
      })
	},
	methods: {
		selectIndex($index,$event){
			if(!$event._constructed){
				return
			}
			let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook')
			this._foodScroll.scrollToElement(foodList[$index],300)
		},
		//操作dom  通过better-scroll
		_initscroll(){
			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
				click: true
			})
			this._foodScroll = new BScroll(this.$refs.foodWrapper,{
				probeType: 3,
				click: true
			})
			//计算滚动距离
			this._foodScroll.on('scroll',(pos) => {
				this.scrollY = Math.abs(Math.round(pos.y))//坐标会出现负,并且是小数,需要处理，实时取得scrollY
			})
		},
		_caculateHeight(){
			let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook')//获取每一个food的dom对象
			let height = 0;//第一个高度为0
			this.heightList.push(height)
			for(let i = 0; i < foodList.length; i++){
				let item = foodList[i]//每个item都是刚才获取的food的每一个dom
				height += item.clientHeight//获取每一个foods内部块的高度
				this.heightList.push(height)
			}
		}
	},
	computed: {
		currentIndex(){
			//滑动距离进行for循坏，直到条件成立为止
			for(var i = 0; i < this.heightList.length; i++){
				let height1 = this.heightList[i]
				let height2 = this.heightList[i + 1]
				if(	!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
					return i
				}
			}
			return 0
		},
		selectFoods(){
			let foods = []
			if(this.goods.length !== 0){	//判断goods.length长度
				this.goods.forEach(good => {
					good.foods.forEach(food => {
						if(food.count){			//如果food存在count
							foods.push(food)	//添加该数组到foods里
						}
					})
				})
			}
			return foods   	//返回具有count的数组
		},
	}
}

</script>
<style src="../../static/style.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.goods
  display flex
  position absolute
  top 174px
  bottom 48px
  left 0 
  right 0
  width 100%
  overflow hidden
  .menu-wrapper
  	flex 0 0 80px
  	width 80px
  	background #f3f5f7
  	.icon
  		display inline-block
  		vertical-align top
  		width 14px
  		height 14px
  		background-size 14px
  		&.decrease
        bg-image('decrease_3')
      &.discount
        bg-image('discount_3')
      &.guarantee
        bg-image('guarantee_3')
      &.invoice
        bg-image('invoice_3')
      &.special
        bg-image('special_3')
	  .menu-item
	   padding 0 12px
	   font-size 0
	   line-height 16px
	   &.current
		   	margin-top -1px
		   	background-color #ffffff
		   	&:after
		   	 border-top 1px solid #ffffff
	   	.text
	   		font-size 12px
	   		line-height 14px
	   		font-weight 500
   	.text
   		font-size 12px
   		line-height 14px
   		font-weight 500
    .text-wrapper
    	display table-cell
    	vertical-align middle
    	height 54px
    	width 56px
    	border-1px(rgba(7,17,27,0.1))
  .foods-wrapper
  	flex 1
  	background-color #ffffff
	  .items-title
	  	font-size 14px
	  	background-color #f3f5f7
	  	padding-left 10px
	  	height 26px
	  	line-height 26px
	  	font-weight 500
	  	color rgb(147,153,159)
	  	border-left 4px solid #d9d9d9
		.item-contnet-wrapper
			display flex
			margin 18px
			padding-bottom 18px
			background #ffffff
			border-1px rgba(7,17,27,0.1)
			position relative
			&:last-child
				margin-bottom 0 
			.items-icon
				flex 0 0 57px
				img
					width 57px
					height 57px
			.items-content
				flex 1
				padding-left 10px
			.items-name
				padding-top 2px
				font-size 14px
				color rgb(7,17,27)
				line-height 14px
			.items-description,.ratings
				margin 8px 0
				font-size 10px
				color rgb(147,153,159)
				line-height 16px
			.prices
				font-size 20px
				color rgb(240,20,20)
				font-weight 700
				line-height 24px
				.oldPrice
					font-size 10px
					vertical-align top
					color rgb(147,153,159)
					font-weight 700
					line-height 20px
					text-decoration line-through
			.cart-control-wrapper
				position absolute
				right 0
				bottom 18px
</style>
