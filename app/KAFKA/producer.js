const Kafka = require("node-rdkafka");
// read the KAFKA Brokers and KAFKA_TOPIC values from the local file config.js
const externalConfig = require('./config')
// function to generate a message
const generateMessage = (ID) => new Buffer.from(
    `{
                    "name": "User added to admin account",
                    "summary": "Signature ID 'BI Win user added to admins group'****",
                    "event_ID": ${ID},
                    "source_IP": "10.10.10.10",
                    "dest_IP": "10.10.10.10",
                    "source_user": "123456789",
                    "dest_user": "shivi",
                    "event_count": "5",
                    "sig_ID": "11-111111",
                    "rule": "BI Win user added to admins group object = smslogin"
                    }`)

function generateAndProduceMessages(arg) {
    for (var i = 0; i < messageBatchSize; i++) {
        producer.produce(topic, -1, generateMessage(i), i)
    }
    console.log(`producer ${arg.name} is done producing messages to Kafka Topic ${topic}.`)
}
// construct a Kafka Configuration object understood by the node-rdkafka library
// merge the configuration as defined in config.js with additional properties defined here
const kafkaConf = {...externalConfig.kafkaConfig
    , ...{ "socket.keepalive.enable": true,
        "debug": "generic,broker,security"
    }
}
const messageBatchSize = 3 // number of messages to publish in one burst
const topic = externalConfig.topic; // create a Kafka Producer - connected to the KAFKA_BROKERS defined in config.js
const producer = new Kafka.Producer(kafkaConf);

prepareProducer(producer) // initialize the connection of the Producer to the Kafka Cluster
producer.connect()

function prepareProducer(producer) { // event handler attached to the Kafka Producer to handle the ready event that is emitted when the Producer has connected sucessfully to the Kafka Cluster
    producer.on("ready", function (arg) {
        console.log(`Producer connection to Kafka Cluster is ready; message production starts now`)
        generateAndProduceMessages(arg);
        // after 10 seconds, disconnect the producer from the Kafka Cluster
        setTimeout(() => producer.disconnect(), 10000);
    });
    producer.on("disconnected", function (arg) { process.exit(); });
    producer.on('event.error', function (err) {
        console.error(err);
        process.exit(1);
    });
    // This event handler is triggered whenever the event.log event is emitted, which is quite often
    producer.on('event.log', function (log) { // uncomment the next line if you want to see a log message every step of the way
        //console.log(log);
    });
}