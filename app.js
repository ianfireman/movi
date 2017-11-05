var myPythonScriptPath = 'scripts/differential.0.py';
// - 0 = Channel 0 minus channel 1
// - 1 = Channel 0 minus channel 3
// - 2 = Channel 1 minus channel 3
// - 3 = Channel 2 minus channel 3

var timeLapse = 0;
var count = 0;

var PythonShell = require('python-shell');

const mqtt = require('mqtt')
const publisher = mqtt.connect('mqtt://localhost:1883')

var time = setInterval(() => {
    	timeLapse = timeLapse + 1;
}, 1000);

var pyshell;

function action(){
 pyshell = new PythonShell(myPythonScriptPath);
pyshell.on('message', function (message) {
		var toPublish = message +","+ timeLapse;
        	publisher.publish('movi/info',toPublish.toString());
        	console.log(toPublish);
 
	    });
}

publisher.subscribe('movi/action');

console.log('waiting...');

publisher.on('message', (topic, message) => {
  if(topic === 'movi/action') {
	console.log('action: '+ message)
	if(message == 'stop'){
		console.log("entrou");
		pyshell.childProcess.kill();
		console.log('waiting...');
		timeLapse = 0;
	}else{
		timeLapse = 0;
		action(message);
	}
	
  }
})

