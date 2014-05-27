
//抓取对应的数据信息
var request = require('request');
request('http://pub.alimama.com/index.htm?spm=0.0.0.0.aMzz7R#!/promo/self/items?spm=0.0.0.0.aMzz7R&q=PUNK%20RAVE&toPage=1&sort=_totalfee',function(error,response,body){
	if(!error&&response.statusCode==200){
		console.log(body);
		}
	})