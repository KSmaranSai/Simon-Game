//declaration of all variables
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let currentCount = 0;
let started = 0;

//function to play sound
function playSound(item) {
    let audio = new Audio("sounds/" + item + ".mp3")
    audio.play();
}

//function to generate next colour
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
    $(".head").text("Level " + level);

    //initialise the current count after every sequence
    currentCount = 0;
}

//function to add vent click if game is started else keep it off
function clickOnOff() {
    //for every button colour
    buttonColours.forEach(function (item) {
        if (started) {
            //for click of button
            $("." + item).click(function () {
                $("." + item).addClass('flash');
                setTimeout(function () { $("." + item).removeClass('flash'); }, 100);
                playSound(item);
                userClickedPattern.push(item);

                //check user input
                checkAnswer(currentCount++);
            })
        }
        else{
            //remove click function
            $('.'+item).off('click');
        }
    })
}

//check answer after ever input
function checkAnswer(currentLevel) {

    //If at certain index user entered is not equal to gamepattern
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {

        //play wrong audio
        let audio = new Audio("sounds/wrong.mp3")
        audio.play();

        //adds class game over to body
        $("body").addClass('game-over');

        //removes class game over from body after 200ms
        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 200)

        //display option to restart
        $(".head").text("Game Over, Press Any Key to Restart");

        //sets all the variable parameters to the start value
        startOver();
    }
    //if all the elements entered are same jump to next level
    else if (userClickedPattern.length === gamePattern.length) {

        //level cleared message
        $(".head").text("Level " + level + " Cleared !!");
        
        //paused state
        started=0;

        //turn off click function of buttons between the interval after level is cleared
        clickOnOff();

        // call nextSequence after 2000ms
        setTimeout(function () {

            //next sequence called 
            nextSequence();

            //resume state
            started=1;
            
            //turn on click
            clickOnOff();
        }, 2000);
    }
}

//function to set parameters to default value
function startOver() {

    //restarts level
    level = 0;
    
    //empty all the pattern values
    gamePattern = [];
    userClickedPattern = [];

    //game ended
    started = 0;

    //turn off click function of buttons
    clickOnOff();
}

//if a keypress is encountered the flowing code will run (for pc)
$("body").keypress(function (event) {

    if (!started) {
        
        //generate first colour if game not started (for pc)
        nextSequence();

        //game started
        started = 1;

        //Switch on the click function of buttons
        clickOnOff();
    }

});

//if a touch is encountered the flowing code will run (for moblies or tablets or any touch screen device)
$("body").on({

    //if touch encountered the function will run
    'touchstart': function () {
        if (!started) {

            //generate first colour if game not started (for moblies or tablets or any touch screen device)
            nextSequence();

            //game started
            started = 1;
        }
    }
});
