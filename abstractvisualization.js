$(document).ready(function() {
    
var channel = 'pubnub-twitter';

var pubnub = PUBNUB.init({
    subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe',
		ssl: true
	});

    
    
function getStreamData() {
		pubnub.subscribe({
			channel: channel,
			message: processData
		});
	}
    
var circleSize = 40;  
    
function initData()
    {  
          //d3.selectAll("svg").remove();
           var bodySelection = d3.select("#chart");
 
            var svgSelection = bodySelection.append("svg")
                                 .attr("width", 700)
                                .attr("height", 300);
     
            var circleSelection = svgSelection.append("circle")
                                   .attr("cx", circleSize)
                                    .attr("cy", circleSize)
                                  .attr("r", circleSize)
                                .style("fill", "rgba(3,169,244,1)");
}

initData();
    
var height1 = 0;
var height2 = 0;
var range = 0;
var newSize1 = 0;
var newSize2 = 0;    
    
function displayData(detected)
    {
    range++; 
    if(detected==1)
    {
        height1 ++; 
        newSize1 = height1*circleSize;    
    }
    if(detected==2)
    {
        height2 ++;
         newSize2 = height2*circleSize; 
    }
    
    if(range>=50)
    {
        if(height1!=0 && height1 >= height2)
        {
           d3.selectAll("svg").remove();
            var bodySelection = d3.select("#chart");
 
            var svgSelection = bodySelection.append("svg")
                                 .attr("width", 700)
                                .attr("height", 300);
            
            var circleSelection = svgSelection.append("circle")
                                               .attr("cx", newSize1)
                                                .attr("cy", newSize1)
                                              .attr("r", newSize1)
                                            .style("fill", "rgba(211,47,47,1)"); 
        }
        else if(height2!=0)
        {
            d3.selectAll("svg").remove();
            var bodySelection = d3.select("#chart");
 
            var svgSelection = bodySelection.append("svg")
                                 .attr("width", 700)
                                .attr("height", 300);
            
            var circleSelection = svgSelection.append("circle")
                                               .attr("cx", newSize2)
                                                .attr("cy", newSize2)
                                              .attr("r", newSize2)
                                            .style("fill", "rgba(69,39,160,1)"); 
        }
        
        else
        {   
           d3.selectAll("svg").remove();
            var bodySelection = d3.select("#chart");
 
            var svgSelection = bodySelection.append("svg")
                                 .attr("width", 700)
                                .attr("height", 300);
            
            var circleSelection = svgSelection.append("circle")
                                               .attr("cx", circleSize)
                                                .attr("cy", circleSize)
                                              .attr("r", circleSize)
                                            .style("fill", "rgba(3,169,244,1)"); 
        }
        height1 = 0; 
        height2 = 0;
        range = 0; 
    }
}    

function processData(data) {
                            var str = data.text; 
                            if (str.toLowerCase().indexOf("game") >= 0)
                            {
                                console.log(str);
                                displayData(1);
                            } 
                            if (str.toLowerCase().indexOf("people") >= 0 ) 
                            {
                              console.log(str);
                                displayData(2);
                            } 
                            else{
                                displayData(0);
                            }
                        }
    
    getStreamData();
    
}); 

