// Cards Related
const $container = $(".container");
const $card = $(".card");
let choices = [];
let matched = [];

// Controls
const $startGameBtn16 = $("#start-btn-16");
const $startGameBtn36 = $("#start-btn-36");
const $resetBtn = $("#reset");
const $startPage = $(".startPage");
const $clickSound = $("#clickSound");
const $matchedSound = $("#matchedSound");
const $wrongSound = $("#wrongSound");
const $winSound = $("#winSound");
const $info = $(".info");
const $body = $("body");

// Game finishes
const $endPageContainer = $(".endPageContainer");
const $results = $(".results");

// Points
const $displayPoints = $("#point");
let $points = 0;

// Timer
const $timeLeft = $("#timeLeft");
const $startingMinute = 2;
let timeInterval = null;
let $time = $startingMinute * 60;

// Bonus
let randomNum = Math.floor(Math.random() * 9);
const cardReadingContent = ["You'll feel drawn to the comforts of your bed this afternoon.", "Your aura will be blessed with a powerful and mysterious allure this evening.", "You are going to have a really great lunch today.","You will be hungry again in one hour.","The fortune you seek is in another card.","You will live a long time, long enough to play many many memory games.","You will click the button below to play another round of memory game.","I can't predict the future, I'm just a memory game."];

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
      matchedSound();
      matched.push(choiceOne)
      console.log("matched cards!");
      if (matched.length>=8){
        gamePlayWins();
        clearInterval(timeInterval);
      }
    } else {
      console.log("the cards don't match!");
      wrongSound();
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

const matchedSound = () => {
  $matchedSound[0].play();
}

const winSound = () => {
  $winSound[0].play();
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

const cardReading = () => {
  `cardReadingContent.${n}`
}

const gamePlayWins = () => {
    winSound();
    console.log("game end!");
    $endPageContainer.removeClass("hide");
    $points += ($time * 10)+10;
    $displayPoints.text($points);
    $results.html( `
      <div>
        <img src="/game-images/crystalball.gif" alt="" style="height:60px;">
        <h2>Congratulations!</h2>
        <h2 style="margin-bottom: 20px;">You scored ${$points} points.</h2>
        <p style="margin-bottom: 20px;">Here is your fortune reading for today:</p>
        <p style="color: white; margin-bottom: 20px; font-size:16px;">${cardReadingContent[randomNum]}</p>
        <p>Start another game?</p>
      </div>
    `)
}

const gamePlayLoses = () => {
    $endPageContainer.removeClass('hide');
    $results.html( `
      <div>
        <img src="/game-images/crystalball.gif" alt="" style="height:60px;">
        <h2>Time's up!</h2>
        <h2 style="margin-bottom: 20px;">You scored ${$points} points.</h2>
        <p style="margin-bottom: 20px;">Here is your fortune reading for today:</p>
        <p style="color: white; margin-bottom: 20px; font-size:16px;">${cardReadingContent[randomNum]}</p>
        <p>Start another game?</p>
      </div>
    `)
}

const startGame16 = () => {
  timeInterval = setInterval(updateTime, 1000);
  generateGrid(4);
  $startPage.remove();
  $endPageContainer.addClass('hide');
  $body.addClass('body-column');
  $info.removeClass('info-36');
  $info.addClass('info-16');
}

const startGame36 = () => {
  timeInterval = setInterval(updateTime, 1000);
  generateGrid(6);
  $startPage.remove();
  $endPageContainer.addClass('hide');
  $info.removeClass('info-16');
  $info.addClass('info-36');
  $body.addClass('body-row');
  $card.removeClass('view');
  $card.addClass('view-36');
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
        <img src="game-images/front-view-${imageKey}.png" alt="" class="front-view view-${rows*rows}"/>
        <img src="game-images/back-view.png" alt="" class="back-view view-${rows*rows}" />
      </div>
    `)
  });
}

$container.on("click", '.card', handleClick);
