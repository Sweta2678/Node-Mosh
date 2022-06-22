const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: {
        type:Boolean,
        required: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    phone: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomerName(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        isGold: Joi.boolean().default(false)
    });
    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate= validateCustomerName;
