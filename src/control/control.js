const express = require('express');

const runAPI = tablet => {
    const app = express();

    app.get('/', function (req, res) {
        res.send('Hello World')
    });

    app.use('/api', express.json());

    app.patch('/api/display', function (req, res) {
        tablet.setDisplay(req.body.brightness);
        res.json({message: "Ok"});
    });

    app.listen(3000);
};

module.exports = runAPI;
