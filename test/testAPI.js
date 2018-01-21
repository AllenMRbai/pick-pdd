/**
 * 2018/1/18
 * 测试拼多多的获取商品列表的接口能否获取自定义个数
 * 结果：设置size为100返回的列表数为106个，设置为50返回的列表数为53个
 */
const http=require("http")
const Sequelize=require('sequelize');

crawlProductByOptId2(2,50)
function crawlProductByOptId2(optId,size){
    
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
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        let data="";
        res.on('data', (chunk) => {
            data+=chunk;
        });
        res.on('end', () => {
          console.log('\n No more data in response and start crawling!');
          let goodsList=JSON.parse(data).goods_list;
          console.log(goodsList.length);
        });
    });
      
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
      
    req.end();
}