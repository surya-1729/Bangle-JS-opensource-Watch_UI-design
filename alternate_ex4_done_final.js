/*
*	Kevin Trieu - 1625552 
*	UbiComp - SoSe 21
* Ex. 4
*/

require("Font7x11Numeric7Seg").add(Graphics);
require("Font6x8").add(Graphics);
require("Font8x12").add(Graphics);

var secondInterval;

var stepCounter = 7952, stepGoal = 10000;
var centerX = g.getWidth()/2, centerY = g.getHeight()/2;
var stepAng = 0, stepBool = true, day = false, typeBool = true, nameScreenNumbers = true, showAlert = false, customTimeBool = false;
var firstTut = true; secondTut = true; thirdTut = true; // Please set to false, to disable tutorial
var displayState = 2, typingMarker = 0, pos = 0, posNum = 0, posTime = 0;
var watchName = "A0B1";
var numStr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var alphStr = ["A", "B", "C", "D", "E", "F"];
var alphStr2 = ["A", "B", "C", "D", "", "", "", "E"];
var buttonPosX = [32, 78, 124, 170, 216, 32, 78, 124, 170, 216, 78, 124, 170, 216];
var buttonPosY = [124, 167, 210];
var buttonPosTime = [75, 50, 103, 73, 138, 50, 166, 73, 75, 118, 103, 138, 138, 118, 166, 138];
var enterNums = [0, 1, 2, 3, "backspace", 4, 5, 6, 7, "enter", 8, 9, "ABC"];
var enterAlph = ["A", "B", "C", "D", "backspace", "", "E", "F", "123", "enter"];
var date = new Date(), h, m, currentH, currentM, newH = -2, newM = -2, newTime = 0, hourDiff = 0, minDiff = 0;

var stepImg1 = E.toArrayBuffer(atob("gICBAf////////////////////////////////////////////////////////8A///////////////////8AB//////////////////8AAP/////////////////+AAA//////////////////AAAH/////////////////gAAA/////////////////wAAAP////////////////4AAAB////////////////8AAAAf////////////////AAAAD////////////////gAAAA////////////////4AAAAH///////////////8AAAAB////////////////AAAAAf///////////////gAAAAH///////////////4AAAAA///////////////8AAAAAP///////////////AAAAAD///////////////wAAAAA///////////////8AAAAAP//////////////+AAAAAD///////////////gAAAAA///////////////4AAAAAP//////////////+AAAAAD///////////////AAAAAAf//////////////wAAAAAH//////////////8AAAAAB///////////////AAAAAAf//////////////wAAAAAH////////AP////4AAAAAB///////+AAf///+AAAAAAf//////+AAD////gAAAAAH///////AAAP///4AAAAAD///////gAAB///+AAAAAA///////wAAAP///gAAAAAP//////8AAAD///4AAAAAD//////+AAAAf//+AAAAAA///////gAAAD///gAAAAAP//////wAAAA///4AAAAAH//////8AAAAH//+AAAAAB//////+AAAAA///gAAAAAf//////gAAAAP//4AAAAAH//////4AAAAD//+AAAAAB//////+AAAAAf//gAAAAA///////AAAAAH//4AAAAAP//////wAAAAA//+AAAAAD//////8AAAAAP//wAAAAA///////AAAAAD//8AAAAAf//////wAAAAA///AAAAAH//////8AAAAAH//wAAAAB///////AAAAAB//8AAAAA///////wAAAAAf//AAAAAP//////8AAAAAH//4AAAAD//////+AAAAAA//+AAAAB///////gAAAAAP//gAAAAf//////4AAAAAD//4AAAAH//////+AAAAAA///AAAAD///////gAAAAAP//wAAAA///////4AAAAAB//8AAAAf//////+AAAAAAf//gAAAH///////gAAAAAH///AAAD///////8AAAAAB////AAA////////AAAAAAf////gAf///////wAAAAAH/////gP///////8AAAAAB//9///n////////AAAAAAf/+D///////////wAAAAAH//gD//////////+AAAAAB//wAH//////////gAAAAAf/4AAP/////////4AAAAAH/+AAAP////////+AAAAAB//AAAAf////////gAAAAAf/wAAAH////////8AAAAAH/8AAAB/////////AAAAAB/+AAAAf////////wAAAAA//gAAAP////////8AAAAAP/4AAAD/////////gAAAAD/8AAAA/////////4AAAAA//AAAAP////////+AAAAAP/wAAAD/////////wAAAAD/8AAAB/////////8AAAAA//AAAAf/////////AAAAAf/wAAAH/////////4AAAAH/8AAAD/////////+AAAAB//AAAA//////////gAAAAf/wAAAP/////////8AAAAP/8AAAH//////////AAAAD//AAAB//////////4AAAA//4AAA//////////+AAAA//+AAAP//////////wAAB///wAAH//////////8AAH///8AAD///////////gAf////gAB///////////8B/////8AA////////////n//+///gA///////////////4H//+A///////////////wA///////////////////gAP/////////////////+AAB/////////////////8AAAf////////////////4AAAD////////////////+AAAA/////////////////gAAAP////////////////4AAAB/////////////////AAAAf////////////////wAAAD////////////////8AAAA/////////////////AAAAP////////////////wAAAD////////////////+AAAA/////////////////gAAAP////////////////4AAAD/////////////////AAAA/////////////////wAAAP////////////////8AAAD/////////////////gAAA/////////////////4AAAP/////////////////AAAH/////////////////4AAB/////////////////+AAA//////////////////wAAP/////////////////+AAH//////////////////wAD///////////////////AD///////////////////8D///////////////////////////////////////////////////////"));

