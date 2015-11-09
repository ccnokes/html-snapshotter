const Hapi = require('hapi');
const Joi = require('joi');
const Inert = require('inert');
const chalk = require('chalk');
const htmlMgr = require('./html-mgr.js');
const snapshotMgr = require('./snapshot-mgr.js');
const bookmarklet = require('./bookmarklet.js');


exports.start = function start(opts) {

    var server = new Hapi.Server();

    server.connection({
        port: opts.port,
        routes: {
            cors: true //enable CORS for all routes
        }
     });

    server.register(Inert, function(){});

    server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
            reply.redirect('/static');
        }
    });

    server.route({
        method: 'POST',
        path: '/snapshots',
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(1).required(),
                    html: Joi.string().min(1).required(),
                    origin: Joi.string().min(1).required(),
                    pathname: Joi.string().min(1).required(),
                    selector: Joi.string().min(1)
                }
            },
            handler(request, reply) {
                htmlMgr.saveHTML(opts.saveDir, request.payload)
                .then(
                    res => {
                        reply({
                            message: 'Saved',
                            url: server.info.uri + '/' + res
                        }).code(201);
                    },
                    err => {
                        reply(err).code(500);
                    }
                );
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/snapshots',
        handler(request, reply) {
            snapshotMgr.getAll(opts.saveDir)
            .then(
                files => {
                    reply({
                        files
                    });
                },
                err => {
                    reply(err).code(500);
                }
            );
        }
    });

    server.route({
        method: 'GET',
        path: '/bookmarklet',
        handler(request, reply) {
            reply(bookmarklet.getScript());
        }
    });

    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: opts.saveDir,
                redirectToSlash: true,
                index: false,
                listing: true,
                defaultExtension: 'html'
            }
        },
        config: {
            cache: {
                expiresIn: 1000 * 60 * 24 * 7,
                privacy: 'public'
            }
        }
    });

    server.start(function() {
        console.log(chalk.blue.bold('======================================'));
        console.log(chalk.blue.bold('Server started at localhost:' + opts.port));
        console.log(chalk.blue('Saving snapshots to:' + opts.saveDir));
        console.log(chalk.blue.bold('======================================'));
        console.log(chalk.bold('Paste this bookmarklet script into your browser to easily save HTML snapshots: '));
        console.log(bookmarklet.getScript());
    });
};
