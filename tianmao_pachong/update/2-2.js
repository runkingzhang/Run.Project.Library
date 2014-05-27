var request = require('request');
var cheerio = require('cheerio');
var gbk = require('gbk');
var debug = require('debug')('blog:update');

debug('读取博文列表');


function readArticleList (url, callback) {
	gbk.fetch(url,'utf-8').to('string', function (err, body) {
  if (err) throw err;
    // 根据网页内容创建DOM操作对象
   var $ = cheerio.load(body);
	
	 var articleList = [];
  $('.item4line1 .item').each(function () {
    var $me = $(this);
    var $title = $me.find('.detail a');
    var $time = $me.find('.atc_tm');
	var $prices = $me.find('.detail .attribute .cprice-area .c-price')
	var $sale = $me.find('.detail .attribute .sale-area .sale-num')
    var $img = $me.find('.photo a')
	var jpg = $img.html().trim().indexOf('.jpg')
    var item = {
      title: $title.text().trim(),
      url:   $title.attr('href'),
	  id:  $me.attr('data-id'),
	  prices: $prices.text().trim(),
	  sale: $sale.text().trim(),
	  img: $img.html().trim().substring(22,jpg+4+12)
    };
	
      articleList.push(item);
	 
    });

    // 检查是否有下一页
    var nextUrl = $('.pagination .next').attr('href');
    if (nextUrl) {
      // 读取下一页
      readArticleList(nextUrl, function (err, articleList2) {
        if (err) return callback(err);

        // 合并结果
        callback(null, articleList.concat(articleList2));
      });
    } else {
      // 返回结果
      callback(null, articleList);
    }
  });
}


readArticleList('http://adidas.tmall.com/category-246969712.htm?spm=a1z10.5.w4011-4188562504.730.ohVeSY&mid=w-4188562504-0&catId=246969712&pageNo=1#anchor', function (err, articleList) {
  if (err) console.error(err.stack);
  console.log(articleList);
});