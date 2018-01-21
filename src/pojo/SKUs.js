const Sequelize=require('sequelize');
const sequelize=require('./dbpools');

//产品主表
const SKUs=sequelize.define('SKUs',{
    //skuID 
    skuID:{
        type:Sequelize.BIGINT(15),
        primaryKey:true
    },
    //将products表内对应商品的id赋值给它
    goods_id:{
		type:Sequelize.INTEGER
    },
    //团购价格 元
    groupPrice:{
        type:Sequelize.STRING
    },
    //单独购买价格 元
    normalPrice:{
        type:Sequelize.STRING
    },
    //库存
    quantity:{
        type:Sequelize.INTEGER
    },
    //已售数量
    soldQuantity:{
        type:Sequelize.INTEGER
    },
    //specs 属性键值对数组json 结构看下面
    specs:{
        type:Sequelize.STRING(500)
    }
})

/*sku
{
    groupPrice:"78.8",//团购价
    normalPrice:"137",//单独购买价格
    quantity:1990,//库存
    skuID:7654226078,
    soldQuantity:10,//已售数量
    specs:[
        {
            spec_key:"颜色",
            spec_value:"奶茶色"
        },
        {
            spec_key:"尺码",
            spec_value:"均码"
        }
    ]
}
*/


module.exports=SKUs;