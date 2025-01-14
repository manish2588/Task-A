let isLongClick = false;
let startTime = 0;
const longClickThreshold = 40; // for tracking long click in ms
let isMouseMovingUp = false;
let lastY = 0;

function rotateCards() {
  const aboveCard = document.querySelector(".card-above");
  const centerCard = document.querySelector(".card-center");
  const belowCard = document.querySelector(".card-below");

  // Add the exit class to the above card to move it out and shrink it
  aboveCard.classList.add("card-exit");

  // Scale down the center card instantly as it moves up
  centerCard.style.transform = "translateY(-75%) scale(0.7)";
  centerCard.style.transition = "transform 0.5s ease";

  //  scaling up and moving smoothly (the below card)
  belowCard.style.transform = "translateY(0%) scale(1.1)";
  belowCard.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  belowCard.classList.add("card-enter");

  setTimeout(() => {
    // Reset positions for continuous circular motion
    aboveCard.classList.remove("card-above", "card-exit");
    aboveCard.classList.add("card-below");

    centerCard.classList.remove("card-center");
    centerCard.classList.add("card-above");

    belowCard.classList.remove("card-below", "card-enter");
    belowCard.classList.add("card-center");

    centerCard.style.transform = "";
    belowCard.style.transform = "";
  }, 500);
}

// Function to handle mouse interactions (long click and upward movement)
function handleMouseEvents(card) {
  card.addEventListener("mousedown", (event) => {
    startTime = Date.now();
    isLongClick = false;

    setTimeout(() => {
      if (Date.now() - startTime >= longClickThreshold) {
        isLongClick = true;
      }
    }, longClickThreshold);
  });

  card.addEventListener("mousemove", (event) => {
    if (isLongClick) {
      if (event.clientY < lastY) {
        if (!isMouseMovingUp) {
          isMouseMovingUp = true;
          rotateCards();
        }
      }
      lastY = event.clientY;
    }
  });

  card.addEventListener("mouseup", (event) => {
    if (isLongClick && isMouseMovingUp) {
     
    }
    isLongClick = false; 
    isMouseMovingUp = false; 
  });

  card.addEventListener("mouseout", () => {
    isLongClick = false; 
    isMouseMovingUp = false; 
  });
}

// Apply mouse events to all cards
document.querySelectorAll(".card").forEach((card) => {
  handleMouseEvents(card);
});
