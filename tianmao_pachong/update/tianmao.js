var cheerio = require('cheerio');
var gbk = require('gbk');

gbk.fetch('http://adidas.tmall.com/category-246969712.htm?spm=a1z10.1.w6392631-5605524937.7.ICWQuw').to('string', function (err, body) {
  if (err) throw err;

  var $ = cheerio.load(body);
	
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
  
  // 输出网页标题
  console.log(articleList);
  
});