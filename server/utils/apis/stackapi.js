const axios = require('axios');
require('dotenv').config();

const stack = axios.create({
    baseURL: 'https://api.stackexchange.com/2.3/',
    headers: {
        'X-API-Key': process.env.STACK_API,
    },
    timeout: 10_000,
});

module.exports = stack;
