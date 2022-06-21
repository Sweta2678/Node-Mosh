const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer,validate} = require('../models/customer');


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    if (!customers.length > 0) return res.status(404).send('No customers available...');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('No customer associated with the requested Id...');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
    //res.end();
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {
        new: true
    });
    if (!customer) return res.status(404).send('No customer associated with the requested Id...');

    res.send(customer);
    //res.end();
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('No customer associated with the requested Id...');

    res.send(customer);
    //res.end();
});



module.exports = router;