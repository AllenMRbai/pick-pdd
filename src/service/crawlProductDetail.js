/**
 * 2018/1/18
 * 爬取商品详情页，并将数据持久化到表内 ProductDetail SKUs PingDan Comments
 * 
 * 思路：
 * 1.从Product表中取出商品list,以分页的形式，每次获得100条进内场
 * 2.遍历商品list，取出商品goods_id与商品详情页url拼接，通过phantom.js(无头浏览器) 
 * 进入商品详情页的上下文。上下文中有个变量--window.rawData，这个变量就是要爬取的数据。
 * 3.将爬取的数据持久化到那4个表中。
 */
const phantom=require('phantom');
const Sequelize=require('sequelize');
const sequelize=require('../pojo/dbpools.js');
const Product=require('../pojo/Product.js');
const ProductDetail=require('../pojo/ProductDetail.js');
const SKUs=require('../pojo/SKUs.js');
const PingDan=require('../pojo/PingDan.js');
const Comments=require('../pojo/Comments.js');

(async function(){
    let products,offset=167,limit=100;
    console.time("总耗时")
    while(products=await getProducts(offset,limit),products.length>0){
        for(let product of products){
            try{
                await openPage(product);
                await SleepThread(1);
            }catch(e){
                console.error(e);
            }   
        }
        offset+=limit;
    }
    console.log("\n\n ___________任务完成____________")
    console.timeEnd("总耗时")
}());

/**
 * 从products表中获得products
 * @param {Number} offset 
 * @param {Number} limit 每次查几条
 * @returns {List<Product>}
 */
async function getProducts(offset,limit){
   let products=await Product.findAll({offset:offset,limit:limit});
   return products;
}

/**
 * 传入一个Product,通过Product提供的goods_id爬取对应的详情页
 * @param {[Product]} product 
 */
async function openPage(product){
    let productId=product.goods_id;
    let url=`http://mobile.yangkeduo.com/goods.html?goods_id=${productId}&is_spike=0&page_el_sn=99862&refer_page_name=index&refer_page_id=index_1516087501812_1d0j4koRyK&refer_page_sn=10002&refer_page_el_sn=99862&page_id=goods_detail_1516434566639_R71xnK28uN&is_back=1`;
    let instance,page,status,result;
    try{
        //创建一个phantom实例
        instance=await phantom.create();
        //通过phantom实例创建一个page对象
        page=await instance.createPage();
        //打开页面，返回状态码
        status=await page.open(url)
        if(status!=='success'){
            console.log(`id为${product.goods_id}的商品详情打开 失败`);
        }else{
            result=await page.evaluate(function(){
                return window.rawData;
            });
        }
    }catch(e){
        console.error(e);
    }
    
    let asd=result;
    //console.log(result.goods.goodsName);

    //将result转为4个表的pojo对象
    let productDetail=await packProductDetail(product,result);//返回 ProductDetail
    let skus=await packSKUs(product,result);//返回 list<SKU>
    let pingDans=await packPingDan(product,result);//返回数组 list<PingDan>
    let comments=await packComments(product,result);//返回 list<Comment>
    
    //将pojo对象存到数据库内
    try {
        if(productDetail!==false){
            await ProductDetail.create(productDetail);
        }
    } catch (error) {
        console.log("productDetail")
        console.error(error)
    }

    try {
        await SKUs.bulkCreate(skus);
    } catch (error) {
        console.log("SKUs")
        console.error(error)
    }

    try {
        await PingDan.bulkCreate(pingDans);
    } catch (error) {
        console.log("PingDan")
        console.error(error)
    }

    try {
        await Comments.bulkCreate(comments);
    } catch (error) {
        console.log("Comments")
        console.error(error)
    }
    
    console.log("小测一下");
    //关闭page
    await instance.exit();

    return "ok";
}

/**
 * 封装到productDetail，为后面的存到数据库做准备
 * @param {Product} product 
 * @param {Result} result 爬取的页面内的对象window.rawData
 * @returns {ProductDetail}
 */
async function packProductDetail(product,result){
    let productDetail={};
    let goods=result.goods;

    //判断数据库内是否有重复
    let ar;
    try{
        ar=await ProductDetail.findOne({
            where:{id:product.goods_id}
        })
    }catch(e){
        console.error(e);
    }
    if(ar!=null){
        console.log("\n _____发现重复的productDetail_____ \n")
        return false;
    }

    productDetail.id=product.goods_id;
    //产品名称
	productDetail.goodsName=goods.goodsName;
    //产品描述
    productDetail.goodsDesc=goods.goodsDesc;
    //市场价 元
    productDetail.marketPrice=goods.marketPrice;
    //拼单价格 元
    productDetail.maxGroupPrice=goods.maxGroupPrice;
    //单独购买 元
    productDetail.maxNormalPrice=goods.maxNormalPrice;
    //红包 "每满50可用5个红包"
    productDetail.redEnvelopes=goods.redEnvelopes;
    //销量
    productDetail.sales=goods.sales;
    //首张主图
    productDetail.thumbUrl=goods.thumbUrl;
    //主图展览 json数组 [url1,url2,url3...]
    productDetail.topGallery=JSON.stringify(goods.topGallery);
    //详情图 json数组 [url1,url2,url3...]
    let tempArray=[];
    if(goods.detailGallery!==null){
        for(let dg of goods.detailGallery){
            tempArray.push(dg.url);
        }
        productDetail.detailGallery=JSON.stringify(tempArray);
    }
    //评论标签  字符串数组 例如 ["很舒服(15)","质量很好(12)","便宜(11)"...]
    tempArray=[];
    if(result.reviews!==null && result.reviews!=="" &&result.reviews.tagList!==null){
        for(let tl of result.reviews.tagList){
            let tlString=tl.name+`(${tl.number})`;
            tempArray.push(tlString);
        }
        productDetail.tagList=JSON.stringify(tempArray);
    }

    return productDetail;
}

