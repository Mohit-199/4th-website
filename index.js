var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var Level = 0;
var started = false;
function nextSequence() {

    var randomNumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    Level = Level + 1;
    $("h1").text("Level " + Level);
}
$("body").keydown(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});
$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        gameOver();
    }
}
function gameOver() {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () { $("body").removeClass("game-over"); }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickedPattern = [];
    Level = 0;
    started=false;

}

