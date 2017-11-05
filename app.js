var myPythonScriptPath = 'scripts/differential.0.py';
// - 0 = Channel 0 minus channel 1
// - 1 = Channel 0 minus channel 3
// - 2 = Channel 1 minus channel 3
// - 3 = Channel 2 minus channel 3

// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);
// Use mqtt broker PubSub
const mqtt = require('mqtt')
const publisher = mqtt.connect('mqtt://localhost:1883')

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    publisher.publish('movi/info', message.toString());
});