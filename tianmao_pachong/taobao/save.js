var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:update:save');
/**
 * 保存淘宝商品
 *
 * @param {Object} list
 * @param {Function} callback
 */
 
exports.articleList = function (list, callback) {
  debug('保存文章分类列表到数据库中: %d', list.length);
	
  async.eachSeries(list, function (item, next) {
    // 查询分类是否已存在
    db.query('SELECT * FROM `pin_item` WHERE `id`=? ', [item.id], function (err, data) {
      if (err) return next(err);
	 // 将发布时间转成时间戳（秒）
	 
      var created_time = new Date().getTime() / 1000;
	  console.log("create_time");
	  console.log(created_time);
      if (Array.isArray(data) && data.length >= 1) {
        // 分类已存在，更新一下
        db.query('UPDATE `pin_item` SET  `title`=?,  `img`=?, `url`=? WHERE `id`=?', [item.title, item.img, item.url, item.id], next);
      } else {
		console.log(item.id);
		console.log(created_time);
        // 分类不存在，添加
        db.query('INSERT INTO `pin_item`(`id`,`cate_id`,`orig_id`, `uid`, `uname` ,`key_id`,`title`, `intro`, `img`, `price`,`url`,`add_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', 
		[item.id,9,1, 10, '设计系小女生', item.id,item.title ,item.title ,item.img ,item.prices, item.url,created_time], next);
      }
    });

  }, callback);
};
