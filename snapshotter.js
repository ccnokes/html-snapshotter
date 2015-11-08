#!/usr/bin/env node

const program = require('commander');
const server = require('./src/server');
const path = require('path');

program
    .version('1.0.0')
    .option('-s, --saveTo [value]', 'The directory we save HTML snapshots to. Default is ./static.', String, path.resolve('./static'))
    .option('-p, --port <n>', 'The port the server runs on. (Not implemented yet). Default is 9920.', Number, 9920)
    .parse(process.argv);

server.start({
    port: program.port,
    saveDir: program.saveTo
});
