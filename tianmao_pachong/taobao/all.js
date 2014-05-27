var async = require('async');
var config = require('../config');
var read = require('./read');
var save = require('./save');
var debug = require('debug')('blog:update:all');


var classList;
var articleList = {};

async.series([

  // 获取文章分类列表
  function (done) {
    read.articleList(config.sinaBlog.url, function (err, list) {
      articleList = list;
      done(err);
    });
  },

  // 保存文章分类
  function (done) {
    save.articleList(articleList, done)
  },


], function (err) {
  if (err) console.error(err.stack);

  console.log('完成');
  process.exit(0);
});