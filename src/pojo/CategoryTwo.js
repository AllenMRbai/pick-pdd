const Sequelize=require('sequelize');
const sequelize=require('./dbpools');

//产品主表
const CategoryTwo=sequelize.define('category-two',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true
	},
	//分类id
	opt_id:{
		type:Sequelize.INTEGER
	},
	//分类名称
	opt_name:{
		type:Sequelize.STRING
    },
    //分类描述
	opt_desc:{
		type:Sequelize.STRING
    },
	//分类展示图 字符长度500应该足够
	image_url:{
		type:Sequelize.STRING(500)
	},
    //排序的优先位置
	priority:{
		type:Sequelize.TINYINT
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


module.exports=CategoryTwo;