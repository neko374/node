// 导入三个自定义模块

const conn = require("./mysql")
const sqls = require("./sql")
const app = require("./http")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
// 配置服务器端口
const service = app.listen(2333, () => {
    console.log("服务器运行在http://127.0.0.1:2333");
})

//创建一个接口文件的对象
const sqlObj = new sqls()

//登录
app.get("/api/login", (req, res) => {
    var name = req.query.name
    var pas = req.query.pas
    var qu = sqlObj.LOGIN_SQL
    conn.query(qu, [name, pas], (err, result) => {
        if (err) {
            return res.json({
                err_code: 0,
                msg: "登录失败/发生错误"
            })
        } else if (result.length == 0) {
            return res.json({
                err_code: 1,
                msg: "用户名或密码有误"
            })
        } else {
            res.json({
                err_code: 200,
                msg: "登录成功",
                role: result[0].role,//0管理员，1评审，2用户
                uid: result[0].uid
            })
        }
    })
})

//注册
app.post("/api/reg", (req, res) => {
    var name = req.body.name
    var pas = req.body.pas
    var truename = req.body.truename
    var phone = req.body.phone
    var department = req.body.department
    var mailbox = req.body.mailbox
    var qu = sqlObj.REG_SQL
    conn.query(qu, [name, pas, truename, phone, department, mailbox], (err, result) => {
        res.json({
            err_code: 200,
            msg: "注册成功"
        })
    })
})

app.get('/api/header', (req, res) => {
    const qu = sqlObj.HEADER_SQL
    const uid = req.query.uid
    conn.query(qu, uid, (err, result) => {
        if (err) {
            return res.json({ err_code: 0, msg: err })
        } else {
            res.json({
                err_code: 200,
                data: result
            })
        }
    })
})

app.get('/api/search', (req, res) => {
    const qu = sqlObj.SEARCH_SQL
    const aid = req.query.aid
    var title = '%' + req.query.title + '%'
    conn.query(qu, [aid, title], (err, result) => {
        if (err) {
            return res.json({ err_code: 0, msg: err })
        } else {
            res.json({
                err_code: 200,
                data: result
            })
        }
    })
})

app.get('/api/buy', (req, res) => {
    const status = req.query.status
    const qu = sqlObj.BUY_SQL
    conn.query(qu, status, (err, result) => {
        if (err) {
            return res.json({ err_code: 0, msg: err })
        } else {
            res.json({
                err_code: 200,
                data: result
            })
        }
    })
})


//积分
app.post('/api/cpoint', (req, res) => {
    var uid = req.body.uid
    var points = req.body.points
    var qu = sqlObj.CPOINT_SQL
    conn.query(qu, [points, uid], (err, result) => {
        if (err) {
            return res.json({
                err_code: 0,
                msg: "失败" + err,
            })
        } else if (result.affectedRows === 1) {
            res.json({
                err_code: 200,
                msg: "成功",
            })
        }
    })
})

app.get('/api/paper', (req, res) => {
    const qu = sqlObj.PAPER_SQL
    conn.query(qu, (err, result) => {
        if (err) {
            return res.json({ err_code: 0, msg: err })
        } else {
            res.json({
                err_code: 200,
                data: result
            })
        }
    })
})

app.get('/api/zhuanjia', (req, res) => {
    const qu = sqlObj.ZHUANJIA_SQL
    const docid = req.query.docid
    conn.query(qu, docid, (err, result) => {
        if (err) {
            return res.json({ err_code: 0, msg: err })
        } else {
            res.json({
                err_code: 200,
                data: result
            })
        }
    })
})

// 从standard获取所有的数据
app.get('/api/stand', (req, res) => {
    var GetAll = sqlObj.STAND_SQL
    conn.query(GetAll, (err, result) => {
        if (err) {
            return res.json({
                code: 0,
                msg: '查询失败' + err
            })
        }
        res.json({
            code: 200,
            msg: '查询成功',
            data: result
        })
    })
})

// 将评价分写入数据库
app.post('/api/score', (req, res) => {
    var p1 = req.body.p1
    var p2 = req.body.p2
    var p3 = req.body.p3
    var p4 = req.body.p4
    var p5 = req.body.p5
    var comment = req.body.comment
    var point = req.body.point
    var reviewer = req.body.review
    var docid = req.body.docid
    var qu = sqlObj.SPOINT_SQL
    conn.query(qu, [p1, p2, p3, p4, p5, comment, point, reviewer, docid], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                code: 0,
                msg: '数据修改失败'
            })
            return
        }
        if (result.affectedRows == 1) {
            res.json({
                code: 200,
                msg: '数据修改成功'
            })
        }
    })
})

app.get('/api/user', (req, res) => {
    var GetAll = sqlObj.USER_SQL
    conn.query(GetAll, (err, result) => {
        if (err) {
            return res.json({
                code: 0,
                msg: '查询失败' + err
            })
        }
        res.json({
            code: 200,
            msg: '查询成功',
            data: result
        })
    })
})
//管理员表
app.post('/api/role', (req, res) => {
    var uid = req.body.uid
    var point = req.body.point
    var role = req.body.role
    var qu = sqlObj.ROLE_Sql
    conn.query(qu, [point, role, uid], (err, result) => {
        console.log(err);
        if (err) {
            res.json({
                err_code: 0,
                msg: "修改失败! "
            })
            return
        }
        if (result.affectedRows === 1) {
            res.json({
                err_code: 200,
                msg: "修改成功"
            })
        }
    })
})

