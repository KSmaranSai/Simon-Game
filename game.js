let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let currentCount = 0;
let started=0;

//function to play sound
function playSound(item) {
    let audio = new Audio("sounds/" + item + ".mp3")
    audio.play();
}

function nextSequence() {
    //generate random number
    let random_colour = Math.floor(Math.random() * 4);

    //empty user array before next colour
    userClickedPattern = [];

    //push next colour to game array
    gamePattern.push(buttonColours[random_colour]);

    //animation to show next colour added
    $("." + buttonColours[random_colour]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColours[random_colour]);

    //level is increased after each colour added
    level++;

    //change head to level number
    $("h1").text("Level " + level);

    //initialise the current count after every sequence
    currentCount = 0;
}

//for every button colour
buttonColours.forEach(function (item) {

    //for click of button
    $("." + item).click(function () {
        $("." + item).addClass('flash');
        setTimeout(function () { $("." + item).removeClass('flash'); }, 100);
        playSound(item);
        userClickedPattern.push(item);

        //check user input
        checkAnswer(currentCount++);
    })
})

function checkAnswer(currentLevel) {
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
        let audio = new Audio("sounds/wrong.mp3")
        audio.play();
        $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over');
        },200)
        $(".head").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    else if(userClickedPattern.length===gamePattern.length){
        $("h1").text("Level "+level+" Cleared !!");
        setTimeout(function(){nextSequence();},2000);
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=0;
}

$("body").keypress(function (event) {if(!started){
    nextSequence();
    started=1;
}});