let express = require('express')

let app = express()

//importing all the routes

let membersRoute = require('./members/index')
let eventsRoute = require('./events/index')
let teamRoutes = require('./teams/index')
let imageRoutes = require('./images/index')
let typesRoutes = require('./types/index')
let transactionsRoutes = require('./transactions/index')

app.use('/members', membersRoute)
app.use('/events', eventsRoute)
app.use('/teams', teamRoutes)
app.use('/images', imageRoutes)
app.use('/types', typesRoutes)
app.use('/transactions', transactionsRoutes)


module.exports = app