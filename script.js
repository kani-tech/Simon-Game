//'use strict'
console.log('hello')

let gamePattern = []
let userClickedPattern = []
const buttonColours = ['red', 'blue', 'green', 'yellow']
let level = 0
let started = false;


// Start Game
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Determine Next Color
function nextSequence() {
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level);

    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    // Selecting Button
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour)
    // Responding to Click
}

// User Click
$('.btn').click(function () {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

// Playing Sound
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Animate Clicks
function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed')
    setTimeout(function () {
        $(`#${currentColour}`).removeClass('pressed')
    }, 100)
}

// Correct Answer?
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log('success')
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {

        console.log("wrong");

        playSound('wrong')

        $('body').addClass("game-over")
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200)

        $('h1').text('Game Over, Press Any Key to Restart')
        startOver()
    }
}

// Restart the Game
function startOver() {
    level = 0
    gamePattern = []
    started = false
}