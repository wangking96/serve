const deparmentRoute = require('./deparment_route')

module.exports = function RouterModule(app) {
    app.use('/deparment', deparmentRoute)
}