/**
 * 创建空的一级分类表category-one 二级分类表category-two，如果已存在，会先drop掉
 * category-one 一对多 category-two
 * 
 * 注意：直接执行该文件会报级联操作时的错误，此时可以先创建CategoryOne，
 * 然后注释掉所有与CategoryOne有关的代码再创建CategoryTwo
 */
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const CategoryOne=require('../pojo/CategoryOne.js');
const CategoryTwo=require('../pojo/CategoryTwo.js');

/*
CategoryOne.sync({force:true}).then(()=>{
	//添加一个表需要插入一行
	return CategoryOne.create({
		id:123,
        //分类id
        opt_id:123,
        //分类名称
        opt_name:"123",
        //分类描述
        opt_desc:"123",
        //分类展示图 字符长度500应该足够
        image_url:"123",
        //选中时高亮的图标
        selected_url:"123",
        //未选中时默认的图标
        unselected_url:"123",
        //排序的优先位置
        priority:1,
        //分类id-1
        opt_id_1:123,
        //分类id-2
        opt_id_2:123,
        //分类id-3
        opt_id_3:13
	});
}).then(()=>{
	//将建表时插入的一行删除
	return CategoryOne.destroy({
			where:{
				id:123
			}
		})
}).then(affectedRows => {
	console.log("CategoryOne删除条数为："+affectedRows);
})

CategoryTwo.sync({force:true}).then(()=>{
	//添加一个表需要插入一行
	return CategoryTwo.create({
		id:123,
        //分类id
        opt_id:123,
        //分类名称
        opt_name:"123",
        //分类描述
        opt_desc:"123",
        //分类展示图 字符长度500应该足够
        image_url:"123",
        //排序的优先位置
        priority:1,
        //分类id-1
        opt_id_1:123,
        //分类id-2
        opt_id_2:123,
        //分类id-3
        opt_id_3:13
	});
})
.then(()=>{
	//将建表时插入的一行删除
	return CategoryTwo.destroy({
			where:{
				id:123
			}
		})
}).then(affectedRows => {
	console.log("CategoryTwo删除条数为："+affectedRows);
})
*/