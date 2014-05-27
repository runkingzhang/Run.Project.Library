
//抓取对应的数据信息
var request = require('request');
request(
{
	url:'http://list.tmall.com/search_product.htm?q=%CC%AB%C6%BD%C4%F1%C4%D0%D7%B0&type=p&vmarket=&spm=3.7095809.a2227oh.d100&xl=taipin_2&from=mallfp..pc_1_suggest',
	method:'GET',
	headers:{
		'Accept-Language':'zh-CN,zh:q=0.8',
		
		}
	}
,function(error,response,body){
	if(!error&&response.statusCode==200){
		console.log(body);
		}
	})