const Client = require('../components/Client');

const data = {
    token: 'abc',
    channel : 'bus'
}

const client = new Client();
client.connect(data);
console.log('end of client code');
