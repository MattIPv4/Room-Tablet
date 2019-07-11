const express = require('express');
const ip = require('ip');

const render = (req, res) => {
    const options = {
        root: __dirname,
        dotfiles: 'deny'
    };

    const fileName = req.params.name || 'index.html';
    res.sendFile(fileName, options);
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

    app.post('/api/quit', function (req, res) {
        res.json({message: "Ok"});
        tablet.quit();
    });
};

const runControl = (tablet, port) => {
    const app = express();

    app.get('/', render);
    app.get('/:name', render);

    createAPI(app, tablet);

    app.listen(port);
    tablet.setDataText(`${ip.address()}:${port}`);
};

module.exports = runControl;
