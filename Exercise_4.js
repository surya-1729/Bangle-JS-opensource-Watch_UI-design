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
    setTimeout(1000);                                       // delay for 1 second to capture button press count
    }
    name1[i] = ((res[i-1].toString(16)+ BTNcount2) % 16).toString(16);
    BTNcount2 = 0;
  g.drawString(name1, 99, 180);
}

// function to change time in third screen
function time() {
  g.clear();
  var d = new Date(), h = d.getHours(), m = d.getMinutes();                     // get date,time from Date class
    while ((h+BTNcount1 <= 24 ) || (m+BTNcount2 <= 60) || bool(setTimeout(1000)) == 'false' ) {
    setWatch((BTNcount2) => {BTNcount2 += 1;}, BTN2, {repeat:true});
    setTimeout(1000);                                                           // delay for 1 second to capture button press count
    setWatch((BTNcount1) => {BTNcount1 += 1;}, BTN1, {repeat:true});
    setTimeout(1000);
  }
  g.setColor(0, 0, 1);
  g.setFont("Vector" ,34);
  var dateStr = require("locale").date(d);                                      // date from local
  h = ("0"+h+BTNcount1).substr(-2); m = ("0"+m+BTNcount2).substr(-2);           // extract last 2 characters after '0' append using substr() method
  g.drawString(h+":"+m , 71, 100);

}

// function to draw screen2
function drawscreen2() {                                    // second screen with display of only name of bangle.
  g.clear();
  g.setColor(0, 0, 1);
  g.setFont("Vector" ,34);
  g.drawString(name , 99, 180);
}


// function to draw screen3
function drawscreen3() {                                    // third screen to change your watch's time display, hours and minutes.
  g.clear();
  g.setColor(0, 0, 1);
  g.setFont("Vector" ,34);
  var d = new Date(), h = d.getHours(), m = d.getMinutes(); // get date,time from Date class
  var dateStr = require("locale").date(d);                  // date from local
  h = ("0"+h).substr(-2); m = ("0"+m).substr(-2);           // extract last 2 characters after '0' append using substr() method
  g.drawString(h+":"+m , 71, 100);
}


g.reset();                                                  // reset graphic display
var s = 0;                                                  // steps count variable declare and initialize
var secondInterval = setInterval(draw, 1000);               // refresh screen every second using timer interval
let name = '012A';                                          // a string to store the name of watch
var BTNcount1 = 0;                                          // BTN 1 press count
var BTNcount2 = 0;                                          // BTN 2 press count
var x = 0;                                                  // an integer variable to count the screen number

// Bangle Swipe function
Bangle.on('swipe', function(direction) {                                       // Whenever Swiped on display Screen => relevant action
    if ((direction == 1 && x == 0) || (direction == -1 && x == 2)) {           // if statement for right swipe and left swipe accordingly
      x = 1;
      drawscreen2();
      secondInterval = setInterval(drawscreen2, 1000);
    }
    else if ((direction == 1 && x == 1) || (direction == -1 && x == 0)){       // if statement for right swipe and left swipe accordingly
      x = 2;
      drawscreen3();
      secondInterval = setInterval(drawscreen3, 1000);
    } else{                                                                    // if statement for right swipe and left swipe accordingly
      x = 0;
      draw();
      secondInterval = setInterval(draw, 1000);
    }
});

// Bangle Touch function
Bangle.on('touch', function(button) {                                          // Whenever Touched on display Screen => relevant action
    if ((button == 2 && x == 0) || (button == 1 && x == 2)) {                  // if statement for right touch and left touch accordingly
      x = 1;
      drawscreen2();
      secondInterval = setInterval(drawscreen2, 1000);
    }
    else if ((button == 2 && x == 1) || (button == 1 && x == 0)){              // if statement for right touch and left touch accordingly
      x = 2;
      drawscreen3();
      secondInterval = setInterval(drawscreen3, 1000);
    } else{                                                                    // if statement for right touch and left touch accordingly
      x = 0;
      draw();
      secondInterval = setInterval(draw, 1000);
    }
});

// set Button 1 for draw, Button 3 for drawscreen3, Button2 for drawscreen2 using setWatch function.
// long press Button1 for  rename & long press Button2 for time change
setWatch( function (e) {
  var len = e.time-e.lastTime;
  if (len > 0.3){
    rename(); secondInterval = setInterval(rename, 1000);
  } else {
    draw(); secondInterval = setInterval(draw, 1000);
  }
  }, BTN1, {repeat:true,edge:"falling",debounce:50});

setWatch( function (e) {
  var len = e.time-e.lastTime;
  if (len > 0.3){
    time(); secondInterval = setInterval(time, 1000);
  } else {
    drawscreen2(); secondInterval = setInterval(drawscreen2, 1000);
  }
  }, BTN2, {repeat:true,edge:"falling",debounce:50});

setWatch( function () {drawscreen3(); secondInterval = setInterval(drawscreen3, 1000);}, BTN3, {repeat:true,edge:"falling",debounce:50});


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