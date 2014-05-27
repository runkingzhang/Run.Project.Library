var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');

debug('读取博文类别列表');
//抓取对应的数据信息
var request = require('request');
request('http://adidas.tmall.com/category-225473321.htm?spm=a1z10.1.w5003-4600235347.4.tshHnV&scene=taobao_shop',function(error,response,body){
	if(!error&&response.statusCode==200){
		console.log(body);
		}
	})