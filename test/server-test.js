/**
 * just for quick and easy iterations with nodemon
 */

const server = require('../src/server');

server.start({
    port: 9920,
    saveDir: './static'
});
