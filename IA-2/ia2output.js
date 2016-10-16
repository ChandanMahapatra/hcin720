        var deviceID = "32001e000347343339373536";
        var accessToken = "e3fe50ff3713e00c4becc30e2615bf20d27afe04";
        var setFunc = "led";


    function powerOn() {
        var setValue = "on";
        document.getElementById("led-state").innerHTML = "LED is " + setValue;
        document.getElementById("led-state").style.fontSize = "24px";
        photonSetValue(setValue);
      }

    function powerOff() {
        var setValue = "off";
        document.getElementById("led-state").innerHTML = "LED is " + setValue;
        document.getElementById("led-state").style.fontSize = "24px";
        photonSetValue(setValue);
      }

      function photonSetValue(setValue) {
        var requestURL = "https://api.particle.io/v1/devices/" +deviceID + "/" + setFunc + "/";
        $.post( requestURL, { params: setValue, access_token: accessToken });
      }
