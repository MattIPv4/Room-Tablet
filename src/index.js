const tablet = require('./tablet/tablet.js');
const control = require('./control/control.js');

tablet.app.on('ready', () => {
    control(tablet, 3000);
});
