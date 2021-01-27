module.exports = function baseData(data) {
    let result = {}
    if(data) {
        result = {
            code: 200,
            message: 'success',
            data
        }
    }else {
        result = {
            code: 400,
            message: 'error'
        }
    }
    return result
}