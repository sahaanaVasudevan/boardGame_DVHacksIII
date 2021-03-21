var animals = ["Frog","Elephant","Giraffe","Monkey","Peacock","Penguin","Smiley","Cat","Skunk","Angry","Lion","Cheetah","Cow","Turtle","Sloth","tounge_emoji"];
var actions = ["Hop","Sing","Dance","Roll","Sneak Peak","March"];
var emojiActions = ["Laugh","Cry"];
var user1ImageLeft = 0;
var user1ImageTop = 0;
var user2ImageLeft = 0;
var user2ImageTop = 0;
var currentUser = 0;
var numberOfPlayers = 2;
var user1Counter = 0;
var user2Counter = 0;
var user1Score = 0;
var user2Score = 0;
var list = [
    { action:'Sing' },
    { action:'Sing' },
    { action:'Dance' },
    { action:'Eat' },
    { action:'Act' }
];

function rollDice()
{
  var img = document.getElementById("imgDice");
  var divRollButton = document.getElementById("divRollButton");
  divRollButton.style.display="none";
  img.src = "static/rolling_dice.gif";
  img.style.display = "";
  var imgSpinner = document.getElementById("spinner");
  imgSpinner.src = "static/spinner.gif";
  imgSpinner.style.display = "";
  var randomNumber = getRandomNumber(6);
  var actionRandomNumber = getRandomNumber(6);
  setTimeout(function () {
    img.src='static/'+randomNumber+'.jpg';
    moveUser(randomNumber, actionRandomNumber);


  }, 1000);

  return false;
}

async function moveUser(randomNumber, actionRandomNumber)
{
  var i;
  var imgSpinner = document.getElementById("spinner");
  await sleep(500);
  var currentUserCounter = 0;
  var currentPosition = 0;
  for (i = 0; i < randomNumber; i++) {
    if(currentUser == 0)
    {
      if(i==0)
      {
        currentPosition = user1Counter;
        user1Counter += randomNumber;
        currentUserCounter = user1Counter;
      }
      currentPosition++;
      moveCharacter1(currentPosition);

    }
    else
    {
      if(i==0)
      {
        currentPosition = user2Counter;
        user2Counter += randomNumber;
        currentUserCounter = user2Counter;
      }
      currentPosition++;
      moveCharacter2(currentPosition);
    }
    playFootStepSound();
    await sleep(750);
  }
  //calculating round completion score
  if(user1Counter>=16)
  {
    user1Score += 10;
  }
  if(user2Counter>=16)
  {
    user2Score += 10;
  }

  if(user1Counter>16)
  {
    user1Counter = 16 - user1Counter;
    currentUserCounter = user1Counter;
  }
  if(user2Counter>16)
  {
    user2Counter = user2Counter - 16;
    currentUserCounter = user2Counter;
  }
  currentUser += 1;
  currentUser = currentUser % numberOfPlayers;
  document.getElementById("userTurnText").innerHTML = "Player " + (currentUser+1) + "'s Turn";

  document.getElementById("user1ScoreText").innerHTML = user1Score;
  document.getElementById("user2ScoreText").innerHTML = user2Score;
  imgSpinner.style.display = "none";
  var message_action = actions[actionRandomNumber-1] + " like the " + animals[currentUserCounter-1];
  document.getElementById("message").innerHTML = message_action;
  showTimer();

}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
function moveCharacter1(currentPosition)
{
  //Commenting this because the positioning is not working with different screen size
  // if(user1ImageLeft == 0 && user1ImageTop==0)
  // {
  //   user1ImageTop = 90;
  //   user1ImageLeft = 250;
  // }
  // else if(user1ImageTop < 100 && user1ImageLeft<1000)
  // {
  //     user1ImageLeft += 200;
  // }
  // else if(user1ImageLeft>1000 && user1ImageTop<500) //Reached right most
  // {
  //     user1ImageTop+=125;
  // }
  // else if(user1ImageTop>500 && user1ImageLeft>250) //Reached bottom right
  // {
  //     user1ImageLeft-=200;
  // }
  // else
  // {
  //   user1ImageTop-=125;
  // }
  //var img = document.getElementById("imgUser1");
  //img.style.top=user1ImageTop + "px";
  //img.style.left=user1ImageLeft + "px";
  if(currentPosition>16)
  {
    currentPosition = currentPosition-16;
  }
  $('#imgUser1').prependTo('#divAnimal' + currentPosition);
  return false;
}

function moveCharacter2(currentPosition)
{
  // if(user2ImageLeft == 0 && user2ImageTop==0)
  // {
  //   user2ImageTop = 90;
  //   user2ImageLeft = 250;
  // }
  // else if(user2ImageTop < 100 && user2ImageLeft<1000)
  // {
  //     user2ImageLeft += 200;
  // }
  // else if(user2ImageLeft>1000 && user2ImageTop<500) //Reached right most
  // {
  //     user2ImageTop+=125;
  // }
  // else if(user2ImageTop>500 && user2ImageLeft>250) //Reached bottom right
  // {
  //     user2ImageLeft-=200;
  // }
  // else
  // {
  //   user2ImageTop-=125;
  // }
  // var img = document.getElementById("imgUser2");
  // img.style.top=user2ImageTop + "px";
  // img.style.left=user2ImageLeft + "px";
  if(currentPosition>16)
  {
    currentPosition = currentPosition-16;
  }
  $('#imgUser2').prependTo('#divAnimal' + currentPosition);
  return false;

}


function getRandomNumber(maxLimit)
{
  var randomNumber=Math.random()*(maxLimit-1)+1;
  return Math.floor(randomNumber);
}

function showAction()
{
  var img = document.getElementById("");
  print("img")
  return("img")
}

function updateScore(score)
{
  if(currentUser==1)
  {
    user1Score+=score;
    document.getElementById("user1ScoreText").innerHTML = user1Score;
  }
  else
  {
    user2Score+=score;
    document.getElementById("user2ScoreText").innerHTML = user2Score;
  }
  document.getElementById("divThumbsUp").style.display="none";
  document.getElementById("divRollButton").style.display="";
  document.getElementById("message").innerHTML = "";
  return false;

}
