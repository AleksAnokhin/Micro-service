const credentials = require('./credentials');
const params = require('./params');
const amqlib = require('amqplib');

class ProducerClass {

    constructor(IO) {
        this.io = IO;
        this.amqlib = amqlib;
        this.produce = this.produce.bind(this);
        return this;
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
}

module.exports = ProducerClass;