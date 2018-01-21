const Sequelize=require('sequelize');
const sequelize=require('./dbpools');

//产品主表
const ProductDetail=sequelize.define('product_detail',{
    //将products表内对应商品的id赋值给它
    id:{
		type:Sequelize.INTEGER,
		primaryKey:true
    },
    //产品名称
	goodsName:{
        type:Sequelize.STRING
    },
    //产品描述
    goodsDesc:{
        type:Sequelize.STRING(1000)
    },
    //市场价 元
    marketPrice:{
        type:Sequelize.STRING
    },
    //拼单价格 元
    maxGroupPrice:{
        type:Sequelize.STRING
    },
    //单独购买 元
    maxNormalPrice:{
        type:Sequelize.STRING
    },
    //红包 "每满50可用5个红包"
    redEnvelopes:{
        type:Sequelize.STRING
    },
    //销量
    sales:{
        type:Sequelize.INTEGER
    },
    //首张主图
    thumbUrl:{
        type:Sequelize.STRING
    },
    //主图展览 json数组 [url1,url2,url3...]
    topGallery:{
        type:Sequelize.STRING(2000)
    },
    //详情图 json数组 [url1,url2,url3...]
    detailGallery:{
        type:Sequelize.STRING(3500)
    },
    //评论标签  字符串数组 例如 ["很舒服(15)","质量很好(12)","便宜(11)"...]
    tagList:{
        type:Sequelize.STRING
    }
})

module.exports=ProductDetail;