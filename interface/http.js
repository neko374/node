//创建服务器，配一下跨域，然后暴露出去
const express = require("express")
const app = express()
// 导入cors
const cors = require("cors")
app.use(cors())

module.exports = app