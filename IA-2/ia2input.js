 function start(objButton) {

        document.getElementById("switch").innerHTML = "Waiting for data...";
        //document.getElementById("sensor").innerHTML ="";
        var deviceID = "32001e000347343339373536";
        var accessToken = "e3fe50ff3713e00c4becc30e2615bf20d27afe04";
        var varName = "digitalvalue";
        //var varName = "analogvalue";

        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + varName + "/?access_token=" + accessToken;

        $.getJSON(requestURL, function(json) {
                 document.getElementById("switch").innerHTML = json.result + " the condition";
                 document.getElementById("switch").style.fontSize = "20px";
                 //document.getElementById("tstamp").innerHTML = json.coreInfo.last_heard;
                 });
    }
