const Conectar = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const config = {
    server: 'IDEA-PC',
    authentication: {
        type: 'default',
        options: {
            userName: 'cris',
            password: 'DiosArrasador318',
        }
    },
    options: {
        port: 1433,
        database: 'db_hotel',
        trustServerCertificate: true,
        trustedConnection: true
    }
};

module.exports = { Conectar, Request, TYPES, config };
