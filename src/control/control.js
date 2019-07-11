const express = require('express');
const ip = require('ip');
const simpleGit = require('simple-git');

const sendFile = (res, dir, file) => {
    res.sendFile(file, {
        root: dir,
        dotfiles: 'deny'
    });
};

const render = (req, res) => {
    sendFile(res, __dirname, req.params.name || 'index.html');
};

const createAPI = (app, tablet) => {
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
        res.json({message: "Ok"});
        tablet.quit();
    });

    const restart = () => {
        const spawn = require('child_process').spawn;
        const child = spawn(process.argv[0], process.argv.slice(1), {detached: true});
        child.unref();

        tablet.quit();
    };

    app.get('/api/restart', function (req, res) {
        res.json({message: "Ok"});
        restart();
    });

    app.get('/api/update', function (req, res) {
        simpleGit().pull((err, update) => {
            if (update && update.summary.changes) {
                const child = require('child_process').exec('npm i');
                child.stdout.pipe(process.stdout);
                child.on('exit', function() {
                    res.json({message: "Ok"});
                    restart();
                });
            }
        });
    });
};

const runControl = (tablet, port) => {
    const app = express();

    app.get('/', render);
    app.get('/:name', render);

    app.get('/node/css', (req, res) => {
        sendFile(res, process.cwd(), 'node_modules/mini.css/dist/mini-dark.min.css');
    });

    createAPI(app, tablet);

    app.listen(port);
    tablet.setDataText(`${ip.address()}:${port}`);
};

module.exports = runControl;
