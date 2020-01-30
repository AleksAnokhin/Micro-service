const credentials = {
    protocol: 'amqp',
    hostname: 'rabbitmq',
    port: 5672,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/',
}

module.exports = credentials;