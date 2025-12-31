const express = require('express');
const routesUsers = express.Router()
const { update, select, insert, remove, runAsync, allAsync, users } = require('../db/db')

const validateBody = (req, res, next) => {
    if (!req.body) {
        res.status(400).send("need body in req")
        return
    }
    const { id, firstName,lastName, password, birthday, email, phone } = req.body
    console.log(req.body)
    if (!id || !firstName || !lastName || !password || !birthday || !email || !phone )
        res.status(401).send("missing data in req.body {id,First Name,Last name ,password,birthday,email,phone}")
    else
        next()
}
const validateBodyUpdate = (req, res, next) => {
    const { id } = req.params
    // console.log(req.params)

    if (!req.body || req.body.id || !id) {
        res.status(400).send("no id in req.body,no body")
        return
    }

    if (!req.body) {
        res.status(400).send("need body in req,need id in params")
        return
    }
    console.log(req.body)
    next()
}
const validateQuery = (req, res, next) => {
    if (!req.query) {
        res.status(400).send("need query in req")
        return
    }
    const { email, password } = req.query
    console.log(req.query)
    if (!email || !password)
        res.status(400).send("missing data {email,password} in req.query")
    else
        next()
}
const validateDucplicate = async (req, res, next) => {
    const { id } = req.body
    const data = await allAsync(select(users.name, { id: id }))
    if (data.length != 0)
        res.status(409).send("user allready exisit")
    else
        next()
}

routesUsers.post('/register', validateBody, validateDucplicate, async (req, res) => {
    const result = await runAsync(insert(users.name, req.body))
    res.send(result)

})
routesUsers.get('/login', validateQuery, async (req, res) => {
    const { email, password } = req.query
    const data = await allAsync(select(users.name, { email: email, password: password }))
    console.log(data)
    if (data.length != 0) {
        const user = data[0];
        res.status(200).json(user);
    }
    else
        res.status(404).send("wrong password or email")
})
routesUsers.get('/user/:id', async (req, res) => {
    if (!req.params) {
        res.status(400).send("need id")
        return
    }
    const { id } = req.params
    const data = await allAsync(select(users.name, { id: id }))
    if (data.length != 0)
        res.status(200).send(data[0])
    else
        res.status(404).send("not found")
})
routesUsers.get('/users', async (req, res) => {

    const data = await allAsync(select(users.name))
    const reduceUsers = data.map((user) => {
        return {
            id: user.id,
            name: user.name
        }
    })
    res.send(reduceUsers)
})
routesUsers.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const result = await runAsync(remove(users.name, { id: id }))
    res.send(result)
})
routesUsers.patch('/user/:id', validateBodyUpdate, async (req, res) => {
    const { id } = req.params
    const result = await runAsync(update(users.name, req.body, { id: id }))
    res.send(result)
})
routesUsers.delete('/all', async (req, res) => {
    const result = await runAsync(remove(users.name, {}))
    res.send(result)
})

module.exports = routesUsers