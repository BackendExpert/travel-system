const axios = require('axios');

function createGeminiClient(apiKey) {
    return axios.create({
        baseURL: 'https://generativelanguage.googleapis.com/v1beta',
        headers: { 'Content-Type': 'application/json' },
        params: { key: apiKey },
        timeout: 60000,
    });
}

module.exports = createGeminiClient;
