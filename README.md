# pick-pdd

##### 爬取拼多多商品用来做练习，并无恶意。
##### 2018/1/21

#### 使用方法
1. npm install
2. 打开src/pojo/conifg.js 将数据库的信息改成你自己的。
3. 用node运行src/operateDB下的所有文件来自动创建数据库表，注意运行前先把里面注释的代码解掉。
4. 依次运行service下的crawlCategory.js crawlProduct.js crawlProductDetail.js 来爬取数据并存入数据库中。

#### 注意事项

1. 我用的是mysql数据库，如果你用的不是mysql的话，需要用npm安装对应的数据库驱动，并且在src/pojo/conifg.js内配置对应的方言（dialect: 'mysql'|'sqlite'|'postgres'|'mssql'）。更多的配置信息在Sequenlize官网内。

2. 运行src/service/crawlProductDetail.js的过程中可能会报错。原因是爬取的用户昵称内有emoj，emoj占4个字节，如果数据库编码设置为utf8的话，一个字符最多占3字节，因此会报错。解决方法：将数据库编码设置为utf8mb4,然后将表ping_dans comments和表内的varchar字段都设置为utf8mb4。

3. 如果数据库内已存在同名的表，运行src/operateDB下的建表文件会先drop掉原表再新建一个表。所以用完后最好把代码注释掉，不然比较危险。

4. 请一定要按顺序爬取crawlCategory.js crawlProduct.js crawlProductDetail.js，不然报错。crawlCategory.js和crawlProduct.js爬取很快，不超过半小时应该可以爬取完。crawlProductDetail.js需要爬取大概6个小时。我在crawlProductDetail.js设置了每爬取一个页面暂停1秒钟。如果想爬的快点可以修改crawlProductDetail.js的第27行SleepThread方法内的时间，单位是秒。

5. src/service/crawlProduct.js 内的opts.size属性可以设置爬取的个数。
6. 想知道表中各字段什么意义，可以去src/pojo内看，每个js文件就对应一张表（config.js是数据库配置文件 dbpools.js线程池对象）。
