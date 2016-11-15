// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_SSD1306/Adafruit_SSD1306.h"

// This #include statement was automatically added by the Particle IDE.
#include "neopixel/neopixel.h"

int sensorIn = A0; //input from analog proximity sensor.
int switchPin = D1;//input from door sensor
int ledPin = D7;//output from photon.
int data = 0;
int readSensorValue = 0;
int readSwitchValue = 0;
char postString[64];



/* Neopixel */

SYSTEM_MODE(AUTOMATIC);

// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_PIN D2
#define PIXEL_COUNT 24
#define PIXEL_TYPE WS2812B

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

// Prototypes for local build, ok to leave in for Build IDE
void rainbow(uint8_t wait);
uint32_t Wheel(byte WheelPos);


/* OLED */

#define OLED_DC     D3
#define OLED_CS     D4
#define OLED_RESET  D5
Adafruit_SSD1306 display(OLED_DC, OLED_RESET, OLED_CS);
int x;

void setup() {
   Serial.begin(9600);//begin commmand - serial monitor
   pinMode(sensorIn, INPUT);//proximity sensor
   pinMode(switchPin,  INPUT_PULLUP);//door sensor
   pinMode(ledPin, OUTPUT);//led output

  display.begin(SSD1306_SWITCHCAPVCC);//OLED
  display.setTextSize(3);       // text size
  display.setTextColor(WHITE); // text color
  x = display.width();

   strip.begin(); //Neopixel
   strip.setBrightness(2);
   strip.show(); // Initialize all pixels to 'off'
   uint16_t i;
   uint32_t noColor=strip.Color(0,0,0); //noColor
   for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, noColor);
            strip.show();
        }
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



    uint16_t i, j;
    uint32_t red=strip.Color(255,0,0); //red
    uint32_t green=strip.Color(0, 255, 0); //green
    uint32_t blue=strip.Color(0,0,255); //blue
    uint32_t noColor=strip.Color(0,0,0); //noColor

   if(digitalRead(switchPin) == LOW)//if door sensor connected
    {
      digitalWrite(ledPin, LOW);
      if(data>=1800) //proximity sensor object detection
      {
          Serial.println("WARNING!");
           for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, blue);
            strip.show();
        }
      }
      else if(data>=1200 && data<1800)
      {
          Serial.println("Close");
           for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, blue);
            strip.show();
        }
      }
      else
      {
        Serial.println("No Problem");
        for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, green);
            strip.show();
        }
      }
    display.clearDisplay();
    display.setCursor(x, -14);
    String doorCond = "   Closed";
    display.print(" Box " + doorCond);
    display.display();
    }
   else //door sensor not connected
    {
     digitalWrite(ledPin, HIGH);
     Serial.println("ALERT!!!!!!!");
        for(i=0; i<24; i++) // 24 is the number of pixels; we use this instead of strip.numPixels
        {
            strip.setPixelColor(i, red);
            strip.show();
        }
    display.clearDisplay();
    display.setCursor(x, -14);
    String doorCond = "   Open";
    display.print(" Box " + doorCond);
    display.display();
    }
   delay(200);  //just to slow down the output, that is, remove reading of passing object
}
