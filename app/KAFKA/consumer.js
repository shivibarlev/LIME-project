const Kafka = require("node-rdkafka"); // see: https://github.com/blizzard/node-rdkafka
const externalConfig = require('./config');
const Alert = require("../controllers/API/CRUD.alert.controller");

const CONSUMER_GROUP_ID = "node-consumer"
// construct a Kafka Configuration object understood by the node-rdkafka library
// merge the configuration as defined in config.js with additional properties defined here
const kafkaConf = {...externalConfig.kafkaConfig ,
    ...{ "group.id": CONSUMER_GROUP_ID,
        "socket.keepalive.enable": true,
        "debug": "generic,broker,security"}
};
const topics = [externalConfig.topic]
let stream = new Kafka.KafkaConsumer.createReadStream(kafkaConf, { "auto.offset.reset": "earliest" }, { topics: topics })
stream.on('data', function (message) {
    console.log(`Consumed message on Stream: ${message.value.toString()}`);
    //add to the DB
    Alert.addAlert(JSON.parse(message.value.toString()));

});


console.log(`Stream consumer created to consume from topic ${topics}`);
stream.consumer.on("disconnected", function (arg) {
    console.log(`The stream consumer has been disconnected`)
    process.exit();
});

// automatically disconnect the consumer after 30 seconds
setTimeout(function () { stream.consumer.disconnect(); }, 30000)
