

var buttonColours=["red", "green", "blue", "yellow"];
var gamePattern=[];
var userClickedPattern =[];
var started = false;
var level = 0;

//$("body").click(function(){nextSequence()});
$( "body" ).on( "keyup", startGame);
$("h1").on("click", startGame);
$(".btn").on("click", onClickDo);

  
function startGame() {
  if (!started) {
  $("#level-title").text("level "+level);
  nextSequence();
  started = true;
  }
}


function onClickDo (){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
}

function nextSequence () {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeTo('fast',0).fadeTo('fast',1);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass( "pressed" );
    setTimeout(function() {
        $('.pressed').removeClass('pressed');
    },100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key or click here to Restart");
      startOver();

    }

}

function startOver() {
  level=0;
  gamePattern=[];
  started=false;
  
}