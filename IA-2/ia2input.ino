int sensorIn = A0; //input from analog proximity sensor.
int switchPin = D2;//input from door sensor
int ledPin = D7;//output from photon.
int data = 0;
int readSensorValue = 0;
int readSwitchValue = 0;
char postString[64];


void setup() {
   Serial.begin(9600);//begin commmand - serial monitor
   pinMode(sensorIn, INPUT);//proximity sensor
   pinMode(switchPin,  INPUT_PULLUP);//door sensor
   pinMode(ledPin, OUTPUT);//led output
}

void loop() {
   data = analogRead(sensorIn);
   Serial.println(data);//print output values.
   Serial.println(digitalRead(switchPin));
   readSensorValue = analogRead(sensorIn);
   readSwitchValue = digitalRead(switchPin);
   unsigned sensorValue = readSensorValue;
   unsigned switchValue =  readSwitchValue;
   sprintf(postString,"{\"sensorValue\": %u, \"switchValue\": %u}",sensorValue,switchValue);
   Particle.variable("inputSensors", postString, STRING);
   if(digitalRead(switchPin) == LOW)//if door sensor connected
    {
      digitalWrite(ledPin, LOW);
      if(data>=1800) //proximity sensor object detection
      {
          Serial.println("WARNING!");
      }
      else if(data>=1200 && data<1800)
      {
          Serial.println("Close");
      }
      else
      {
          Serial.println("No Problem");
      }
    }
   else //door sensor not connected
    {
     digitalWrite(ledPin, HIGH);
     Serial.println("ALERT!!!!!!!");
    }
   delay(200);  //just to slow down the output, that is, remove reading of passing object
}
