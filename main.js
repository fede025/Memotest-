const cardWraps = document.querySelectorAll(".card_wrap");
const cards = document.querySelectorAll(".card");


let isFlipped = false;
let isBoardLocked = false;
let firstFlippedCard, secondFlippedCard;



function delayAction(action, delay) {
  setTimeout(action, delay);
}



// Function to flip a card
function flipCard() {
    if (isBoardLocked || this === firstFlippedCard) return;
  
    this.classList.add("open");
  
    if (!isFlipped) {
      isFlipped = true;
      firstFlippedCard = this;
    } else {
      secondFlippedCard = this;
      checkForMatch();
    }
}
  


// Function to check if cards match
 function checkForMatch() {
    let isMatch = firstFlippedCard.dataset.framework === secondFlippedCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}


// Function to disable matched cards
function disableCards() {
    firstFlippedCard.removeEventListener("click", flipCard);
    secondFlippedCard.removeEventListener("click", flipCard);
  
    firstFlippedCard.classList.add("matched");
    secondFlippedCard.classList.add("matched");
  
    resetBoard();
}


// Function to unflip unmatched cards
function unflipCards() {
  isBoardLocked = true;
  firstFlippedCard.classList.add("unmatched");
  secondFlippedCard.classList.add("unmatched");

  delayAction(() => {
    firstFlippedCard.classList.remove("open");
    secondFlippedCard.classList.remove("open");
    firstFlippedCard.classList.remove("unmatched");
    secondFlippedCard.classList.remove("unmatched");
    resetBoard();
  }, 1000);
}




// Function to reset the board after checking for matches
function resetBoard() {
  [isFlipped, isBoardLocked] = [false, false];
  [firstFlippedCard, secondFlippedCard] = [null, null];
}



// Function to shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  const cardWrapArray = Array.from(cardWraps);
  shuffle(cardWrapArray);
  
  cardWrapArray.forEach((cardWrap, index) => {
    cardWrap.style.order = index;
});
  


// Function to initialize the game
function initializeGame() {
    cards.forEach((card) => card.addEventListener("click", flipCard));


    // Reveal cards at the beginning
    delayAction(() => {
        cards.forEach((card) => {
        card.classList.add("open");
        });
    }, 100)

    
    // Close cards at the beginning
    delayAction(() => {
    cards.forEach((card) => {
        card.classList.remove("open");
    });
    }, 2000)

}


// Call the initializeGame function to set up the game
initializeGame();








