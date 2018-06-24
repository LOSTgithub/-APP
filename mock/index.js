import Mock from 'mockjs'	//要模拟假数据必须引入Mock包
import data from '../data.json'	//引入json文件

//1
/*
Mock.mock( rurl, template ) 
模拟假数据，记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，
将根据数据模板 template 生成模拟数据，并作为响应数据返回。
*/

Mock.mock('/good/seller',{
	code: 0,
	codeMsg: '成功',
	data: data.seller
})

Mock.mock('/good/goods',{
	code: 0,
	codeMsg: '成功',
	data: data.goods
})

Mock.mock('/good/ratings',{
	code: 0,
	codeMsg: '成功',
	data: data.ratings
})
