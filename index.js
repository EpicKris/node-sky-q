const find = require('local-devices');

find('192.168.1.3').then(device => {
    console.log(device);
});

find('192.168.1.7').then(device => {
    console.log(device);
});