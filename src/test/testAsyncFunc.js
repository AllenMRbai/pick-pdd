/**
 * 2018/1/18
 * 测试promise sync await相关
 */
const http=require("http")
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const CategoryOne=require('../pojo/CategoryOne.js');
const CategoryTwo=require('../pojo/CategoryTwo.js');
const Product=require('../pojo/Product.js');

/**
 * 猜想 以回调形式的异步是不能用async 和await
 * 结果 返回的flag结果为0，所以猜想正确
 */
function ceshi1(){
    (async function(){
        let flag=await test1(2);
        console.log("测试flag返回的结果为"+flag);
    }());
    
    //测试 证明用回调函数的方式做异步是不能用async await调用的
    function test1(optId){
        
        let size=100;
    
        //在这设置一个flag
        let flag=0;
        
        const options = {
            hostname: 'apiv4.yangkeduo.com',
            path: `/v4/operation/${optId}/groups?opt_type=2&offset=0&size=${size}&sort_type=DEFAULT&flip=&pdduid=0`,
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
            res.on('end', () => {
              console.log('\n No more data in response and start crawling!');
              //let goodsList=JSON.parse(data).goods_list;
              //store(goodsList,catTwo);
              flag=1;
            });
        });
          
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
          
        req.end();
    
        return flag;//0是没有等回调的结果 1是等回调的结果
    }
}


/**
 * 猜想 用Promise包装后可以使用async await
 * 结果 返回flag为1，所以猜想正确
 */
ceshi2()
function ceshi2(){
    (async function(){
        let flag=await test1(2);
        console.log("测试flag返回的结果为"+flag);
    }());
    
    //测试 证明用回调函数的方式做异步是不能用async await调用的
    async function test1(optId){
        
        let size=100;
    
        //在这设置一个flag
        let flag=0;
        
        const options = {
            hostname: 'apiv4.yangkeduo.com',
            path: `/v4/operation/${optId}/groups?opt_type=2&offset=0&size=${size}&sort_type=DEFAULT&flip=&pdduid=0`,
            method: 'GET',
            headers: {
                'Accept':'*/*'
            }
        };
        
        await SleepThread(6);

        flag=await getPromise(options);
    
        return flag;//0是没有等回调的结果 1是等回调的结果
    }

    async function getPromise(options){
        return new Promise(function(resolve,reject){
            const req = http.request(options, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
                //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                res.setEncoding('utf8');
                let data="";
                res.on('data', (chunk) => {
                    data+=chunk;
                });
                res.on('end', () => {
                  console.log('\n No more data in response and start crawling!');
                  //let goodsList=JSON.parse(data).goods_list;
                  //store(goodsList,catTwo);
                  resolve(1);
                });
            });
              
            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject(e);
            });
              
            req.end();
        });
    }
    async function SleepThread(seconds){
        console.log("在这里停顿"+seconds+"秒")
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log("停顿结束");
                resolve("停顿结束");
            }, seconds*1000);
        });
    }
}
