const Sequelize=require('sequelize');
const sequelize=require('./dbpools');

//产品主表
const Product=sequelize.define('product',{
	//产品id
	goods_id:{
		type:Sequelize.BIGINT,
		primaryKey:true
	},
	//产品名称
	goods_name:{
		type:Sequelize.STRING
	},
	//产品短名称
	short_name:{
		type:Sequelize.STRING
	},
	//小图
	thumb_url:{
		type:Sequelize.STRING(500)
	},
	//大图
	hd_thumb_url:{
		type:Sequelize.STRING(500)
	},
	//市场价格 单位：分
	market_price:{
		type:Sequelize.INTEGER
	},
	//正常价格 单位：分
	normal_price:{
		type:Sequelize.INTEGER
	},
	//团购人数
	group_num:{
		type:Sequelize.TINYINT
	},
	//团购价
	group_price:{
		type:Sequelize.INTEGER
	},
	//销量
	cnt:{
		type:Sequelize.INTEGER
	},
	//商品来源国家
	country:{
		type:Sequelize.STRING(10)
	},
	//分类id-1
	opt_id_1:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    //分类id-2
	opt_id_2:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    //分类id-3
	opt_id_3:{
        type:Sequelize.INTEGER,
        defaultValue:0
	}
})


module.exports=Product;