const credentials = require('./credentials');
const amqlib = require('amqplib');
const params = require('./params');
//const test_message = require('./message');
const User = require('./UserClass');

class ConnectorClass {

    constructor(IO) {
            this.users = [];
            this.IO = IO;
            this.access_tokens=[];
            this.amqlib= amqlib;
            this.consume = this.consume.bind(this);
            this.produce = this.produce.bind(this);
            this.addUser = this.addUser.bind(this);
            this.findUser = this.findUser.bind(this);

            //actions
            this.consume();

            // test
            // this.produce();
            // this.produce();
            // this.produce();
            // this.produce();
            // this.produce();

            return this;

    }

    addUser(socket) {
            const token = socket.handshake.query.token;
            const channel = socket.handshake.query.channel;
            const user = new User(token,channel,socket);
            this.users.push(user);
            console.log('user ' + user.uid + 'has joined the room');
    }

    consume() {
        //checking if ssl is enabled
        if (typeof process.env.RABBITMQ_SSL !== 'undefined' || process.env.RABBITMQ_SSL !== null) {
            if (process.env.RABBITMQ_SSL === 'false') {
                console.log('connecting with basic options');
                this.amqlib.connect(credentials).then((conn) => {
                    return conn.createChannel();
                }).then((ch) => {
                    return ch.assertQueue(params.main_queue).then((ok) => {
                        return ch.consume(params.main_queue, (msg) => {
                            if (msg !== null) {
                                const message = JSON.parse(msg.content.toString());
                                console.log('here is the message from server',message);
                                // check message whether the message contains required params

                                if(message.access_tokens !== 'undefined' || message.channel !== 'undefined') {
                                    console.log('message contains correct keys');
                                    this.access_tokens=message.access_tokens;
                                    const channel = message.channel;
                                    console.log('List of users - important information', this.users);
                                    this.users.map((user) => {
                                        console.log('user in connection', user);
                                        if(this.access_tokens.includes(user.token) && user.channel === channel) {
                                            console.log('adding user to a channel - ',channel);
                                            console.log('checking the content of the message', message);
                                            this.IO.to(user.wsConnection).emit('bus',message.secret_message);
                                        }
                                    })
                                    ch.ack(msg);
                                } else {
                                    ch.noAck(msg);
                                }
                            }
                        });
                    });
                }).catch(console.warn);
            } else {
                console.log('In this case ssl options should be configured');
            }
        }
    }

    produce(test_message) {
        if (typeof process.env.RABBITMQ_SSL !== 'undefined' || process.env.RABBITMQ_SSL !== null) {
            if (process.env.RABBITMQ_SSL === 'false') {
                this.amqlib.connect(credentials).then((conn) => {
                    return conn.createChannel();
                }).then((ch) => {
                    return ch.assertQueue(params.main_queue).then(function (ok) {
                        return ch.sendToQueue(params.main_queue, Buffer.from(JSON.stringify(test_message)));
                    });
                }).catch(console.warn);

            } else {
                console.log('In this case ssl options should be configured');
            }
        }
    }

    findUser(uid) {
        return this.users.find((_user) => {
            _user.uid === uid;
        })
    }
}

module.exports = ConnectorClass;