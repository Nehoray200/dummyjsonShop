const express = require('express');
const routesCarts = express.Router();
const { update, select, insert, remove, runAsync, allAsync, carts } = require('../db/db');


routesCarts.use((req, res, next) => {
    const userId = req.body.userId || req.query.userId;

    if (!userId) {
        return res.status(401).send("You must be logged in (missing userId)");
    }
    
    next();
});


routesCarts.post('/add', async (req, res) => {
    const result = await runAsync(insert(carts.name, req.body));
    res.send(result);
});

routesCarts.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.query; 
    const data = await allAsync(select(carts.name, { productId: productId, userId: userId }));
    
    if (data.length != 0) res.status(200).send(data[0]);
    else res.status(404).send("not found");
});

routesCarts.get('/', async (req, res) => {
    const { userId } = req.query; 
    const data = await allAsync(select(carts.name, { userId: userId }));
    
    const reduceCarts = data.map((cart) => ({
        id: cart.productId,
        quantity: cart.productQuantity
    }));
    res.send(reduceCarts);
});

routesCarts.patch('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { userId, ...updateData } = req.body; 

    const result = await runAsync(update(
        carts.name, 
        updateData, 
        { productId: productId, userId: userId }
    ));
    res.send(result);
});

routesCarts.delete('/all', async (req, res) => {
    const { userId } = req.query; 
    const result = await runAsync(remove(carts.name, { userId: userId }));
    res.send(result);
});

routesCarts.delete('/:userId/:productId', async (req, res) => {

    const { userId, productId } = req.params;
    const result = await runAsync(remove(carts.name, { userId: userId, productId: productId }));
    res.send(result);
});

module.exports = routesCarts;