var stepImg2 = E.toArrayBuffer(atob("gICBAf///////////////////////////////////////////////wD///////////////////gAP//////////////////wAA//////////////////wAAH/////////////////4AAA/////////////////8AAAH/////////////////AAAA/////////////////gAAAH////////////////4AAAA////////////////8AAAAP////////////////AAAAB////////////////gAAAAf///////////////4AAAAD///////////////+AAAAA////////////////gAAAAH///////////////wAAAAB///////////////8AAAAAP///////////////AAAAAD///////////////wAAAAA///////////////8AAAAAP///////////////AAAAAB///////////////wAAAAAf//////////////8AAAAAH///////////////AAAAAB///////////////gAAAAAP//////////////4AAAAAD//////////////+AAAAAA///////////////gAAAAAP//////////////4AAAAAD//////////////+AAAAAAf////wD////////gAAAAAH////gAH///////4AAAAAB////wAAf///////AAAAAAf///wAAD///////wAAAAAH///4AAAf//////8AAAAAB///8AAAD///////AAAAAAf///AAAA///////wAAAAAH///gAAAH//////8AAAAAB///wAAAB///////gAAAAAf//8AAAAP//////4AAAAAH//+AAAAD//////+AAAAAB///AAAAAf//////gAAAAAf//wAAAAH//////4AAAAAH//8AAAAB///////AAAAAB//+AAAAAf//////wAAAAAf//gAAAAD//////8AAAAAH//wAAAAA///////AAAAAD//8AAAAAP//////4AAAAA///AAAAAD//////+AAAAAP//wAAAAA///////gAAAAD//4AAAAAP//////8AAAAA//+AAAAAD///////AAAAAP//gAAAAA///////wAAAAH//4AAAAAP//////+AAAAB//8AAAAAB///////gAAAAf//AAAAAAf//////4AAAAH//wAAAAAH///////AAAAD//8AAAAAB///////wAAAA///AAAAAAf//////+AAAAP//gAAAAAH///////gAAAH//4AAAAAB///////8AAAP//+AAAAAAf///////AAA////gAAAAAP///////4AH////4AAAAAD////////Af////+AAAAAA////////5///v//gAAAAAP///////////B//4AAAAAD//////////8Af/+AAAAAA//////////4AD//gAAAAAf/////////wAAf/4AAAAAH/////////AAAH/+AAAAAB////////+AAAA//gAAAAAf////////gAAAP/4AAAAAH////////4AAAD/+AAAAAD////////+AAAAf/gAAAAA/////////wAAAH/8AAAAAP////////8AAAB//AAAAAD/////////AAAAP/wAAAAB/////////wAAAD/8AAAAAf////////8AAAA//AAAAAH/////////gAAAP/wAAAAD/////////4AAAD/8AAAAA/////////+AAAA//gAAAAP/////////wAAAP/4AAAAH/////////8AAAD/+AAAAB//////////AAAA//gAAAAf/////////4AAAP/8AAAAP/////////+AAAD//AAAAD//////////wAAB//wAAAB//////////8AAAf//AAAAf//////////gAAP//+AAAP//////////8AAD///+AAD///////////gAB////+AB///////////8AA/////+A////////////wAf//3//+f////////////Af//4H///////////////////8AP///////////////////AAf//////////////////gAAf/////////////////4AAA/////////////////8AAAB/////////////////AAAAf////////////////wAAAH////////////////4AAAB////////////////+AAAA/////////////////AAAAP////////////////wAAAD////////////////8AAAA/////////////////AAAAP////////////////wAAAH////////////////8AAAB/////////////////AAAAf////////////////wAAAP////////////////8AAAD/////////////////AAAA/////////////////wAAAf////////////////8AAAH/////////////////gAAD/////////////////4AAB//////////////////AAAf/////////////////wAAP/////////////////+AAH//////////////////wAD///////////////////AD///////////////////8D//////////////////////////////////////////////////"));


//var backspace = E.toArrayBuffer(atob("EguBAAf/wgARAASBEUAoYAQUAoSBERAAQgAQf/w="));
var backspace_c = Graphics.createImage(`
      XXXXXXXXXXXXXX
     X             X
    X              X
   X               X
  X       X   X    X
 X         X X     X
X           X      X
 X         X X     X
  X       X   X    X
   X               X
    X              X
     X             X
      XXXXXXXXXXXXXX
`);

