window.setInterval(function() {

        var deviceID = "32001e000347343339373536";
        var accessToken = "e3fe50ff3713e00c4becc30e2615bf20d27afe04";
        var varName = "Uptime";

        requestURL = "https://api.particle.io/v1/devices/" + deviceID + "/" + varName + "/?access_token=" + accessToken;

        $.getJSON(requestURL, function(json) {
                var getData = JSON.parse(json.result);
                document.getElementById("switch").innerHTML = "The door sensor value is: " + getData.digitalvalue;
                document.getElementById("switch").style.fontSize = "20px";
                //document.getElementById("sensor").innerHTML = "The proximity sensor value is: " + json.result;
                document.getElementById("sensor").innerHTML = "The proximity sensor value is: " + getData.analogvalue;
                 document.getElementById("sensor").style.fontSize = "20px";
                 });

}, 2000);

/*
window.setInterval(function() {
        var deviceID = "32001e000347343339373536";
        var accessToken = "e3fe50ff3713e00c4becc30e2615bf20d27afe04";
        var varName = "digitalvalue";
        var varName1 = "analogvalue";


       requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + varName + "/?access_token=" + accessToken;
       requestURL1 = "https://api.spark.io/v1/devices/" + deviceID + "/" + varName1 + "/?access_token=" + accessToken;

        $.getJSON(requestURL, function(json) {
                 document.getElementById("switch").innerHTML = "The condition is: " + json.result ;
                 document.getElementById("switch").style.fontSize = "20px";
                 });

        $.getJSON(requestURL1, function(json) {
                 document.getElementById("sensor").innerHTML = "The sensor value is: " + json.result ;
                 document.getElementById("sensor").style.fontSize = "20px";
                 });
}, 2000);
*/
