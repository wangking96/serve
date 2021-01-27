const deparmentApi = require('../doc/deparment')
const baseData = require('./base_controller')
const deparment = {
    getDeparment: (req, res) => {
        let sql = 'select * from deparment'
        deparmentApi.getDeparmentApi(sql)
        .then(data => {
            res.status(200).json(baseData(data))
        })
        .catch(err => {
            res.send(baseData())
        })
    }
}
module.exports = deparment