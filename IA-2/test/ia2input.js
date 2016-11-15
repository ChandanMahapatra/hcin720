window.setInterval(function() {

        var deviceID = "32001e000347343339373536";
        var accessToken = "e3fe50ff3713e00c4becc30e2615bf20d27afe04";
        var varName = "inputSensors";

        requestURL = "https://api.particle.io/v1/devices/" + deviceID + "/" + varName + "/?access_token=" + accessToken;

        $.getJSON(requestURL, function(json) {

                var getData = JSON.parse(json.result);


                document.getElementById("switch").innerHTML = "The door sensor value is: " + getData.switchValue;
                document.getElementById("switch").style.fontSize = "15px";
                document.getElementById("sensor").innerHTML = "The proximity sensor value is: " + getData.sensorValue;
                document.getElementById("sensor").style.fontSize = "15px";

                var newSensorValue = +getData.sensorValue;//convert string to int

                 if(getData.switchValue == "0")//if door sensor connected
                 {

                     document.getElementById("switch-alarm").innerHTML = "Door is Closed";

                    var alertBox = document.querySelector("#box-switch");
                    alertBox.classList.remove("box-switch-Alert");
                    var alertBox = document.querySelector("#box-switch");
                    alertBox.classList.add("box-switch-noAlert");
                    var alertBox = document.querySelector("#box-sensor");
                    alertBox.classList.remove("box-sensor-Alert");
                    var alertBox = document.querySelector("#box-sensor");
                    alertBox.classList.add("box-sensor-noAlert");

                     if(newSensorValue>=1800) //proximity sensor object detection
                     {
                       document.getElementById("sensor-alarm").innerHTML = "Warning: Object is very close!!!";
                     }
                     else if(newSensorValue>=1200 && newSensorValue<1800)
                     {
                        document.getElementById("sensor-alarm").innerHTML = "Warning: Object is close";
                     }
                     else
                     {
                        document.getElementById("sensor-alarm").innerHTML = "No Object nearby";
                     }
                 }
                else //door sensor not connected
                {
                    document.getElementById("switch-alarm").innerHTML = "ALERT !!! Door is open";
                    document.getElementById("sensor-alarm").innerHTML = "ALERT !!! Door is open";
                    var alertBox = document.querySelector("#box-switch");
                    alertBox.classList.remove("box-switch-noAlert");
                    var alertBox = document.querySelector("#box-switch");
                    alertBox.classList.add("box-switch-Alert");
                    var alertBox = document.querySelector("#box-sensor");
                    alertBox.classList.remove("box-sensor-noAlert");
                    var alertBox = document.querySelector("#box-sensor");
                    alertBox.classList.add("box-sensor-Alert");
                }

                 });

}, 1000);
