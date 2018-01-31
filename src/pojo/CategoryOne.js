const Sequelize=require('sequelize');
const sequelize=require('./dbpools');
const CategoryTwo=require('./CategoryTwo');

//产品主表
const CategoryOne=sequelize.define('category_one',{
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
	//选中时高亮的图标
	selected_url:{
		type:Sequelize.STRING(500)
    },
    //未选中时默认的图标
	unselected_url:{
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

CategoryOne.hasMany(CategoryTwo,{foreignKey: 'opt_id_1'});
CategoryTwo.belongsTo(CategoryOne, {foreignKey: 'opt_id_1'});

module.exports=CategoryOne;