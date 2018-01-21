/**
 * 
 * 测试怎么用sequenlize查询
 */
const http=require("http")
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const CategoryOne=require('../pojo/CategoryOne.js');
const CategoryTwo=require('../pojo/CategoryTwo.js');
const Product=require('../pojo/Product.js');

testQueryAllCategoryTwo();

function testQueryAllCategoryTwo(){
    CategoryTwo.findAll().then(categoryTwos=>{
        console.log("查询到了"+categoryTwos.length+"条分类");
    });
}