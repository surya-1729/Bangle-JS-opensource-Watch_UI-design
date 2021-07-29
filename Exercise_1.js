// function to draw time and date in customized font:
function draw() {
  var d = new Date(), h = d.getHours(), m = d.getMinutes(); // get date,time from Date class
  var dateStr = require("locale").date(d);                  // date from local
  h = ("0"+h).substr(-2); m = ("0"+m).substr(-2);           // extract last 2 characters after '0' append using substr() method
  g.clear();
  g.setColor(1, 1, 1);
  g.fillCircle(115 ,115, 82);
  g.setColor(0, 0, 1);
  g.setFont("Vector" ,34);                                  // set font for Time display
  g.drawString(h+":"+m, 71, 100);
  g.setFont("Vector" ,16);                                  // set font for Date display
  g.drawString(dateStr, 65, 74);
  g.setFont("Vector" ,10);                                  // set font for Name display
  g.setColor(1, 0, 1);
  g.drawString("Surya Vara Prasad Alla" , 53, 140);         // customized watch : drawn my name on the watch
  g.setColor(1, 1, 0);
  g.drawCircle(115 ,115, 102);                              // yellow color circle drawn to stylize watch display
  g.drawRect(60, 155, 170, 170);
  g.setColor(1, 0, 0);
  g.fillRect(60, 155, 170, 170);                            // representation of 10000 steps goal in rectagular pie chart
  s++;                                                      // data actually to be drawn from gyroscope sensor but simulated using a timer
  if (s > 10000) {
    s = s - 10000;                                          // if 10000 steps goal is reached, then I chose to write code for steps count refresh
  }
  x = s * 0.011;                                            // calculate fraction based on (170-60)/10,000
  g.setColor(0, 1, 0);
  g.fillRect(60, 155, x+60, 170);                           // representation of steps goal reached in rectagular pie chart
  g.setColor(0, 0, 1);
  g.drawString(s + " --> 10000", 77, 158);                  // number of steps reached and a small inspiration arrow '->'
}


g.reset();                                                  // reset graphic display
var s = 0;                                                  // steps count variable declare and initialize
var secondInterval = setInterval(draw, 1000);               // refresh screen every second using timer interval

// stop updates for draw() when lcd display off:
Bangle.on('lcdpower',on=> {
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw();
  }
});

