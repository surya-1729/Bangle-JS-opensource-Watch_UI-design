// function to draw steps count using drawSlice and trignometric sin and cos using sector principle
var n=0;
function drawSlice(from,to) {
  var a, res = 24;
  var x = 115, y = 115, r1 = 82, r2 = 102;                  // (x,y) center of concurrent circles of radius 82 and 102
  var poly = [];                                            // initiate variable size array of name 'poly'
  for (var i=from*res;i<to*res;i++) {
    a = i*Math.PI*2/res;
    poly.push(x+r2*Math.sin(a), y+r2*Math.cos(a));          // push elements to poly array
    poly.unshift(x+r1*Math.sin(a), y+r1*Math.cos(a));       // One or more items to add to the beginning of the array
  }
  a = to*Math.PI*2;
  poly.push(x+r2*Math.sin(a), y+r2*Math.cos(a));            // push elements to poly array
  poly.unshift(x+r1*Math.sin(a), y+r1*Math.cos(a));         // One or more items to add to the beginning of the array
  g.fillPoly(poly);                                         // fill poly method
}

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
  /// g.drawRect(60, 155, 170, 170);
  g.setColor(1, 0, 0);
  /// g.fillRect(60, 155, 170, 170);                        // representation of 10000 steps goal in rectagular pie chart
  s += 100;                                                 // data actually to be drawn from gyroscope sensor but simulated using a timer
  if (s > 10000) {
    s = 1;                                                  // if 10000 steps goal is reached, then I chose to write code for steps count refresh
  }
  /// x = s * 0.011;                                        // calculate fraction based on (170-60)/10,000
  /// g. setColor(0, 1, 0);

  n = s/10000;                                              // 1/10000 th Part of Progress Bar
  n += 0.0001;                                              // increment 1/10000 th Part of Progress Bar
  g.setColor(0,1,0);
  drawSlice(0,n);                                           // draw slice 0 to n
  g.setColor(0,0,0);
  drawSlice(n,1);                                           // draw slice n to 1
                                                            // representation of steps goal reached in rectagular pie chart
  g.setColor(0, 0, 1);
  g.drawString(s + " --> 10000", 77, 158);                  // number of steps reached and a small inspiration arrow '->'
  g.drawString(name , 99, 180);
}

// function to rename Bangle.js screen
function rename() {
  var res = name.split("");                                 // convert string to an array
  let name1 = '';
  for (var i = 1; i <= 4; i++) {
    setWatch((BTNcount2) => {BTNcount2 += 1;}, BTN2, {repeat:true});
    name1[i] = ((res[i-1].toString(16)+ BTNcount2) % 16).toString(16);
    BTNcount2 = 0;
  }
  g.drawString(name1, 99, 180);
}

// function to draw screen2
function drawscreen2() {                                    // second screen with display of only name of bangle.
  g.clear();
  g.setColor(0, 0, 1);
  g.setFont("Vector" ,34);
  g.drawString(name , 99, 180);
  clearInterval(secondInterval);
}
g.reset();                                                  // reset graphic display
var s = 0;                                                  // steps count variable declare and initialize
var secondInterval = setInterval(draw, 1000);               // refresh screen every second using timer interval
let name = '012A';
var BTNcount1 = 0;
var BTNcount2 = 0;

// Bangle Swipe function
Bangle.on('swipe', function(direction) {                    // Whenever Swiped on display Screen => relevant action
    if (direction == 1) {                                   // if statement for right swipe
      drawscreen2();
    }else {                                                 // if statement for left swipe
      draw();
      secondInterval = setInterval(draw, 1000);
     }
});

// Bangle Touch function
Bangle.on('touch', function(button) {                       // Whenever Touched on display Screen => relevant action
    if (button == 2) {                                      // if statement for right touch
      drawscreen2();
    }else {                                                 // if statement for left touch
      draw();
      secondInterval = setInterval(draw, 1000);
    }
});

// set Button 1 for Right Swipe, Button 3 for Left Swipe, Button2 for rename using setWatch function.
setWatch(drawscreen2, BTN1, {repeat:true,edge:"falling"});
setWatch( function () {draw(); secondInterval = setInterval(draw, 1000);}, BTN2, {repeat:true,edge:"falling"});
setWatch(rename, BTN3, {repeat:true,edge:"falling"});

// stop updates for draw() when lcd display off:
Bangle.on('lcdpower',on=> {
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw();
  }
});

/*
earlier : steps count display on rectangular bar. Time display is perfectly alright.
experiment : while walking it is okay to see the progress and time. but while running, it is less visible to see steps progress and circular progress bar is better possible illustrative display.
later improvement : steps count display on circular progress bar. Time display is perfectly alright.
*/