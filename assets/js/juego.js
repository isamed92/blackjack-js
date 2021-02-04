/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let playerScore = 0,
  computerScore = 0;

//References HTML
const btnDraw = document.querySelector('#btn-draw');
const smallsPoints = document.querySelectorAll('small');
const divPlayerHand = document.querySelector('#jugador-cartas');
const divComputerHand = document.querySelector('#computadora-cartas');
const btnStop = document.querySelector('#btn-stop');
const btnNew = document.querySelector('#btn-new');

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
    // deck.push(i + 'C')
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

const draw = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }
  const card = deck.pop();
  return card;
};

// draw();
//! player turn
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1;
  // let points = 0;
  // console.log({ value });
  // if( isNaN(value) ){
  //   console.log('no es un numero');
  //   points = (value === 'A') ? 11 : 10;
  // } else{
  //   console.log('es un numero');
  //   points = value * 1; // para castear el valor en un int
  // }
  // console.log(points);
};

//! computer turn
const computerTurn = (playerScore) => {
  do {
    const card = draw();
    computerScore += cardValue(card);
    smallsPoints[1].innerText = computerScore;
    computerScore > 21
      ? smallsPoints[1].classList.add('text-danger')
      : smallsPoints[1].classList.add('text-success');
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('carta');
    divComputerHand.append(imgCard);
    if (playerScore > 21) break;
  } while (computerScore < playerScore && playerScore <= 21);
  setTimeout(() => {
    if (computerScore === playerScore) {
      //! Lose player
      alert('empate');
    } else if (playerScore > 21) {
      alert('computer wins');
    } else if (computerScore > 21) {
      alert('player wins');
    } else {
      alert('computer wins');
    }
  }, 10);
};
// const valor = cardValue(draw());
// console.log({valor});

//Events
btnDraw.addEventListener('click', function () {
  const card = draw();
  // console.log({card});
  playerScore += cardValue(card);
  // console.log({playerScore});
  smallsPoints[0].innerText = playerScore;
  // smallsPoints[0].classList.add('bg-dark');
  // smallsPoints[0].classList.add('rounded');
  // smallsPoints[0].classList.add('px-1');
  playerScore > 21
    ? smallsPoints[0].classList.add('text-danger')
    : smallsPoints[0].classList.add('text-success');
  const imgCard = document.createElement('img');
  imgCard.src = `assets/cartas/${card}.png`;
  imgCard.classList.add('carta');
  divPlayerHand.append(imgCard);

  // playerScore > 21 ? btnDraw.disable = true
  // : playerScore === 21 ? console.log('genial!'): '';
  if (playerScore > 21) {
    console.error('You lose buddy :(');
    btnDraw.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerScore);
  } else if (playerScore === 21) {
    console.info('Genial');
    btnDraw.disabled = true;
    computerTurn(playerScore);
  }
});

btnStop.addEventListener('click', () => {
  btnDraw.disabled = true;
  btnStop.disabled = true;
  computerTurn(playerScore);
});

btnNew.addEventListener('click', () => {
  console.clear();
  deck = []; 
  crearDeck();
  playerScore = 0;
  computerScore = 0;
  smallsPoints[0].innerText=0;
  smallsPoints[1].innerText=0;
  divPlayerHand.innerHTML='';
  divComputerHand.innerHTML='';
  
  btnDraw.disabled=false;
  btnStop.disabled=false;
});
