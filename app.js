$(document).ready(function() {
    
var channel = 'pubnub-twitter';

var pubnub = PUBNUB.init({
	//windowing     : 1000,	
    subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe',
		ssl: true
	});


function unsub(){
    pubnub.unsubscribe({
            channel: channel
        });
}
    
    
function getStreamData() {
		pubnub.subscribe({
			channel: channel,
			message: processData
		});
    //setTimeout(function(){unsub();},1000);
	}
    
    
var myLiveChart;
var latestLabel=0;
    
function initChart(){
    var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: [],
      datasets: [
          {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              //data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              data : []
          }
      ]
    },
    latestLabel = startingData.labels[0];

  // Reduce the animation steps for demo clarity.
  myLiveChart = new Chart(ctx).Line(startingData, {
                                animationSteps: 15,
                                scaleOverride : true,
                                scaleSteps : 5,
                                scaleStepWidth : 1,
                                scaleStartValue : 0 
                                });
}

initChart();
    
var height = 0;
var range = 0;
    
function displayData(detected){
    range++;
    if(detected){
        height ++;
    }
    
    if(range>=50){
        
        // Plot Data
        myLiveChart.addData([height], latestLabel);
        
        if(latestLabel>500)
        {
            // Remove the first point so we don't just add values forever
            myLiveChart.removeData();
        }
        latestLabel=latestLabel+50; //Adding new data point on x-axis
        height = 0; //Resetting the value of y-axis to 0 to plot the next value
        range = 0; //Resetting the value of range to 0 to plot the next value
    }
  
}

function processData(data) {
   
         //console.log(data)
		 var str = data.text;
         //console.log(count);
                            // $(msg.text).find("football");
                            if (str.toLowerCase().indexOf("game") >= 0)
                            {
                              console.log(str);
                              //console.log(1);
                              //setTimeout(function(){displayData(1);},1000);
                                displayData(true);
                            } 
                            else{
                                //setTimeout(function(){displayData(0);},1000);
                                displayData(false);
                            }
	}
    
	//setInterval(function(){getStreamData();},1500);
    getStreamData();
}); 

