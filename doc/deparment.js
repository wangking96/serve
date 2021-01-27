const db = require('../config/dbhelper')
const deparment = {
    getDeparmentApi: (sql) => {
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if(err) reject(err)
                if(result) resolve(result)
            })
        })
    }
}

module.exports = deparment