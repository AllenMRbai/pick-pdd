const phantom=require('phantom');

(async function(){
	console.log("it is ok");
	//await解决回调问题，创建一个phantom实例
	const instance=await phantom.create();
	//通过phantom实例创建一个page对象
	const page=await instance.createPage();

	await page.on("onResourceRequested",function(requestData){
			console.info('Requesting',requestData.url);
	});

	let url=encodeURI(`http://mobile.yangkeduo.com/goods.html?goods_id=150403550&refer_page_name=index&is_spike=0&refer_page_id=index_1516166886039_kMLqvVjTrK&refer_page_sn=10002`)
	//设置用户代理头
	const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`

	const status=await page.open(url);

	let result=await page.evaluate(function(){
		// var product={};
		// product.price=$('.goods-buy-price').eq(0).text();
		//var name=$('.g-name span').text();
		var name=document.getElementsByClassName("g-name")[0].getElementsByTagName("span")[0].innerText;
		return name;
	});
	console.log(result);
}());