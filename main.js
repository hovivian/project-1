//variables
const $displayPoints = $("#point");
let $points = 0;
const $container = $(".container");
const $card = $(".card");
let choices = []
const $grid = []
const $types = {
  16: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8'],
  36: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8', 'card-9', 'card-10', 'card-11', 'card-12', 'card-13', 'card-14', 'card-15', 'card-16', 'card-17', 'card-18'],
}

//done
// const flipCard = (e) => {
//   const $clicked = $(e.currentTarget);
//   $clicked.toggleClass('flip');
// }

// $card.on("click", flipCard);

//timer
const $startingMinute = 1;
let $time = $startingMinute * 60;

const $timeLeft = $("#timeLeft");

const updateTime = () => {
  if ($time >= 0) {
    const $minutes = Math.floor($time / 60);
    let $seconds = $time % 60;
    $seconds = $seconds < 10 ? '0' + $seconds : $seconds;
    $timeLeft.text(`${$minutes}: ${$seconds}`);
    $time--;
  } else {
    clearInterval
  }
}
///

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
    if (choices[0].attr("id") === choices[1].attr("id")) {
      addPoints();
      console.log("matched cards!");
    } else {
      console.log("the cards don't match!");
      setTimeout(() => {
        choiceOne.addClass('shake');
        choiceTwo.addClass('shake');
      }, 400);
      setTimeout(() => {
        choiceOne.toggleClass('flip');
        choiceTwo.toggleClass('flip');
        choiceOne.removeClass('shake')
        choiceTwo.removeClass('shake')
      }, 1200);
      choices.length = 0;
    }
  } else {
    //do nothing
  }
}

const handleClick = (e) => {
  const $clicked = $(e.currentTarget);
  flipCard(e);
  choices.push($clicked);
  matchedCards();
}

$card.on("click", handleClick);

const startGame = () => {
  // get value of the selected difficulty
  setInterval(updateTime, 1000);
  handleClick();
  // generateGrid(cardNum)
  // renderGrid()
  //hide start game button
}

const $startGameBtn = $("#start-btn");
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

// const generateGrid = (cardNum) => {
//   const clone = [...types[cardNum], ...types[cardNum]]
//   const shuffled = []
//   // code to shuffle the array
//   for (let i = 0; i < Math.sqrt(cardNum); i++) {
//     grid.push(shuffled.splice(0, Math.sqrt(cardNum)).map((type) => ({
//       type,
//       show: false
//     })))
//   }
// }

// const renderGrid = () => {}

//bonus
// const $firstMove = $();
// return the value of the first matched card

// const cardReading: {
//   card1: "You'll feel drawn to the comforts of your bed this afternoon.",
//   card2: "Your aura will be blessed with a powerful and mysterious allure this morning."
// }
