//AUTOMATICALLY STARTS BALL ON LOAD
(function startBall() {
    setInterval(moveBall, 1);
}());

//noclick triggers a function which does the reloading. putting the reload in the global level causes major issues. 
window.addEventListener('click', reloadWin);

function reloadWin() {
    location.reload();
}

//this is the Position
bally = 120;
ballx = 200;


//initiaate the ball array
ballArr = [];

//this is the direction...
let ballDx = randNum();
let ballDy = randNum();

function randNum() {
    let num = Math.random() < 0.5 ? 1 : -1;
    return num
}


//declare game area
let gameArea = document.getElementById('gameArea');

//DOM element of Left Slider
const sliderLeft = document.getElementById('left');
const sliderRight = document.getElementById('right');

//specify starting vertical position in pixels (px)
let yPosition = 125;
let yPositionR = 200;

//add that variable to the slider
sliderLeft.style.top = yPosition + 'px';

//this is the event listener that fires the function slider everytime the key up/down is pressed.


//slider function has a parameter of e, which stands for event.
// function slider(e) {

//     e = e || window.event;
    
//     //up
//     if (e.keyCode == '38') {

//         if(yPosition <= 0) {
//         delta = 0;    
//         } else {
//         delta = -10;
//          }
//         yPosition += delta;
//         sliderLeft.style.top = yPosition +'px';
//     }

//     //down
//     else if (e.keyCode == '40') {

//         if(yPosition >= 250) {
//             delta = 0;    
//             } else {
//             delta = 10;
//              }
      
//         yPosition += delta;
//         sliderLeft.style.top = yPosition +'px';
//     }
// }


function findObjectCoords(e)
{
  var obj = document.getElementById("gameArea");
  document. getElementById('gameArea').style.cursor = 'none';
  var obj_left = 0;
  var obj_top = 40;
  var xpos;
  var ypos;
  while (obj.offsetParent)
  {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  if (e)
  {
    //FireFox
    xpos = e.pageX;
    ypos = e.pageY;
  }

  xpos -= obj_left;
  ypos -= obj_top;

 
     yPosition = ypos;
    sliderLeft.style.top = yPosition + 'px';

}
document.getElementById("gameArea").onmousemove = findObjectCoords

//computer
function moveBall() {
    
    ball = document.getElementById('ball');

    //vertical ball movement
    //if the ball hits the bottom and top, it reverses course. 
    bally += ballDy;
    ball.style.top = bally + 'px';
    if(bally >= 314) ballDy = -1;
    if(bally <= 0) ballDy = 1;

    //horizontal ball movement
    ballx += ballDx;
    ball.style.left = ballx + 'px';
   
    //coming in contact with the left slider
    if (ballx == 10 && bally >= yPosition && bally <= (yPosition + 80)) ballDx = 1;

    //if the ball goes over the left and right side, stop the ball, and color the border red to indicate the game is over. 
    if(ballx > 512) ballDy  = 0, ballDx = 0, gameArea.className = "border-top border-bottom border-danger";
    if(ballx < 0) ballDy = 0, ballDx = 0, gameArea.className = "border-top border-bottom border-danger";
    
    //portion controls the right slider.
    let omega = 1; 
    yPositionR = bally * omega;
    sliderRight.style.top = yPositionR + 'px';

    if (yPositionR === 5) omega = 0;
    if (yPositionR === 245) omega = 0;

     //if ball comes in contact with left slider. //this has to be included with the ball movement, as it is here where the bally and ballx positions are recorded
    //  if (ballx == 10 && bally >= yPositionR && bally <= (yPositionR + 80)) ballDy = 1;
    if (ballx == 500 && bally >= yPositionR && bally <= (yPositionR + 80)) ballDx = -1;

}