var enter_c = Graphics.createImage(`
            XX
            XX 
            XX
            XX 
     XX     XX
    XX      XX
   XXXXXXXXXXX
   XXXXXXXXXXX
    XX
     XX
`);

var unused = Graphics.createImage(`
     XX
    XX
   XXXXXXXXXXXXX
   XXXXXXXXXXXXX
    XX
     XX
`);

var arrow_c_u = Graphics.createImage(`
            XX
           XXXX
          XXXXXX
         XXXXXXXX
        XXXXXXXXXX
`);

var arrow_c_d = Graphics.createImage(`
        XXXXXXXXXX
         XXXXXXXX
          XXXXXX
           XXXX
            XX
`);

var arrow_cc_u = E.toArrayBuffer(atob("KBTBAdR0/////wD/////AP////8A/////wD////wAA////AAD///8AAP///wAA///wAAAP//AAAA//8AAAD//wAAAP/wAAAAD/AAAAAP8AAAAA/wAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAA"));

var arrow_cc_d = E.toArrayBuffer(atob("KBTBAdR0//8AAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAP8AAAAA/wAAAAD/AAAAAP/wAAAP//AAAA//8AAAD//wAAAP//8AAP///wAA////AAD///8AAP////AP////8A/////wD/////AP//"));

var enter = E.toArrayBuffer(atob("BgiBAAQQSUf0CA=="));


// Step counting function
Bangle.on('step', function(up) {
	stepCounter++;
});

// Calculate step progress
// Progess Code from: "http://forum.espruino.com/conversations/356799/"
// Ex. 2:	Size changed for better readability while walking
//				Number of steps taken, before changes:
//				Sitting: 1117 ms ; Moving: 1920 ms
//				Number of steps taken, after changes:
//				Sitting 690 ms ; Moving: 1482 ms
function drawSlice(from,to) {
  var a, res = 24;
  var x = centerX, y = centerY+64, r1 = 28, r2 = 32;
  var poly = [];
  for (var i=from*res;i<to*res;i++) {
    a = i*Math.PI*2/res;
    poly.push(x+r2*Math.sin(a), y+r2*Math.cos(a));
    poly.unshift(x+r1*Math.sin(a), y+r1*Math.cos(a));
  }
  a = to*Math.PI*2;
  poly.push(x+r2*Math.sin(a), y+r2*Math.cos(a));
  poly.unshift(x+r1*Math.sin(a), y+r1*Math.cos(a));
  g.fillPoly(poly);
}

function getDateStr(num) {
	switch (num) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
	}
}

function getMonthStr(num) {
	switch (num) {
		case 0:
			return "Jan.";
		case 1:
			return "Feb.";
		case 2:
			return "Mrz.";
		case 3:
			return "Apr.";
		case 4:
			return "Mai";
		case 5:
			return "Jun.";
		case 6:
			return "Jul.";
		case 7:
			return "Aug.";
		case 8:
			return "Sep.";
		case 9:
			return "Okt.";
		case 10:
			return "Nov.";
		case 11:
			return "Dez.";
	}
}

function getCenterTextX(text) {
	return ((g.getWidth() - g.stringWidth(text))/2);
}

