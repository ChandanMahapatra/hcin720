    var deviceID = "32001e000347343339373536";
    var accessToken = "e3fe50ff3713e00c4becc30e2615bf20d27afe04";
    var setFunc = "led";

    var channel = 'pubnub-twitter';
    var pubnub = PUBNUB.init({
    subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe',
    ssl: true
    });


    function powerOn() {
        document.getElementById("led-state").innerHTML = "LED is ON";
        document.getElementById("led-state").style.fontSize = "24px";
        getStreamData();
    }

    function powerOff() {
        var setValue = "off";
        getStreamData();
        document.getElementById("led-state").innerHTML = "LED is " + setValue;
        document.getElementById("led-state").style.fontSize = "24px";
        stopStreamData();
        photonSetValue(setValue);
      }

      function photonSetValue(setValue) {
        var requestURL = "https://api.particle.io/v1/devices/" +deviceID + "/" + setFunc + "/";
        $.post( requestURL, { params: setValue, access_token: accessToken });
      }



    function getStreamData()
    {
		pubnub.subscribe({
			channel: channel,
			message: processData
		});
    }

      function stopStreamData()
    {
		pubnub.unsubscribe({
        channel : channel,
        });
    }

function processData(data)
    {
		 var str = data.text;
                if (str.toLowerCase().indexOf("game") >= 0 ) //search for the word game in a tweet
                     {
                        displayData(1);
                     }
                if (str.toLowerCase().indexOf("people") >= 0 ) //search for the word people in a tweet
                     {
                        displayData(2);
                     }
                else{
                        displayData(0);
                    }
    }


var wordGame = 0;
var wordPeople = 0;
var range = 0;

function displayData(detected)
    {
    range++;
    if(detected==1)
    {
        wordGame ++;
    }
    if(detected==2)
    {
        wordPeople ++;
    }

    if(range>=50)
    {
        if(wordGame!=0 && wordGame >= wordPeople)
        {
           var setValue = "red";
           console.log("Game");
           console.log(wordGame);
           photonSetValue(setValue);
        }
        else if(wordPeople!=0  && wordPeople >= wordGame)
        {
           var setValue = "green";
           console.log("People");
           console.log(wordPeople);
           photonSetValue(setValue);
        }

        else
        {
           var setValue = "blue";
           console.log("No Data");
           photonSetValue(setValue);
        }
        wordGame = 0;
        wordPeople = 0;
        range = 0;
    }
}