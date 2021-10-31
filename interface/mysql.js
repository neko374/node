// 连接数据库
const mysql = require("mysql")

// 建立连接
const db = mysql.createConnection({
    host: "127.0.0.1",//数据库的ip地址
    user: "root",//数据库登录账户
    password: "19991240",//数据库的登录密码
    port: 3306,//数据库的端口号
    database: "paper"//指定要操作哪个库
})

// 开始连接
db.connect()

module.exports = db