function drawWatchScreen() {
	
	// Ex. 2:	Redefined date format to: "11. Juni 2021" to read it faster
	E.setTimeZone(2);
	h = date.getHours();
	m = date.getMinutes();
	var dateStr = (date.getDate() + "." + getMonthStr(date.getMonth()) + " " + date.getFullYear());
	h = ("0"+h).substr(-2);
	m = ("0"+m).substr(-2);
	
	g.clear(1);
	
	// Draw background
	g.setColor('#000000');
	g.fillRect(0, 0, 240, 240);
	if (day == true) {
		g.setColor('#C23C67'); // Blue'ish
	} else {
		g.setColor('#457F8D'); // Pink'ish
	}
	g.drawCircle(centerX, centerY+370, 350);
	g.drawCircle(centerX, centerY+371, 350);
	g.drawCircle(centerX, centerY+372, 350);
	
	// Ex. 2:	Added time background, to highlight it for improved readability
	// 				During the day the front color will be blue.
	//				When it's past 6pm, the front color will be pink
	
	if (newTime != 0 ? newTime.getHours() < 19 : h < 19) {	// Ex. 2: Change time here, to see effect of day/night-time
		g.setColor('#C23C67');	// Pink'ish
		g.fillRect(centerX-88, centerY-78, centerX+35, centerY-20);
		g.setColor('#457F8D');	// Blue'ish
		g.fillRect(centerX-82, centerY-84, centerX+76, centerY-26);
		day = true;
	} else { 
		g.setColor('#457F8D');	// Blue'ish
		g.fillRect(centerX-42, centerY-90, centerX+82, centerY-34);
		g.setColor('#C23C67');	// Pink'ish
		g.fillRect(centerX-82, centerY-84, centerX+76, centerY-26);
		day = false;
	} 
	
	// Time
	// Ex. 2:	Improved font for better readability
	//				Time, before changes:
	//				Sitting: 1103 ms ; Moving: 1373 ms
	//				Time, after changes:
	//				Sitting 302 ms ; Moving: 545 ms
	
	// Hours, Minutes
	g.setFont("Vector", 55);
	g.setColor('#ffffff');
	var hoursMinutes;
	if (newTime != 0) {
		//hoursMinutes = (("0"+newH.toString()).substr(-2) + ":" + ("0"+newM.toString()).substr(-2));
		getNewTime(hourDiff, minDiff);
		hoursMinutes = (("0" + newTime.getHours()).substr(-2) + ":" + ("0" + newTime.getMinutes()).substr(-2));
	} else {
		hoursMinutes = (h + ":" + m);
	}
	g.drawString(hoursMinutes, getCenterTextX(hoursMinutes), 40);
	
	// Date
	// Ex.2:	Change date font depending on day/night-time
	//				Date, before changes:
	//				Sitting: 2350 ms ; Moving: 4302 ms
	//				Date, after changes:
	//				Sitting 2075 ms ; Moving: 2750 ms
	
	g.setFont("6x8", 2);
	if (day == true) {
		g.setColor('#C23C67'); // Pink'ish
		g.drawString(dateStr, getCenterTextX(dateStr), centerY-14);
	} else {
		g.setColor('#457F8D'); // Blue'ish
		g.drawString(dateStr, getCenterTextX(dateStr), centerY-18);
	}
	
	g.setColor('#C23C67'); // Pink'ish
	g.drawString(getDateStr(date.getDay()), centerX-35, 12);
	
	// Draw step progress
	g.setColor('#F8FCF8');
	g.fillCircle(centerX, centerY+64, 30); // dad
	n = stepCounter / stepGoal;
	if (day == true) {
		g.setColor('#C23C67'); // Pink'ish
	} else {
		g.setColor('#457F8D'); // Blue'ish
	}
	if (n > 1) {n = 1;}
  drawSlice(0, n);
	
	g.setColor('#000000');
	g.setFont("Vector", 17);
	// above 10000 -> 20, under 10000 -> 16
	if (stepCounter < 10000) {
		stepCounterStr = ("000"+stepCounter.toString()).substr(-4);
		g.drawString(stepCounterStr, getCenterTextX(stepCounterStr), centerY+70);
	} else {
		g.drawString(stepCounterStr, getCenterTextX(stepCounterStr), centerY+70);
	}
	
	
	// Draw step animation
	if (stepBool) {
		g.drawImage(stepImg1, 106, 160, {scale: 0.2});
		stepBool = false;
	} else {
		g.drawImage(stepImg2, 106, 160, {scale: 0.2});
		stepBool = true;
	}
	
	// Show watch name
	g.setFont("6x8", 2);
	if (day == true) {
		g.setColor('#457F8D'); // Blue'ish
	} else {
		g.setColor('#C23C67'); // Pink'ish
	}
	g.drawString(watchName, getCenterTextX(watchName)+2, 220);
	
	if (firstTut) { showTut1(); }
	
}

