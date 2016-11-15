// This #include statement was automatically added by the Particle IDE.
#include "neopixel/neopixel.h"

/*
 * This is a minimal example, see extra-examples.cpp for a version
 * with more explantory documentation, example routines, how to
 * hook up your pixels and all of the pixel types that are supported.
 *
 */


SYSTEM_MODE(AUTOMATIC);

// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_PIN D2
#define PIXEL_COUNT 24
#define PIXEL_TYPE WS2812B

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

// Prototypes for local build, ok to leave in for Build IDE
void rainbow(uint8_t wait);
uint32_t Wheel(byte WheelPos);


int led2 = D7;


void setup()
{

   Serial.begin(9600);
   pinMode(led2, OUTPUT);
   Particle.function("led",ledToggle);
   digitalWrite(led2, LOW);

   strip.begin();
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

void loop()
{

}


int ledToggle(String command) {

    Serial.print("Got command: ");
    Serial.println(command);

    uint16_t i, j;
    uint32_t red=strip.Color(255,0,0); //red
    uint32_t green=strip.Color(0, 255, 0); //green
    uint32_t blue=strip.Color(0,0,255); //blue
    uint32_t noColor=strip.Color(0,0,0); //noColor

    if (command=="red") {
        digitalWrite(led2,HIGH);//check photon connection
        for(i=0; i<24; i++) // 24 is the number of pixels; we use this instead of strip.numPixels
        {
            strip.setPixelColor(i, red);
            strip.show();
        }
        Serial.print("Game");
        return 1;
    }
     else if (command=="green") {
        digitalWrite(led2,HIGH);//check photon connection
        for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, green);
            strip.show();
        }
        Serial.print("People");
        return 1;
    }
    else if (command=="blue") {
        digitalWrite(led2,HIGH);//check photon connection
        for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, blue);
            strip.show();
        }
        Serial.print("No Data");
        return 1;
    }
    else if (command=="off") {
        digitalWrite(led2,LOW);
        for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, noColor);
            strip.show();
        }
        Serial.print("Switching off LED");
        return 0;
    }
    else {
        return -1;
    }

}
