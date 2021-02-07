const myModule = (() => {
  'use strict';

  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

  // let playerScore = 0,
  //   computerScore = 0;
  let playerPoints = [];

  //References HTML
  const smallsPoints = document.querySelectorAll('small'),
    divPlayersHand = document.querySelectorAll('.divCartas');
  const btnDraw = document.querySelector('#btn-draw'),
    btnStop = document.querySelector('#btn-stop'),
    btnNew = document.querySelector('#btn-new');

  const initGame = (playerNum = 2) => {
    deck = crearDeck();
    playerPoints =[];
    for (let i = 0; i < playerNum; i++) {
      playerPoints.push(0);
    }
    smallsPoints.forEach(elem => elem.innerText = 0);
    divPlayersHand.forEach(elem => elem.innerHTML = '');
    console.log(playerPoints);

    btnDraw.disabled = false;
    btnStop.disabled = false;
  };

  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    return _.shuffle(deck);
  };

  const draw = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck';
    }
    return deck.pop();
  };

  //! player turn
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1;
  };

  //? Turn: 0 - player 1 ... n - Computer
  const accPoints = (turn, card) => {
    playerPoints[turn] += cardValue(card);
    smallsPoints[turn].innerText = playerPoints[turn];
    return playerPoints[turn];
  };

  const makeCard = (card, turn) => {
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('carta');
    divPlayersHand[turn].append(imgCard);
  };

  const defineWinner = () =>{
    const [ minPoints, computerPoints ] = playerPoints;

    setTimeout(() => {
      if (computerPoints === minPoints) {
        //! Lose player
        alert('empate');
      } else if (minPoints > 21) {
        alert('computer wins');
      } else if (computerPoints > 21) {
        alert('player wins');
      } else {
        alert('computer wins');
      }
    }, 50);
  };

  //! computer turn
  const computerTurn = (minPoints) => {
    let computerPoints = 0;
    do {
      const card = draw();
      const turn = playerPoints.length - 1;
      computerPoints = accPoints(turn, card);
      makeCard(card, turn)
    } while (computerPoints < minPoints && minPoints <= 21);

    defineWinner();
  };

  //Events
  btnDraw.addEventListener('click', function () {
    const card = draw();
    const playerScore = accPoints(0, card);
    makeCard(card, 0);
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
    computerTurn(playerPoints[0]);
  });

  btnNew.addEventListener('click', () => {
    initGame();

  });

  return {
    iniciarJuego: initGame,
  };
})();
