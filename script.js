// Author: Satbir Singh
// File Name: Script.js
// Purpose: For common site action


//get the variables from the dom
var colorDispaly = document.querySelector("#GuessColor");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector("header");
var resetButton = document.querySelector("#btnReset");
var modeButtons = document.querySelectorAll(".mode");
var helpButton = document.querySelector("#help");
var helpDiv = document.querySelector("#help-div");

var EasyGame = 3;
var HardGame = 6;
var BodyColor = "#232323"
var GameType = HardGame;
var colors = [];
var pickedColor;

//set default for page load
initiate();

function initiate () {

  SetupModeButtons ();

  ResetGame();
}

function SetupModeButtons () {
  //Easy game mode is clicked
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click",function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent.toLowerCase() === "Easy".toLowerCase() ? GameType= EasyGame : GameType = HardGame;
      ResetGame();
    });
  }
}

///add event listener to reset button
resetButton.addEventListener("click",function(){

  ResetGame();

});

helpButton.addEventListener("click", function(){
  if(helpDiv.style.top === "-1000px"){
    helpDiv.style.top = "";}
  else{
    helpDiv.style.top = "-1000px";
  }
  
});


function ResetGame(){
  //generate all new colors
  colors = generateRandomColors(GameType);
  //pick a new random color
  pickedColor = pickColor();
  colorDispaly.textContent = pickedColor;
  //change colorDispaly to match picked Color
  ColorSquares(GameType);
  //change header color to default
  header.style.backgroundColor = "";
  //change text back to the New color
  resetButton.textContent = "New Color";
  messageDisplay.textContent = "";
}
//give the color to squares
function ColorSquares(num){
  // loop the squares to set the colors
  for(var i=0; i<squares.length; i++){
    if(i < num){

      squares[i].style.display = "block";
      //set the initial color
      squares[i].style.backgroundColor = colors[i];
      //set the click event listener
      squares[i].addEventListener("click",ColorBoxClick);



    }else{
      squares[i].style.display = "none";
    }

  }
}


/*
* Color click Event handler method
*/
function ColorBoxClick(){
  var clickedColor = this.style.backgroundColor;

  if(clickedColor === pickedColor){
    messageDisplay.textContent = "Correct!";
    resetButton.textContent = "Play Again!";
    changeColors(clickedColor);
  }else{
    this.style.backgroundColor = BodyColor;
    messageDisplay.textContent = "Try Again!";	}
}

function changeColors(color){
  header.style.backgroundColor = color;
  // loop the squares to set the colors
  for(var i=0; i<squares.length; i++){
    if(i < GameType){
      squares[i].style.visibility = "block";
      //set the initial color
      squares[i].style.backgroundColor = color;
    }
  }


}

function pickColor(){
  var random = Math.floor((Math.random() * colors.length) );
  return colors[random];
}

function generateRandomColors(num){
  //make an array
  var arr = [];
  //add num random colors to array
  for(var i=0; i<num; i++){
    //get random color and push into arr
    arr[i]= randomCol();
  }

  return arr;
}

function randomCol(){
  //pick red from 0 - 255
  var red = Math.floor(Math.random()* 256);
  //pick green from 0 - 255
  var green = Math.floor(Math.random() * 256);
  //pick blue from 0 - 255
  var blue = Math.floor(Math.random() * 256);

  return "rgb("+red + ", "+green + ", "+blue + ")";
}
