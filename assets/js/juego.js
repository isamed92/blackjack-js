(() => {
  'use strict';

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
    }
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    deck = _.shuffle(deck);
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

  //Events
  btnDraw.addEventListener('click', function () {
    const card = draw();
    playerScore += cardValue(card);
    smallsPoints[0].innerText = playerScore;
    playerScore > 21
      ? smallsPoints[0].classList.add('text-danger')
      : smallsPoints[0].classList.add('text-success');
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('carta');
    divPlayerHand.append(imgCard);
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
    smallsPoints[0].innerText = 0;
    smallsPoints[1].innerText = 0;
    divPlayerHand.innerHTML = '';
    divComputerHand.innerHTML = '';
    btnDraw.disabled = false;
    btnStop.disabled = false;
  });
})();
