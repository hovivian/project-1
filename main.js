// Cards Related
const $container = $(".container");
const $card = $(".card");
const card = document.querySelector(".card");
let choices = [];
const matched = [];

// Controls
const $startGameBtn16 = $("#start-btn-16");
const $startGameBtn36 = $("#start-btn-36");
const $resetBtn = $("#reset")
const $startPage = $(".startPage");
const $clickSound = $("#clickSound")

// Game finishes
const $endPageContainer = $(".endPageContainer")
const $results = $(".results");

// Points
const $displayPoints = $("#point");
let $points = 0;

// Timer
const $timeLeft = $("#timeLeft");
const $startingMinute = 1;
let timeInterval = null;
let $time = $startingMinute * 60;

const updateTime = () => {
  if ($time>=0) {
    const $minutes = Math.floor($time / 60);
    let $seconds = $time % 60;
    $seconds = $seconds < 10 ? '0' + $seconds : $seconds;
    $timeLeft.text(`${$minutes}: ${$seconds}`);
    $time--;
  } else if ($time<0){
    clearInterval(timeInterval);
    gamePlayLoses();
  } else if ($points=80){
    clearInterval(timeInterval);
    gamePlayWins();
}
}

const addPoints = () => {
  $points += 10;
  $displayPoints.text($points);
}

const matchedCards = () => {
  let choiceOne = choices[0];
  let choiceTwo = choices[1];
  if (choices.length === 2) {
    if (choices[0].attr("data-type") === choices[1].attr("data-type")) {
      addPoints();
      matched.push(choiceOne)
      console.log("matched cards!");
    } else {
      console.log("the cards don't match!");
      setTimeout(() => {
        choiceOne.find('.front-view').addClass('shake');
        choiceTwo.find('.front-view').addClass('shake');
      }, 400);
      setTimeout(() => {
        choiceOne.toggleClass('flip');
        choiceTwo.toggleClass('flip');
        choiceOne.find('.front-view').removeClass('shake')
        choiceTwo.find('.front-view').removeClass('shake')
      }, 1200);
    }
    choices = []
  }
}

const clickSound = () => {
  $clickSound[0].play();
}

const wrongSound = () => {
  $wrongSound[0].play();
}

const correctSound = () => {
  $correctSound[0].play();
}

const flipCard = (e) => {
  const $flip = $(e.currentTarget);
  $flip.toggleClass('flip');
}

const handleClick = (e) => {
    const $clicked = $(e.currentTarget);
    const id = $clicked.attr('data-id');
    const alreadyExist = choices.find(($elem) => $elem.attr('data-id') === id);
    if (!alreadyExist) {
      flipCard(e);
      clickSound();
      choices.push($clicked);
      matchedCards();
    }
}

// const gamePlay16 = () => {
//   console.log("hahaha");
//   if (matched.length ===8){
//     console.log("game end!");
//     $endPageContainer.removeClass("hide");
//     $points += ($time * 10);
//     $results.html(`<h2>Congratulations! You scored ${$points}!</h2>`);
//     // $gameFinished = true;
//   }  else if ($points === 80) {
//     console.log("game end!");
//     $endPageContainer.removeClass('hide');
//     $results.html(`<h2>Time's up! You scored ${$points}!</h2>`);
//     // $gameFinished = true;
//   }
// }

const gamePlayWins = () => {
    if(matched.length===8)
    console.log("game end!");
    $endPageContainer.removeClass("hide");
    // $points += ($time * 10);
    $results.html( `
      <div>
        <h2>Congratulations! You scored ${$points += ($time * 10)} points!</h2>
        <p> Here is your fortune of the day: ${matched[0]}</p>
        <p>Start another game?</p>
      </div>
    `)
}

const gamePlayLoses = () => {
    $endPageContainer.removeClass('hide');
    $results.html( `
      <div>
        <h2>Time's up! You scored ${$points} points!</h2>
        <p> Here is your fortune of the day: ${matched[0]}</p>
        <p>Start another game?</p>
      </div>
    `)
}

// const gamePlay36 = () => {
//   if ($points===160) {
//     $endPageContainer.removeClass('hide')
//     $points += ($time * 10);
//     $results.html(`<h2>Congratulations! You scored ${$points}!</h2>`);
//   } else if($timeLeft === 0){
//     $endPageContainer.removeClass(hide)
//     $results.html(`<h2>Time's up! You scored ${$points}!</h2>`);
//     return gameFinished = true;
//   }
// }

const startGame16 = () => {
  timeInterval = setInterval(updateTime, 1000);
  generateGrid(4);
  $startPage.remove();
  $endPageContainer.addClass('hide');
}

const startGame36 = () => {
  timeInterval = setInterval(updateTime, 1000);
  generateGrid(6);
  $startPage.remove();
  $endPageContainer.addClass('hide');
}

const reset16 = () => {

}

$startGameBtn16.on("click", startGame16);
$startGameBtn36.on("click", startGame36);

$resetBtn.on("click", function () {
  location.reload(true);
});

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

const generateGrid = (rows) => {
  const baseImageKeys = Array((rows * rows) / 2).fill().map((_, i) => `${i + 1}`);
  const allImageKeys = [...baseImageKeys, ...baseImageKeys];
  const shuffled = shuffle(allImageKeys);
  shuffled.forEach((imageKey, i) => {
    $container.append(`
      <div class="card rows-col-${rows * rows}" data-id="${i}" data-type="card-${imageKey}" id="gameCards">
        <img src="game-images/front-view-${imageKey}.png" alt="" class="front-view view"/>
        <img src="game-images/back-view.png" alt="" class="back-view view" />
      </div>
    `)
  });
}

$container.on("click", '.card', handleClick);



//bonus
// const $firstMove = $();
// return the value of the first matched card

// const cardReading: {
//   card1: "You'll feel drawn to the comforts of your bed this afternoon.",
//   card2: "Your aura will be blessed with a powerful and mysterious allure this morning."
//
