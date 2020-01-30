const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ConnectorClass = require('./components/ConnectorClass');

// =============ENTRYPOINT===============///
server.listen(8080, function () {
    console.log("Server is running on port 8080");
    Connector = new ConnectorClass(io);
});

// ===========SOCKET_CONNECTION ==========//

io.on('connection', function(socket) {
    Connector.addUser(socket);
})

// ===========HTTP/HTTPS SECTION =========//

app.get('/', function(req, res) {
    res.send('<h1>TEST</h1>');
});

app.get('/clients', function(req,res) {
    res.sendFile(__dirname + '/index.html');
})

