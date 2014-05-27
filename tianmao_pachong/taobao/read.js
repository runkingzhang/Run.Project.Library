var originRequest = require('request');
var cheerio = require('cheerio');
var gbk = require('gbk');
var debug = require('debug')('blog:update:read');


/**
 * 请求指定URL
 *
 * @param {String} url
 * @param {Function} callback
 */
function request (url, callback) {
  originRequest(url, callback);
}
exports.articleList = function readArticleList (url, callback) {
	gbk.fetch(url,'utf-8').to('string', function (err, body) {
  if (err) throw err;
    // 根据网页内容创建DOM操作对象
   var $ = cheerio.load(body);
	
	 var articleList = [];
	 
  $('.J_TItems .item5line1 .item').each(function () {
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
	  img: $img.html().trim().substring(22,jpg+4)
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




