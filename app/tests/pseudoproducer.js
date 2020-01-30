const Producer = require('../components/ProducerClass');
const test_message = require('../components/message');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(8081, function () {
    console.log("Server is running on port 8081");
    const producer = new Producer(io);

    //running test

    producer.produce(test_message);
    producer.produce(test_message);
    producer.produce(test_message);
    producer.produce(test_message);
    producer.produce(test_message);

});







