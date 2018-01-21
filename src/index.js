/**
*根据分类爬取products表
*/
const phantom=require('phantom');
const fs=require('fs');
const Sequelize=require('sequelize');
const sequelize=require('./pojo/dbpools.js');
const Product=require('./pojo/Product.js');

const productCategory=[{name:"服饰",id:14},{name:"男装",id:743},{name:"鞋包",id:1281},
						{name:"母婴",id:4},{name:"百货",id:15},{name:"美食",id:1},
						{name:"电器",id:18},{name:"家纺",id:818},{name:"水果",id:13},
						{name:"美妆",id:16},{name:"手机",id:1543},{name:"运动",id:1451}];
(async function(){
	let url=`http://apiv4.yangkeduo.com/operation/1543/groups?opt_type=1&size=100&offset=0&flip=&pdduid=0&is_back=1`;
	for(pc of productCategory){
		console.log(pc);
	}
}());