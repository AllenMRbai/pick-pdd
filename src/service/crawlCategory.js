/**
 * 2018/1/18
 * 爬取分类页面，并将数据填入category-one category-two
 */
const http=require("http")
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const CategoryOne=require('../pojo/CategoryOne.js');
const CategoryTwo=require('../pojo/CategoryTwo.js');

const options = {
    hostname: 'apiv4.yangkeduo.com',
    path: '/operations?pdduid=0',
    method: 'GET',
    headers: {
        'Accept':'*/*'
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    let data="";
    res.on('data', (chunk) => {
        data+=chunk;
    });
    res.on('end', () => {
      console.log('\n No more data in response and start crawling!');
      crawling(data);
    });
});
  
req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});
  
// write data to request body
//req.write(postData);
req.end();

/**
 * 将扒到的json存进
 * @param {json} data 抓取的拼多多分类页面的json
 */
function crawling(data){
    let catArray=JSON.parse(data);
    for(cat of catArray){
        //创建一个一级分类对象的数据库实例
        createCateOne(cat);
        bulkCreateCateTwo(cat)
    }

    console.log("\n 数据导入完毕！")
}
/**
 * 创建一个一级分类对象的数据库实例
 * @param {object} cat 包含一级分类及二级分类的对象
 */
function createCateOne(cat){
    let cateOne={};
    cateOne.id=cat.id;
    cateOne.opt_id=cat.opt_id;
    cateOne.opt_name=cat.opt_name;
    cateOne.opt_desc=cat.opt_desc;
    cateOne.image_url=cat.image_url;
    cateOne.selected_url=cat.selected_url;
    cateOne.unselected_url=cat.unselected_url;
    cateOne.priority=cat.priority;
    cateOne.opt_id_1=cat.opt_id_1;
    cateOne.opt_id_2=cat.opt_id_2;
    cateOne.opt_id_3=cat.opt_id_3;
    CategoryOne.create(cateOne);
}
/**
 * 创建一级分类对象下的所有二级分类对象的数据库实例
 * @param {object} cat 包含一级分类及二级分类的对象
 */
function bulkCreateCateTwo(cat){
    let catArray=cat.children;
    let cateTwoArray=[];
    for(cat of catArray){
        let cateTwo={};
        cateTwo.id=cat.id;
        cateTwo.opt_id=cat.opt_id;
        cateTwo.opt_name=cat.opt_name;
        cateTwo.opt_desc=cat.opt_desc;
        cateTwo.image_url=cat.image_url;
        cateTwo.priority=cat.priority;
        cateTwo.opt_id_1=cat.opt_id_1;
        cateTwo.opt_id_2=cat.opt_id_2;
        cateTwo.opt_id_3=cat.opt_id_3;
        cateTwoArray.push(cateTwo);
    }
    CategoryTwo.bulkCreate(cateTwoArray);
}