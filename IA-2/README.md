# HCIN720 Assignment 2

## IA 2

### Part 1

In the first part of the assignment, the Photon reads data from two sensors (magnetic door sensor and proximity sensor) and visualizes it on a web application. 

#### Working

The sensors on the photon detect if the box has been opened and also if there is a object near the box. This informaton is visualized on the web application. The web application uses **paper.js** to create a virtual box, and visualize data from the proximity sensor and magnetic door sensor. 'Particle.Variable' is used to send data to the web application from the Photon.

* A0 = Proximity Sensor Input
* D2 = Door Sensor Input

For assignment-1 I had used D3.js to dyanmically change color and size of a circle for abstract visualization. I had also used chart.js for the other visualization. The visualization was for Pubnub's Twitter feed.

#### Input Circuit

![inputcircuit](https://cloud.githubusercontent.com/assets/14539609/19794211/7a851432-9c9e-11e6-9255-5c0958b4e333.jpg)

<br />

#### Input Visualization

![inputcircuit](https://cloud.githubusercontent.com/assets/14539609/19794209/7a68fae0-9c9e-11e6-9696-8cddd9d5d7ab.gif)

### Part 2

In the second part of the assignment, the Photon gets data from Pubnub's Twitter feed aand visualizes it on a neopixel. A simple web application is used to start and stop the visualization. 'Particle.Function' is used to send data from the web application (Twitter feed) to the Photon.

Sensor visualization link: http://rawgit.com/chandan-mahapatra/hcin720/master/IA-2/ia2input.html

#### Working
If the word **game** is used (in 50 tweets/sec), the color **red** is displayed on the neopixel.
Similarly, if the word **people** is used, the color **green** is displayed on the neopixel. Finally, if these two words are not present (in 50 tweets/sec), the color **blue** is displayed on the neopixel.

* D2 = Neopixel output

#### Output Circuit
![outputcircuit](https://cloud.githubusercontent.com/assets/14539609/19794210/7a82acce-9c9e-11e6-8970-3ed4e75bfaf2.jpg)

<br />

#### Output Visualization

![outputcircuit](https://cloud.githubusercontent.com/assets/14539609/19794212/7a857c42-9c9e-11e6-962d-e8e2fd3966d9.gif)


Libraries and other resources:

* Pubnub
* Github
* Stackoverflow
* jquery
* Bootstrap
* Instructables
* Particle.io
* Particle Community - link: https://community.particle.io/t/tutorial-spark-variable-and-function-on-one-web-page

Nexopixel visualization link: http://rawgit.com/chandan-mahapatra/hcin720/master/IA-2/ia2output.html
