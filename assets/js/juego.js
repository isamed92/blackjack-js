/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? 
          (value === 'A') ? 11 : 10 
            : value * 1; 
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

const valor = cardValue(draw());
console.log({valor});
