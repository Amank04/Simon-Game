buttonColours=["red","blue","green","yellow"];
gamePattern=[];
userClickedPattern=[];

var level=0;
let start=false;
$(document).on("keydown",function() {
    if(!start) {
        $('#level-title').text("Level " + level);
        nextSequence();
        start=true;
    }
});

// $(document).on("click",function() {
//     if(!start) {
//         $('#level-title').text("Level " + level);
//         nextSequence();
//         start=true;
//     }
// });

$(".btn").click(function () {
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(this.id);
    playSound(this.id);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern=[];

    level++;
    $('#level-title').text("Level " + level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var selectedColor=$("#" + randomChosenColour);
    selectedColor.fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {$("#"+ currentColor).removeClass("pressed");}, 100);
}

function startOver() {
    level=0;
    gamePattern=[];
    start=false;
}

function checkAnswer(currentLevel) {
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) { 
     console.log("Success.");
    if (userClickedPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    
   } else {
    console.log("wrong.");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over");}, 200);

    var audio=new Audio("sounds/wrong.mp3");
    audio.play();

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
   }
}