function drawNameScreen() {

	g.clear(1);

	// Custon typing marker position
	if (watchName.length == 4) { typingMarker = g.stringWidth(watchName)+126; }
	if (watchName.length == 3) { typingMarker = g.stringWidth(watchName)+124; }
	if (watchName.length == 2) { typingMarker = g.stringWidth(watchName)+122; }
	if (watchName.length == 1) { typingMarker = g.stringWidth(watchName)+120; }
	if (watchName.length == 0) { typingMarker = 118; }
	
	// Draw title text
	g.setFont("6x8", 2);
	var watchNameStr = "Change Watch Name";
	g.drawString(watchNameStr, getCenterTextX(watchNameStr), centerY-115);
	
	
	// Draw alert
	if (showAlert) {
		g.setFont("8x12", 1);
		var alertStr = "(Watch name has to be at\n least 4 characters long)";
		g.drawString(alertStr, getCenterTextX(alertStr), centerY-90);
		g.setFont("6x8", 2);
	}
	
	// Draw line + current watch name
	g.setColor('#858585');
	g.drawLine(centerX-35, centerY-30, centerX+35, centerY-30);
	
	g.setColor('#ffffff');
	g.drawString(watchName, getCenterTextX(watchName), centerY-50);
	
	// Draw typing marker
	if (typeBool) {
		g.setColor('#ffffff');
		typeBool = false;
	} else {
		g.setColor('#000000');
		typeBool = true;
	}
	g.drawLine(typingMarker, centerY-35, typingMarker, centerY-50);
	
	g.setColor('#ffffff');
	
	var numDist = 32;
	
	if (nameScreenNumbers == true) {		// Check to show numbers or alphabet
		// Draw buttons
		for (var i = 0; i < 10; i++) {
			if (i < 4) {
				drawButton(numDist, 124, numStr[i], '#ffffff');
			} else if (i > 3 && i < 8) {
				if (i == 4) {
					numDist = 32;
				}
				drawButton(numDist, 167, numStr[i], '#ffffff');
			} else {
				if (i == 8) {
					numDist = 78;
				}
				drawButton(numDist, 210, numStr[i], '#ffffff');
			}
			numDist += 46;
		}
		// Draw additional buttons
		drawButton(32, 210, "", '#b3b3b3');	// Empty button
		drawButton(216, 210, "", '#b3b3b3');	// Empty button
		drawButton(170, 210, "ABC", '#ffffff');

		drawButton(216, 124, "", '#cf8297');
		g.drawImage(backspace_c, 200, 114);
		drawButton(216, 167, "", '#cf8297');
		g.drawImage(enter_c, 202, 158);


		// Clear current button
		switch (pos) {
		case 0: case 1: case 2: case 3:
				redrawButton(124, false);
				break;
			case 4:		// Backspace
				redrawIcon(124, backspace_c, '#729ba3', 0, -2);
				break;
			case 5: case 6: case 7: case 8:
				redrawButton(167, false);
				break;
			case 9:		// Enter
				redrawIcon(167, enter_c, '#729ba3', 2, 0);
				break;
			case 10: case 11:
				redrawButton(210, false);
				break;
			case 12:	// ABC
				redrawText(210, "ABC", '#729ba3', 13, 6);
				break;
		}
	} else {	// Show alphabet
		// Draw buttons
		for (var k = 0; k < 6; k++) {
			if (k < 4) {
				drawButton(numDist, 124, alphStr[k], '#ffffff');
			} else if (k > 3 && k < 6) {
				if (k == 4) {
					numDist = 78;
				}
				drawButton(numDist, 167, alphStr[k], '#ffffff');
			}
			numDist += 46;
		}
		
		// Draw additional buttons
		drawButton(32, 167, "", '#b3b3b3');	// Empty button
		drawButton(170, 167, "123", '#ffffff');

		drawButton(216, 124, "", '#cf8297');
		g.drawImage(backspace_c, 200, 114);
		drawButton(216, 167, "", '#cf8297');
		g.drawImage(enter_c, 202, 158);


		// Clear current button
		switch (pos) {
			case 0: case 1: case 2: case 3:
				redrawButton(124, true);
				break;
			case 4:		// Backspace
				redrawIcon(124, backspace_c, '#729ba3', 0, -2);
				break;
			case 6: case 7:
				redrawButton(167, true);
				break;
			case 8:		// 123
				redrawText(167, "123", '#729ba3', 13, 6);
				break;
			case 9:		// Enter
				redrawIcon(167, enter_c, '#729ba3', 2, 0);
				break;
		}
	}
	if (secondTut == true) {
		showTut2();
	}
}

function drawButton(x, y, str, color) {
	x -= 5;	// Correction
	g.setFontAlign(0, 0, 0); // Center font alignment
	g.setFont("8x12", 2);
	g.drawString(str,	x+2, y-3);

	var polyButton = [x-20, y-19, x-20, y-20, x-19, y-20, x-19, y-21, x-18, y-21, x-18, y-22, x-17, y-22, x-17, y-23,
										x+16, y-23,
										x+17, y-23, x+17, y-22, x+18, y-22, x+18, y-21, x+19, y-21, x+19, y-20, x+20, y-20,
										x+20, y+10,
										x+19, y+10, x+19, y+11, x+18, y+11, x+18, y+12, x+17, y+12, x+17, y+13,
										x-17, y+13, x-17, y+12, x-18, y+12, x-18, y+11, x-19, y+11, x-19, y+10, x-20, y+10,
										x-20, y-19];
	g.setColor(color);
	g.drawPoly(polyButton, x, y, false);
	g.setColor('#ffffff');
}

function drawButtonTimeText(x, y, str, color) {
	x -= 5;	// Correction
	g.setFontAlign(0, 0, 0); // Center font alignment
	g.setFont("8x12", 2);
	g.drawString(str,	x+2, y-3);

	var polyButton = [x-60, y-19, x-60, y-20, x-59, y-20, x-59, y-21, x-58, y-21, x-58, y-22, x-57, y-22, x-57, y-23,
										x+56, y-23,
										x+57, y-23, x+57, y-22, x+58, y-22, x+58, y-21, x+59, y-21, x+59, y-20, x+60, y-20,
										x+60, y+10,
										x+59, y+10, x+59, y+11, x+58, y+11, x+58, y+12, x+57, y+12, x+57, y+13,
										x-57, y+13, x-57, y+12, x-58, y+12, x-58, y+11, x-59, y+11, x-59, y+10, x-60, y+10,
										x-60, y-19];
	g.setColor(color);
	g.drawPoly(polyButton, x, y, false);
	g.setColor('#ffffff');
}

