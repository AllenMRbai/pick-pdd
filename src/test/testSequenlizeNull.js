/**
 * 测试sequenlize传入空对象会怎么样
 * 结果：报错，因为主键不能为空
 * 
 * 测试sequenlize传入null会怎么样
 * 结果：报错，因为主键不能为空
 * 
 * 测试sequenlize不传参数会怎么样
 * 结果：报错，因为主键不能为空
 * 
 * 测试sequenlize传入空数组会怎么样
 * 结果：不报错，也不保存，所以这是安全的操作
 */
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const ProductDetail=require('../pojo/ProductDetail.js');


//ProductDetail.create({});
//ProductDetail.create(null);
//ProductDetail.create();

//ProductDetail.bulkCreate([]);
