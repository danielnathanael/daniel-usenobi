const axios = require('axios');
const qs = require('qs');


const baseUrl = 'http://backend.test.usenobi.com:8000'

const login = async (email, password) => {
    let data = qs.stringify({
        'email': email,
        'password': password
    });
    let config = {
        method: 'post',
        url: `${baseUrl}/login`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    return axios(config)
        .then((response) => response)
        .catch((error) => {
            return error.response
        });
}

const getDashboard = async (token) => {
    let data = qs.stringify({
        'token': token,
    });
    let config = {
        method: 'post',
        url: `${baseUrl}/dashboard`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    return axios(config)
        .then((response) => response)
        .catch((error) => error);
}

const getList = async () => {
    let config = {
        method: 'get',
        url: `${baseUrl}/list`,
    };

    return axios(config)
        .then((response) => response)
        .catch((error) => error);
}

export default {
    login,
    getDashboard,
    getList
}