const express = require('express')
const app = express()
const router = require('./router')

app.all('*', function (req, res, next) {
    // 设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin', '*');
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     // header头信息设置结束后，结束程序往下执行，返回
    if (req.method.toLowerCase() == 'options') {
        res.send(200);  // 让options尝试请求快速结束
    } else {
        next();
    }
})
router(app)

app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

module.exports = app