function redrawButton(y, alph) {
	g.setBgColor('#000000');
	g.clearRect(buttonPosX[pos]-20, y-20, buttonPosX[pos]+10, y+10);
	g.setColor('#729ba3');
	if (!alph) {
		g.drawString(posNum,	buttonPosX[pos]-3, y-4);
	} else {
		g.drawString(alphStr[posNum],	buttonPosX[pos]-3, y-4);
	}
}

function redrawIcon(y, img, color, offsetX, offsetY) {
	g.setBgColor('#000000');
	g.clearRect(buttonPosX[pos]-20, y-20, buttonPosX[pos]+10, y+10);
	g.setColor(color);
	g.drawImage(img, buttonPosX[pos]-16+offsetX, y-10+offsetY);
}

function redrawText(y, text, color, offsetX, offsetY) {
	g.setBgColor('#000000');
	g.clearRect(buttonPosX[pos]-22, y-20, buttonPosX[pos]+12, y+10);
	g.setColor(color);
	g.drawString(text, buttonPosX[pos]-16+offsetX, y-10+offsetY);
}

function executeAction(code, alph) {
	if (!alph) {
		switch(code) {
		case ("backspace"):
			if (watchName.length > 0) {
				watchName = watchName.substr(0, watchName.length-1);
				drawNameScreen();
			}
			break;
			
		case (0): case (1): case (2): case (3): case (4): case (5): case (6): case (7): case (8): case (9):
			if (watchName.length < 4) {
				watchName += posNum.toString();
				drawNameScreen();
			}
			break;

		case ("ABC"):
			nameScreenNumbers = false;
			pos = 0; posNum = 0;
			drawNameScreen();
			break;

		case ("enter"):
			if (watchName.length == 4) {
				pos = 0; posNum = 0;
				displayState = 2;
				drawWatchScreen();
			}
			break;
		}
	} else {
		switch(code) {
		case ("backspace"):
			if (watchName.length > 0) {
				watchName = watchName.substr(0, watchName.length-1);
				drawNameScreen();
			}
			break;

		case ("A"): case ("B"): case ("C"): case ("D"): case ("E"): case ("F"):
			if (watchName.length < 4) {
				watchName += enterAlph[pos];
				drawNameScreen();
			}
			break;

		case ("123"):
			nameScreenNumbers = true;
			pos = 0; posNum = 0;
			drawNameScreen();
			break;

		case ("enter"):
			if (watchName.length == 4) {
				pos = 0; posNum = 0;
				displayState = 2;
				drawWatchScreen();
			}
			drawNameScreen();
			break;
		}
	}
}

function showTut1 () {
	// Rect
	g.setColor('#9c9c9c');
	g.fillRect(125, 5, 235, 235);
	
	// Text + Arrow
	g.setColor('#ffffff');
	g.setFont("6x8", 1);
	g.drawString("Next Screen", 135, 178);
	g.setFont("6x8", 2);
	g.drawString("->", 210, 173);
	
	g.setFont("6x8", 1);
	g.drawString("Prev. Screen", 133, 33);
	g.setFont("6x8", 2);
	g.drawString("->", 210, 28);
	
	g.setColor('#9DCFCF');
	g.fillRect(10, 100, 230, 140);
	g.setColor('#ffffff');
	g.setFont("6x8", 1);
	var tut1Str = "Tap to hide tutorial";
	g.drawString(tut1Str, getCenterTextX(tut1Str), 115);
}

function showTut2 () {
	g.setColor('#c5c791');
	g.fillRect(5, 5, 115, 235); // Left rect
	g.fillRect(125, 5, 235, 235); // Right rect
	g.setColor('#000000');
	g.setFont("6x8", 1);
	g.drawString("Prev.\ncharacter", 65, 45);
	g.drawString("Next\ncharacter", 185, 175);
	
	// Rect
	g.setColor('#707070');
	g.fillRect(130, 90, 235, 125);
	
	// Text + Arrow
	g.setColor('#ffffff');
	g.setFont("6x8", 1);
	g.drawString("Enter", 168, 108);
	g.setFont("6x8", 2);
	g.drawString("->", 210, 107);
}

function showTut3 () {
	g.setColor('#c5c791');
	g.fillRect(5, 5, 115, 235); // Left rect
	g.fillRect(125, 5, 235, 235); // Right rect
	g.setColor('#000000');
	g.setFont("6x8", 1);
	g.drawString("Prev.\nbutton", 65, 45);
	g.drawString("Next\nbutton", 185, 175);
	
	// Rect
	g.setColor('#707070');
	g.fillRect(130, 90, 235, 125);
	
	// Text + Arrow
	g.setColor('#ffffff');
	g.setFont("6x8", 1);
	g.drawString("Press\nbutton", 168, 104);
	g.setFont("6x8", 2);
	g.drawString("->", 210, 107);
}