/**
 * 封装到SKUs，为后面的存到数据库做准备
 * @param {Product} product 
 * @param {Result} result 爬取的页面内的对象window.rawData
 * @returns {List<SKU>}
 */
async function packSKUs(product,result){
    let tempSKUs=[];
    if(result.goods.skus!==null){
        let skus=result.goods.skus;
        for(let sku of skus){
            let SKU={};

            //判断数据库内是否有重复
            let ar;
            try{
                ar=await SKUs.findOne({
                    where:{skuID:sku.skuID}
                })
            }catch(e){
                console.error(e);
            }
            if(ar!=null){
                console.log("\n _____发现重复的SKU_____ \n")
                continue;
            }

            //skuID 主键
            SKU.skuID=sku.skuID;
            //将products表内对应商品的id赋值给它
            SKU.goods_id=product.goods_id;
            //团购价格 元
            SKU.groupPrice=sku.groupPrice;
            //单独购买价格 元
            SKU.normalPrice=sku.normalPrice;
            //库存
            SKU.quantity=sku.quantity;
            //已售数量
            SKU.soldQuantity=sku.soldQuantity;
            //specs 属性键值对数组json 结构看下面
            SKU.specs=JSON.stringify(sku.specs)
            tempSKUs.push(SKU);
        }
    }
    
    return tempSKUs;
}

/**
 * 封装到PingDan，为后面的存到数据库做准备
 * @param {Product} product 
 * @param {Result} result 爬取的页面内的对象window.rawData
 * 
 */
async function packPingDan(product,result){
    let pingDans=[]
    if(result.goods.localGroups!==null && result.goods.localGroups!==""){
        let localGroups=result.goods.localGroups;

        for(let lg of localGroups){
            let pingDan={};

            //判断数据库内是否有重复
            let ar;
            try{
                ar=await PingDan.findOne({
                    where:{groupOrderID:lg.groupOrderID}
                })
            }catch(e){
                console.error(e);
            }
            if(ar!=null){
                console.log("\n _____发现重复的PingDan_____ \n")
                continue;
            }
            //团购订单号 主键
            pingDan.groupOrderID=lg.groupOrderID;
            //将products表内对应商品的id赋值给它
            pingDan.goods_id=product.goods_id;
            //头像
            pingDan.avatar=lg.avatar;
            //所在城市
            pingDan.cityName=lg.cityName;
            //用户名称
            pingDan.nickname=lg.nickname;
            //还差几个人
            pingDan.requireNum=lg.requireNum;

            pingDans.push(pingDan);
        }
    }
    

    return pingDans;
}

/**
 * 封装到Comments，为后面的存到数据库做准备
 * @param {Product} product 
 * @param {Result} result 爬取的页面内的对象window.rawData
 * 
 */
async function packComments(product,result){
    let comments=[];
    if(result.reviews===null || result.reviews==="" || result.reviews.detailList===null){
        return comments;
    }
    let detailList=result.reviews.detailList;
    let count=0;
    for(let detail of detailList){
        let comment={};

        //判断数据库内是否有重复
        let ar;
        try{
            ar=await Comments.findOne({
                where:{uid:detail.uid}
            })
        }catch(e){
            console.error(e);
        }
        if(ar!=null){
            console.log("\n _____发现重复的Comments_____ \n")
            continue;
        }

        //uid 主键 因为同一个用户可以做多个评论，因此，用uid作为评论的主键并不合适，所以需要将它与商品id关联上，再加上一个随机数
        comment.uid=detail.uid+"_"+product.goods_id+"_"+Math.ceil(Math.random()*1000);
        //将products表内对应商品的id赋值给它
        comment.goods_id=product.goods_id;
        //头像
        comment.avatar=detail.avatar;
        //评论
        comment.comment=detail.comment;
        //用户名称
        comment.name=detail.name;
        //评价时间
        comment.time=detail.time2;
        //购买的商品属性
        comment.orderSpecs=JSON.stringify(detail.orderSpecs);

        comments.push(comment);
    }

    return comments;
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
