/**
 * 2018/1/18
 * 爬取分类，并将数据填入category-one category-two
 */
const http=require("http")
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const CategoryOne=require('../pojo/CategoryOne.js');
const CategoryTwo=require('../pojo/CategoryTwo.js');
const Product=require('../pojo/Product.js');

//get方法的参数
const opts={
    size:50//设置每次爬取的个数，默认为100个
}

/**
 * 爬取脚本的入口
 */
async function mainEntry(){
    let categoryTwos=await GetAllCategoryTwo();
    for(let catTwo of categoryTwos){
        await crawlProductByOptId2(catTwo,store)
    }  
}
mainEntry();

/**
 * 从category_two表内获得所有列
 * @returns {ArrayList<CategoryTwo>}
 */
async function GetAllCategoryTwo(){
    const categoryTwos=await CategoryTwo.findAll()
    //console.log("查到的分类条数为："+categoryTwos.length);
    return categoryTwos;
}

/**
 * 将goods_list内的信息封装到Product对象内，并实体化到数据库 表products
 * @param {Array} goodsList 爬取的data JSON.parse后的 goods_list数组对象
 * @param {CategoryTwo} catTwo 数据库内取出的CategoryTwo对象
 */
async function store(goodsList,catTwo){
    let productList=[];
    for(let good of goodsList){
        let ar=await Product.findOne({
            where:{goods_id:good.goods_id}
        })
        if(ar!=null){
            console.log("\n _____发现重复商品_____ \n")
            continue
        }
        let product={};
        product.goods_id=good.goods_id;//
        product.goods_name=good.goods_name;//
        product.short_name=good.short_name;//
        product.thumb_url=good.thumb_url;
        product.hd_thumb_url=good.hd_thumb_url;
        product.market_price=good.market_price;
        product.normal_price=good.normal_price;//
        //console.log(goodsList.length)
        console.log(product.goods_name)
        product.group_num=good.group.customer_num;
        product.group_price=good.group.price;
        product.cnt=good.cnt;
        product.country=good.country;
        product.opt_id_1=catTwo.opt_id_1;
        product.opt_id_2=catTwo.opt_id_2;
        product.opt_id_3=catTwo.opt_id_3;

        productList.push(product);
    }   

    let ok=await Product.bulkCreate(productList);
    console.log(typeof ok);
    return ok;
}

/**
 * http发送请求，获得json，json中提取goodsList对象然后交给store回调来储存数据到products表
 * @param {CategoryTwo} catTwo 数据库内取出的CategoryTwo对象
 * @param {callback function} store 将爬取的数据存储到数据库中，这是个回调函数
 */
async function crawlProductByOptId2(catTwo,store){
    await getRequestPromise(catTwo,store);
    let ok=await SleepThread(2);
    return ok;
}

/**
 * 将请求包装成promise
 * @param {CategoryTwo} catTwo 数据库内取出的CategoryTwo对象
 * @param {callback function} store 将爬取的数据存储到数据库中，这是个回调函数
 */
function getRequestPromise(catTwo,store){
    return new Promise((resolve,reject)=>{
        let size=opts.size || 100;

        const options = {
            hostname: 'apiv4.yangkeduo.com',
            path: `/v4/operation/${catTwo.opt_id_2}/groups?opt_type=2&offset=0&size=${size}&sort_type=DEFAULT&flip=&pdduid=0`,
            method: 'GET',
            headers: {
                'Accept':'*/*'
            }
        };
        
        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            let data="";
            res.on('data', (chunk) => {
                data+=chunk;
            });
            res.on('end',async () => {
                let goodsList=JSON.parse(data).goods_list;
                await store(goodsList,catTwo);
                console.log(`${catTwo.opt_name}爬取完毕`);
                resolve();
            });
        });
        
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            reject(e);
        });
        
        req.end();
    }); 
}

/**
 *停止async方法内的线程一定的时间 
 * @param {Number} seconds 线程暂停的秒数
 */
function SleepThread(seconds){
    console.log("在这里停顿"+seconds+"秒")
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("停顿结束");
            resolve("停顿结束");
        }, seconds*1000);
    });
}
