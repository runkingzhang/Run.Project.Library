// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:            '127.0.0.1',   // 数据库地址
  port:            3306,          // 数据库端口
  database:        'xinmiao',   // 数据库名称
  user:            'root',        // 数据库用户
  password:        ''             // 数据库用户对应的密码
});

// 博客配置
exports.sinaBlog = {
  url: 'http://nike.tmall.com/category-502996982.htm?spm=a1z10.5.w4011-2637950499.291.VeuuDn&mid=w-2637950499-0&search=y&parentCatId=493467018&parentCatName=%C4%D0%D7%D3&catName=%C9%CF%D2%C2&catId=502996982&pageNo=2#anchor'  // 博客首页地址
};

// Web服务器端口
exports.port = 3000;

// 定时更新
exports.autoUpdate = '* */30 * * *';  // 任务执行规则，参考 cron 语法