// Ex. 4
function drawTimeScreen() {
	displayState = 1;
	g.clear(1);
	
	// Draw title text
	g.setFont("6x8", 2);
	//g.setColor('#ffffff');
	var watchNameStr = "Change Watch Time";
	g.drawString(watchNameStr, getCenterTextX(watchNameStr), centerY-115);
	
	// Draw accept button
	var acceptStr = "Save Time";
	drawButtonTimeText(124, centerY+62, acceptStr, '#ffffff');
	
	//date = new Date();
	newH = ("0"+newH.toString()).substr(-2);
	newM = ("0"+newM.toString()).substr(-2);
	
	if (newH == -2 && newM == -2) {
		currentH = ("0"+date.getHours()).substr(-2);
		currentM = ("0"+date.getMinutes()).substr(-2);
		drawButton(92, 100, currentH, '#ffffff');	// Current hours
		drawButton(154, 100, currentM, '#ffffff');	// Current minutes
	} else {
		getNewTime(newH, newM);
		drawButton(92, 100, newH, '#ffffff');	// New hours
		drawButton(154, 100, newM, '#ffffff');	// New minutes
	}
	
	g.setFont("6x8", 3);
	g.drawString(":", 120, 96, '#ffffff');
	g.setFont("6x8", 2);
	g.setFont("6x8", 3);
	
	// Add buttons
	g.setFont("6x8", 3);
	g.drawImage(arrow_c_u, 61, 59, {scale: 2.0});	// Up arrow, left
	g.drawImage(arrow_c_u, 123, 59, {scale: 2.0});	// Up arrow, right
	
	g.drawImage(arrow_c_d, 61, 122, {scale: 2.0});	// Down arrow, left
	g.drawImage(arrow_c_d, 123, 122, {scale: 2.0});	// Down arrow, right
	
	// Redraw buttons when selected
	switch (posTime) {
		case 0:
			g.clearRect(buttonPosTime[0], buttonPosTime[1], buttonPosTime[2], buttonPosTime[3]);
			redrawArrow(arrow_cc_u, 77, 58, {scale: 0.5});
			drawButton(92, 100, "", '#729ba3');
			break;
		case 1:
			g.clearRect(buttonPosTime[4], buttonPosTime[5], buttonPosTime[6], buttonPosTime[7]);
			redrawArrow(arrow_cc_u, 139, 58, {scale: 0.5});
			drawButton(154, 100, "", '#729ba3');
			break;
		case 2:
			g.clearRect(buttonPosTime[8], buttonPosTime[9], buttonPosTime[10], buttonPosTime[11]);
			redrawArrow(arrow_cc_d, 77, 123, {scale: 0.5});
			drawButton(92, 100, "", '#729ba3');
			break;
		case 3:
			g.clearRect(buttonPosTime[12], buttonPosTime[13], buttonPosTime[14], buttonPosTime[15]);
			redrawArrow(arrow_cc_d, 139, 123, {scale: 0.5});
			drawButton(154, 100, "", '#729ba3');
			break;
		case 4:	// Accept Button
			g.clearRect(55, 150, 185, 205);
			drawButtonTimeText(124, centerY+60, acceptStr, '#729ba3');
	}
	
	if (thirdTut == true) {
		showTut3();
	}
}

function redrawArrow(img, x, y, options) {
	g.setBgColor('#000000');
	g.drawImage(img, x, y, options);
}

function getNewTime(hours, minutes) {		// Custom time function
  var hoursCounter = hours*3600000;
  var minutesCounter = minutes*60000;

  newTime = new Date(hoursCounter).getTime() + Date.now();
  var newDate = new Date(newTime);
  newTime = newDate;
}


function executeTime(pos) {
	newH = parseInt(newH);
	newM = parseInt(newM);
	
	switch (pos) {
		case 0:		// 0 = hour up
			if (newH == -2) {
				newH = parseInt(currentH);
				newM = parseInt(currentM);
			}
			newH += 1;
			if (newH == 24) { newH = 0; }
			newH = ("0"+newH.toString()).substr(-2);
			newM = ("0"+newM.toString()).substr(-2);
			drawTimeScreen();
			break;
		case 1:		// 1 = minute up
			if (newM == -2) {
				newH = parseInt(currentH);
				newM = parseInt(currentM);
			}
			newM += 1;
			if (newM == 60) { newM = 0; }
			newH = ("0"+newH.toString()).substr(-2);
			newM = ("0"+newM.toString()).substr(-2);
			drawTimeScreen();
			break;
		case 2:		// 2 = hour down
			if (newH == -2) {
				newH = parseInt(currentH);
				newM = parseInt(currentM);
			}
			newH -= 1;
			if (newH == -1) { newH = 23; }
			newH = ("0"+newH.toString()).substr(-2);
			newM = ("0"+newM.toString()).substr(-2);
			drawTimeScreen();
			break;
		case 3:		// 3 = minute down
			if (newM == -2) {
				newH = parseInt(currentH);
				newM = parseInt(currentM);
			}
			newM -= 1;
			if (newM == -1) { newM = 59; }
			newH = ("0"+newH.toString()).substr(-2);
			newM = ("0"+newM.toString()).substr(-2);
			drawTimeScreen();
			break;
		case 4:		// accept button
			displayState = 2;
			hourDiff = newH - currentH;
			minDiff = newM - currentM;
			posTime = 0;
			drawWatchScreen();
			break;
	}
}


