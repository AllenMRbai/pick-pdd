/**
 * 创建一个空的products表，如果已存在该表，先drop掉。
 */
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const Product=require('../pojo/Product.js');

//如果存在products表，先drop掉再生成一个表
/*
Product.sync({force:true}).then(()=>{
	//添加一个表需要插入一行
	return Product.create({
		goods_id:123,
		//产品名称
		goods_name:"测试产品 产品名称",
		//产品短名称
		short_name:"产品短名称",
		//产品主图
		thumb_url:"url",
		//产品副图（我猜的）
		hd_thumb_url:"url",
		//市场价格 单位：分
		market_price:1000,
		//正常价格 单位：分
		normal_price:10000
	});
}).then(()=>{
	//将建表时插入的一行删除
	return Product.destroy({
			where:{
				goods_id:123
			}
		})
}).then(affectedRows => {
	console.log("删除条数为："+affectedRows);
});
*/
