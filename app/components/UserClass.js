const uuidv1 = require('uuid/v1');

class UserClass {

    constructor(token,channel,socket) {
        this.uid = uuidv1();
        this.token = token;
        this.channel = channel;
        this.wsConnection = socket.id;
        socket.join(this.wsConnection);
        return this;
    }
}

module.exports  = UserClass;