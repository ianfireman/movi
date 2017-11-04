var ads1x15 = require('node-ads1x15');  
var chip = 0; //0 for ads1015, 1 for ads1115  

//Simple usage (default ADS address on pi 2b or 3):
var adc = new ads1x15(chip); 

// Optionally i2c address as (chip, address) or (chip, address, i2c_dev)
// So to use  /dev/i2c-0 use the line below instead...:

//    var adc = new ads1x15(chip, 0x48, 'dev/i2c-0');

var channel = 1; //channel 0, 1, 2, or 3...  
var samplesPerSecond = '250'; // see index.js for allowed values for your chip  
var progGainAmp = '4096'; // see index.js for allowed values for your chip  

//somewhere to store our reading   
var reading  = 0;  
var channel0 = 0;
var channel1 = 0;
var channel2 = 0;

if(!adc.busy)  
{  
  getChannel0(function(channel0Data) {
    channel0 = channel0Data;
    getChannel1(function(channel1Data) {
      channel1 = channel1Data;
      getChannel2(function(channel2Data) {
        channel2 = channel2Data;
        console.log(channel0);
        console.log(channel1);
        console.log(channel2);
      });
    });
  });
} 

function getChannel0(cb) {
  adc.readADCSingleEnded(0, progGainAmp, samplesPerSecond, function(err, data) {   
    if(err)  
    {  
      //logging / troubleshooting code goes here...  
      throw err;  
    }  
    // if you made it here, then the data object contains your reading!  
    cb(data);  
    // any other data processing code goes here...  
  });  
}

function getChannel1(cb) {
  adc.readADCSingleEnded(1, progGainAmp, samplesPerSecond, function(err, data) {   
    if(err)  
    {  
      //logging / troubleshooting code goes here...  
      throw err;  
    }  
    // if you made it here, then the data object contains your reading!  
    cb(data);  
    // any other data processing code goes here...  
  });  
}

function getChannel2(cb) {
  adc.readADCSingleEnded(2, progGainAmp, samplesPerSecond, function(err, data) {   
    if(err)  
    {  
      //logging / troubleshooting code goes here...  
      throw err;  
    }  
    // if you made it here, then the data object contains your reading!  
    cb(data);  
    // any other data processing code goes here...  
  });  
}