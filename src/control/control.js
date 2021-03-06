const express = require('express');
const ip = require('ip');
const simpleGit = require('simple-git');

let app, server;

const sendFile = (res, dir, file) => {
    res.sendFile(file, {
        root: dir,
        dotfiles: 'deny'
    });
};

const render = (req, res) => {
    sendFile(res, __dirname, req.params.name || 'index.html');
};

const createAPI = (tablet) => {
    app.use('/api', express.json());

    app.patch('/api/display', function (req, res) {
        tablet.setDisplay(req.body.brightness);
        res.json({message: "Ok"});
    });

    app.patch('/api/style', function (req, res) {
        tablet.setStyle(req.body.style);
        res.json({message: "Ok"});
    });

    app.patch('/api/text', function (req, res) {
        tablet.setText(req.body.large, req.body.small);
        res.json({message: "Ok"});
    });

    app.get('/api/quit', function (req, res) {
        tablet.setDataText(`Quitting at ${(new Date()).toLocaleString()}...`);
        res.json({message: "Ok"});
        tablet.quit();
    });

    const restart = () => {
        // Notify
        tablet.setDataText(`Restarting at ${(new Date()).toLocaleString()}...`);

        // Allow port access
        server.close();

        // Start new instance
        const spawn = require('child_process').spawn;
        const child = spawn(process.argv[0], process.argv.slice(1), {detached: true});
        child.unref();

        // Allow time for new instance to spawn
        setTimeout(() => {
            tablet.quit();
        }, 5000);
    };

    app.get('/api/restart', function (req, res) {
        res.json({message: "Ok"});
        restart();
    });

    app.get('/api/update', function (req, res) {
        tablet.setDataText(`Updating at ${(new Date()).toLocaleString()}...`);
        simpleGit().pull((err, update) => {
            if (update && update.summary.changes) {
                tablet.setDataText(`Installing at ${(new Date()).toLocaleString()}...`);
                const child = require('child_process').exec('npm i');
                child.stdout.pipe(process.stdout);
                child.on('exit', function() {
                    res.json({message: "Ok"});
                    restart();
                });
            } else {
                tablet.setDataText(`Failed to update at ${(new Date()).toLocaleString()}`);
            }
        });
    });
};

const runControl = (tablet, port) => {
    app = express();

    app.get('/', render);
    app.get('/:name', render);

    app.get('/node/css', (req, res) => {
        sendFile(res, process.cwd(), 'node_modules/mini.css/dist/mini-dark.min.css');
    });

    createAPI(tablet);

    server = app.listen(port);
    tablet.setDataText(`${ip.address()}:${port} | Started ${(new Date()).toLocaleString()}`);
};

module.exports = runControl;
