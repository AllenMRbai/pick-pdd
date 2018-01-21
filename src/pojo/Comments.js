const Sequelize=require('sequelize');
const sequelize=require('./dbpools');

//产品主表
const Comments=sequelize.define('comment',{
    //将products表内对应商品的id赋值给它
    uid:{
		type:Sequelize.STRING(50),
		primaryKey:true
    },
    //将products表内对应商品的id赋值给它
    goods_id:{
		type:Sequelize.INTEGER
    },
    //头像
    avatar:{
        type:Sequelize.STRING
    },
    //评论
    comment:{
        type:Sequelize.STRING(500)
    },
    //用户名称
    name:{
        type:Sequelize.STRING
    },
    //评价时间
    time:{
        type:Sequelize.STRING
    },
    //购买的商品属性
    orderSpecs:{
        type:Sequelize.STRING(500)
    }
})



module.exports=Comments;