// Reset and refresh watchface every 1s
setInterval(function refresh() {
	if (displayState == 1) {
		drawTimeScreen();
	}
	if (displayState == 2) {
		drawWatchScreen();
	}
		if (displayState == 3) {
		drawNameScreen();
	}
}, 1000);


// stop update for draw() when LCD display is off:
Bangle.on('lcdPower', on => {
	if (secondInterval) clearInterval(secondInterval);
	secondInterval = undefined;
	if (on) {
		if (displayState == 1) {
			secondInterval = setInterval(drawTimeScreen(), 1000);
		}
		else if (displayState == 2) {
			secondInterval = setInterval(drawWatchScreen, 1000);
		}
		else if (displayState == 3) {
			secondInterval = setInterval(drawNameScreen, 1000);
		}
	}
});

// Ex. 3: Controls
// Button functionality

// Button 1 - Previous Screen
setWatch(() => {
	if (displayState > 1) {
		if (watchName.length == 4) {
			displayState -= 1;
		}
	}

	if (displayState == 1) {	// Time Screen
		drawTimeScreen();
	}

	if (displayState == 3) {	// Name Screen
		pos = 0; posNum = 0;
	}
}, BTN1, {repeat:true, edge:"falling"});

// Button 2 - Enter button
setWatch(() => {
	if (watchName.length < 4) {
		showAlert = true;
	} else {
		showAlert = false;
	}
	
	if (displayState == 1) {
		executeTime(posTime);
	}
	
	if (displayState == 3) {
		if (nameScreenNumbers) {
			executeAction(enterNums[pos], false);
		} else {
			executeAction(enterAlph[pos], true);
		}
	}

}, BTN2, {repeat:true, edge:"falling"});

// Button 3 - Next Screen
setWatch(() => {
	if (displayState < 3) {
		displayState += 1;
	}

	if (displayState == 3) {
		//secondTut = false;
		pos = 0; posNum = 0;
		drawNameScreen();
	}
}, BTN3, {repeat:true, edge:"falling"});

// Button 4 - Left side
setWatch(() => {
	firstTut = false;

	if (displayState == 3 && secondTut == true) {
		secondTut = false;
	}

	if (displayState == 1 && thirdTut == true) {
		thirdTut = false;
	}

	if (displayState == 1 && posTime > -1) {
		posTime -= 1;

		if (posTime == -1) {
			posTime = 4;
		}
		drawTimeScreen();
	}

	if (displayState == 3 && pos > -1) {
		pos -= 1;
		posNum -= 1;
		if (nameScreenNumbers == true &&pos == 4 && posNum == 3) { posNum = 4; }
		if (nameScreenNumbers == true &&pos == 9 && posNum == 7) { posNum = 8; }
		if (nameScreenNumbers == true &&pos == -1 && posNum == -1) { pos = 12; posNum = 10; } // Back to end
		if (nameScreenNumbers == false && pos == 5 && posNum == 3) { pos = 4; posNum = 4; }
		if (nameScreenNumbers == false && pos == -1 && posNum == -1) { pos = 9; posNum = 7; }
		if (nameScreenNumbers == false && pos == 11 && posNum == 7) { pos = 0; posNum = 0; }
		drawNameScreen();
	}
}, BTN4, {repeat:true, edge:"falling"});

// Button 5 - Right side
setWatch(() => {
	firstTut = false;
	
	if (displayState == 3 && secondTut == true) {
		secondTut = false;
	}
	
	if (displayState == 1 && thirdTut == true) {
		thirdTut = false;
	}

	if (displayState == 1 && posTime < 5) {
		posTime += 1;

		if (posTime == 5) {
			posTime = 0;
		}
		drawTimeScreen();
	}

	else if (nameScreenNumbers) {
		if (displayState == 3 && pos < 13) {
			pos += 1;
			posNum += 1;
			if (displayState == 3 && pos == 5) { posNum = 4; }
			if (displayState == 3 && pos == 10) { posNum = 8; }
			if (pos == 13 && posNum == 11) { pos = 0; posNum = 0; } // Back to start
			drawNameScreen();
		}
	} else {
		if (displayState == 3 && pos < 10) {
			pos += 1;
			posNum += 1;
			if (displayState == 3 && pos == 6) { posNum = 4; }
			if (displayState == 3 && pos == 5 && posNum == 5) { pos = 6; posNum = 4; } // Back to end
			if (displayState == 3 && pos == 10 && posNum == 8) { pos = 0; posNum = 0; } // Back to start
			drawNameScreen();
		}
	}

}, BTN5, {repeat:true, edge:"falling"});
