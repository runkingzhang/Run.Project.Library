var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:update:save');


/**
 * 保存文章列表
 *
 * @param {Number} class_id
 * @param {Array} list
 * @param {Function} callback
 */
exports.articleList = function (class_id, list, callback) {
  debug('保存文章列表到数据库中: %d, %d', class_id, list.length);

  async.eachSeries(list, function (item, next) {

    // 查询文章是否已存在
    db.query('SELECT * FROM `article_list` WHERE `id`=? AND `class_id`=? LIMIT 1',
      [item.id, class_id], function (err, data) {
      if (err) return next(err);

      // 将发布时间转成时间戳（秒）
      var created_time = new Date(item.time).getTime() / 1000;

      if (Array.isArray(data) && data.length >= 1) {
        // 分类已存在，更新一下
        db.query('UPDATE `article_list` SET `title`=?, `url`=?, `class_id`=?, `created_time`=? WHERE `id`=? AND `class_id`=?',
          [item.title, item.url, class_id, created_time, item.id, class_id], next);
      } else {
        // 分类不存在，添加
        db.query('INSERT INTO `article_list`(`id`, `title`, `url`, `class_id`, `created_time`) VALUES (?, ?, ?, ?, ?)',
          [item.id, item.title, item.url, class_id, created_time], next);
      }
    });

  }, callback);

};

