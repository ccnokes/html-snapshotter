const server = require('./server');

server.start({
    port: 9920,
    saveDir: './static'
});
