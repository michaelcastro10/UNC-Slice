//jquery.js
var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var unclogos = ['unclogo', 'unclogo1','unclogo2']
$(function(){

//click on start reset button

$("#startreset").click(function(){

    //we are playing
    if(playing == true){

        //reload page
        location.reload();
    }else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0; //set score to 0
        $("#scorevalue").html(score);

        //show trials left
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending unclogos
        startAction();
    }
});


//slice a fruit

$("#unc").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound

    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#unc").hide("explode", 500); //slice fruit

    //send new fruit
    setTimeout(startAction, 500);
});

//functions

//fill trialLeft box with hearts

function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending unclogos

function startAction(){

    //generate a fruit
    $("#unc").show();
    chooseLogo(); //choose a random fruit
    $("#unc").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

    //generate a random step
    step = 1+ Math.round(5*Math.random()); // change step

    // Move fruit down by one step every 10ms
    action = setInterval(function(){

        //move fruit by one step
        $("#unc").css('top', $("#unc").position().top + step);

        //check if the fruit is too low
        if($("#unc").position().top > $("#unclogosContainer").height()){
            //check if we have trials left
            if(trialsLeft > 1 ){
                //generate a fruit
                $("#unc").show();
                chooseLogo(); //choose a random fruit
                $("#unc").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step

                //reduce trials by one
                trialsLeft --;

                //populate trialsLeft box
                addHearts();

            }else{ // game over
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

// generate a random fruit

function chooseLogo(){
    $("#unc").attr('src' , 'images/' + unclogos[Math.round(2*Math.random())] +'.png');
}

//Stop dropping unclogos

function stopAction(){
    clearInterval(action);
    $("#unc").hide();
}
});
