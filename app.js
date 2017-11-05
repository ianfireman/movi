var spawn = require('child_process').spawn,
  py = spawn('python', ['readAccelerometer.py']);

py.stdout.on('data', function (data) {
  console.log(data);
});

py.stdin.end();