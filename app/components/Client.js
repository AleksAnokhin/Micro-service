const io = require('socket.io-client');

class Client {

    constructor() {
        this.io = io;
        this.connect = this.connect.bind(this);
        return this;
    }

    connect(data) {
        const socket = this.io.connect('http://localhost:8080', {
            query: {
                token: data.token,
                channel: data.channel,
            }
        })
        console.log('client successfully connected to server via ws');
        socket.on('bus', (data) => {
            console.log('data - ', data);
        })
    }



}

module.exports = Client;