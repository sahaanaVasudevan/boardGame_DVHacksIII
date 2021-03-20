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

// Rolling dice event
function rollDice()
{
  var img = document.getElementById("imgDice");
  img.src = "static/rolling_dice.gif";
  img.style.display = "";
  var imgSpinner = document.getElementById("spinner");
  imgSpinner.src = "static/spinner.gif";
  imgSpinner.style.display = "";
  //Get random number
  var randomNumber = getRandomNumber(6);

  setTimeout(function () {
    img.src='static/'+randomNumber+'.jpg';
    currentUser += 1;
    currentUser = currentUser % numberOfPlayers;
    moveUser(randomNumber);


  }, 1000);

  return false;
}

async function moveUser(randomNumber)
{
  var i;
  var imgSpinner = document.getElementById("spinner");
  await sleep(500);
  var currentUserCounter = 0;
  // loop randomNumber
  for (i = 0; i < randomNumber; i++) {
    if(currentUser == 0)
    {
      if(i==0)
      {
        user1Counter += randomNumber;
        currentUserCounter = user1Counter;
      }

      moveCharacter1();

    }
    else
    {
      if(i==0)
      {
        user2Counter += randomNumber;
        currentUserCounter = user2Counter;
      }
      moveCharacter2();
    }
    await sleep(750);

  }
  if(user1Counter>16)
  {
    //Calculate User 1 score
    user1Score += 10;
    user1Counter = (user1Counter % 16) + 1;
    currentUserCounter = user1Counter;
  }
  if(user2Counter>16)
  {
    //Calculate User 2 score
    user2Score += 10;
    user2Counter = (user2Counter % 16) + 1;
    currentUserCounter = user2Counter;
  }
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
function moveCharacter1()
{
  if(user1ImageLeft == 0 && user1ImageTop==0)
  {
    user1ImageTop = 90;
    user1ImageLeft = 250;
  }
  else if(user1ImageTop < 100 && user1ImageLeft<1000)
  {
      user1ImageLeft += 200;
  }
  else if(user1ImageLeft>1000 && user1ImageTop<500) //Reached right most
  {
      user1ImageTop+=125;
  }
  else if(user1ImageTop>500 && user1ImageLeft>250) //Reached bottom right
  {
      user1ImageLeft-=200;
  }
  else
  {
    user1ImageTop-=125;
  }
  var img = document.getElementById("imgUser1");
  img.style.top=user1ImageTop + "px";
  img.style.left=user1ImageLeft + "px";
  return false;
}

function moveCharacter2()
{
  if(user2ImageLeft == 0 && user2ImageTop==0)
  {
    user2ImageTop = 90;
    user2ImageLeft = 250;
  }
  else if(user2ImageTop < 100 && user2ImageLeft<1000)
  {
      user2ImageLeft += 200;
  }
  else if(user2ImageLeft>1000 && user2ImageTop<500) //Reached right most
  {
      user2ImageTop+=125;
  }
  else if(user2ImageTop>500 && user2ImageLeft>250) //Reached bottom right
  {
      user2ImageLeft-=200;
  }
  else
  {
    user2ImageTop-=125;
  }
  var img = document.getElementById("imgUser2");
  img.style.top=user2ImageTop + "px";
  img.style.left=user2ImageLeft + "px";
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
