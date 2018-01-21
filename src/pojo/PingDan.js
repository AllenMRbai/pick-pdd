const Sequelize=require('sequelize');
const sequelize=require('./dbpools');

//产品主表
const PingDan=sequelize.define('ping_dan',{
    //团购订单号 主键
    groupOrderID:{
		type:Sequelize.STRING(25),
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
    //所在城市
    cityName:{
        type:Sequelize.STRING
    },
    //用户名称
    nickname:{
        type:Sequelize.STRING
    },
    //还差几个人
    requireNum:{
        type:Sequelize.INTEGER
    }
})



module.exports=PingDan;