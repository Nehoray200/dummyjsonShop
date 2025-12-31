const {connect,disconnect , buildTables, users, carts} = require('./db/db.js')
const express = require('express')
const cors = require('cors')
const routesCarts  = require('./routes/routesCarts.js')
const routesUsers = require('./routes/routesUsers.js')


const app = express()
app.use(express.json())
app.use(cors())

app.use('/carts',routesCarts)
app.use('/users',routesUsers)



app.listen(3000,async()=>{
    await connect()
    await buildTables([users,carts])
    console.log("server is on localhost:3000")
})