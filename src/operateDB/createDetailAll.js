/**
 * 建表
 * ProductDetail.js PingDan.js SKUs.js Comments.js
 */
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');

const ProductDetail=require('../pojo/ProductDetail.js');
const PingDan=require('../pojo/PingDan.js');
const SKUs=require('../pojo/SKUs.js');
const Comments=require('../pojo/Comments.js');

/*
//ProductDetail
ProductDetail.sync({force:true}).then(()=>{
	//添加一个表需要插入一行
	return ProductDetail.create({
		id:123
	});
}).then(()=>{
	//将建表时插入的一行删除
	return ProductDetail.destroy({
			where:{
				id:123
			}
		})
}).then(affectedRows => {
	console.log("ProductDetail 删除条数为："+affectedRows);
});

//PingDan
PingDan.sync({force:true}).then(()=>{
	//添加一个表需要插入一行
	return PingDan.create({
		groupOrderID:123
	});
}).then(()=>{
	//将建表时插入的一行删除
	return PingDan.destroy({
			where:{
				groupOrderID:123
			}
		})
}).then(affectedRows => {
	console.log("PingDan 删除条数为："+affectedRows);
});

//SKUs
SKUs.sync({force:true}).then(()=>{
	//添加一个表需要插入一行
	return SKUs.create({
		skuID:123
	});
}).then(()=>{
	//将建表时插入的一行删除
	return SKUs.destroy({
			where:{
				skuID:123
			}
		})
}).then(affectedRows => {
	console.log("SKUs 删除条数为："+affectedRows);
});

//Comments
Comments.sync({force:true}).then(()=>{
	//添加一个表需要插入一行
	return Comments.create({
		uid:123
	});
}).then(()=>{
	//将建表时插入的一行删除
	return Comments.destroy({
			where:{
				uid:123
			}
		})
}).then(affectedRows => {
	console.log("Comments 删除条数为："+affectedRows);
});
*/