const mysql = require('mysql')
const db = require('./db')

module.exports = {
    query: (sql, params, callback) => {
        let con = mysql.createConnection(db)
        con.connect((err) => {
            if(err) {
                console.log('数据库连接失败！')
                throw err
            }
            con.query(sql, params, (err, res, fileds) => {
                if(err) {
                    console.log('SQL操作失败！')
                    throw err
                }
                callback && callback(res, fileds)

                con.end(err => {
                    if(err) {
                        console.log('数据库关闭连接失败！')
                        throw err
                    }
                })
            })
        })
    }
}