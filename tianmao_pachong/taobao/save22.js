var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:update:save');


/**
 * 保存文章分类
 *
 * @param {Object} list
 * @param {Function} callback
 */
 
exports.articleList = function (list, callback) {
  debug('保存商品到商品列表页中: %d', list.length);
  async.eachSeries(list, function (item, next) {
    // 查询分类是否已存在
  db.query('SELECT * FROM `pin_item` WHERE `id`=? LIMIT 1', [item.id],
      function (err, data) {
      //如果这个商品已经存在了就下一个
      if (err) return next(err);
	   var id =item.id;
	   var cate_id = 3;
	   var orig_id = 1;
	   var uid = 14;
	   var uname = "泡芙小米粒";
	   var key_id = item.id;
	  
	   var title = item.title;
	   var intro = item.title;
	   var img = item.img;
	   var price = item.price;
	   var rates = 6.00;
	 
	   var url =item.url;
	   var type = 1;
	   var hits = item.sale;
	   var likes = 0;
	   var comments = 0;
	   
	   var cmt_taobao_time = 1353896347;
	   var add_time =  new Date(item.time).getTime() / 1000;
	   var tag_cache = "";
	   var comments_cache	 = 'a:9:{i:331;s:6:"平底";i:332;s:9:"雪地靴";i:51;s:6:"正品";i:235;s:6:"秋冬";i:52;s:6:"新款";i:228;s:6:"女士";i:83;s:6:"时尚";i:225;s:6:"包邮";i:236;s:4:"2012";}';
	   var seo_title = "item.title";

	   var seo_keys = "item.title";
	   var seo_desc = "item.title";
	   var ordid = 255;
	    var status = 1;
	   
	  var created_time = new Date(item.time).getTime() / 1000;
		 
      if (Array.isArray(data) && data.length >= 1) {
        // 分类已存在，更新一下
        db.query('UPDATE `pin_item` SET `name`=?, `url`=? WHERE `id`=?', [item.name, item.url, item.id], next);
      } else {
        // 分类不存在，添加
		 db.query(
		 'INSERT INTO `pin_item`(`id`, `cate_id`, `orig_id`, `uid`, `uname`, `key_id`, `title`, `intro`, `img`, `price`, `rates`, `url`, `type`, `hits`, `likes`, `comments`, `cmt_taobao_time`, `add_time`, `tag_cache`, `comments_cache`, `seo_title`, `seo_keys`, `seo_desc`, `ordid`, `status`) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ??, ?, ?, ?, ??, ?, ?, ?, ??, ?, ?, ?, ?)',
          [id, cate_id, orig_id, uid, uname, key_id, title, intro, img, price, rates, url, type, hits, likes, comments, cmt_taobao_time, add_time, tag_cache, comments_cache, seo_title, seo_keys, seo_desc, ordid, status], next);
		  
		
      }
    });

  }, callback);
};
