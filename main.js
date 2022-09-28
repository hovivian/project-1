// Cards Related
const $container = $(".container");
const $card = $(".card");
let choices = []

// Controls
const $startGameBtn = $("#start-btn");

// Points
const $displayPoints = $("#point");
let $points = 0;

// timer
const $timeLeft = $("#timeLeft");
const $startingMinute = 1;
let timeInterval = null
let $time = $startingMinute * 60;

const updateTime = () => {
  if ($time >= 0) {
    const $minutes = Math.floor($time / 60);
    let $seconds = $time % 60;
    $seconds = $seconds < 10 ? '0' + $seconds : $seconds;
    $timeLeft.text(`${$minutes}: ${$seconds}`);
    $time--;
  } else {
    clearInterval(timeInterval)
  }
}

const flipCard = (e) => {
  const $flip = $(e.currentTarget);
  $flip.toggleClass('flip');
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

const handleClick = (e) => {
  const $clicked = $(e.currentTarget);
  const id = $clicked.attr('data-id')
  const alreadyExist = choices.find(($elem) => $elem.attr('data-id') === id)
  if (!alreadyExist) {
    flipCard(e);
    choices.push($clicked);
    matchedCards();
  }
}

const startGame = () => {
  // get value of the selected difficulty
  timeInterval = setInterval(updateTime, 1000);
  generateGrid(4)
  //hide start game button
}

$card.on("click", handleClick);
$startGameBtn.on("click", startGame);


// const gamePlay = () => {
//   if (cardNum === 0) {
//     $points += ($time * 10);
//     popup message: `congrats! you scored ${$points}`
//     show play again button
//   } else if ($timeLeft === 0) {
//     popup message: `Time's up! you scored ${$points}`
//     show play again button
//   }
// }

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

// num is 4, 6, 8...
const generateGrid = (rows) => {
  const baseImageKeys = Array((rows * rows) / 2).fill().map((_, i) => `${i + 1}`)
  const allImageKeys = [...baseImageKeys, ...baseImageKeys]
  const shuffled = shuffle(allImageKeys)
  $container.addClass(`rows-col-${rows}`)
  shuffled.forEach((imageKey, i) => {
    $container.append(`
      <div class="card" data-id = "${i}" data-type="card-${imageKey}" >
        <img src="game-images/front-view-${imageKey}.png" alt="" class="front-view view"/>
        <img src="game-images/back-view.png" alt="" class="back-view view" />
      </div>
    `)
  })
}

//bonus
// const $firstMove = $();
// return the value of the first matched card

// const cardReading: {
//   card1: "You'll feel drawn to the comforts of your bed this afternoon.",
//   card2: "Your aura will be blessed with a powerful and mysterious allure this morning."
// }
