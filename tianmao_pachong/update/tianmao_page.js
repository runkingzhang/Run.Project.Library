var request = require('request');
var cheerio = require('cheerio');
var gbk = require('gbk');
var debug = require('debug')('blog:update');

gbk.fetch('http://adidas.tmall.com/category-246969712.htm?spm=a1z10.1.w6392631-5605524937.7.ICWQuw').to('string', function (err, body) {
  if (err) throw err;
  var $ = cheerio.load(body);

function readArticleList (url, callback) {
  // 读取分类页面
  request(url, function (err, res) {
    if (err) return callback(err);
	
    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取博文列表 data-ksLazyload=
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

});

readArticleList('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function (err, articleList) {
  if (err) console.error(err.stack);
  console.log(articleList);
  
});