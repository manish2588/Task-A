let isLongClick = false;
let startTime = 0;
const longClickThreshold = 40; // 200ms for a long click
let isMouseMovingUp = false;
let lastY = 0;

// Function to rotate the cards
// Function to rotate the cards
function rotateCards() {
  const aboveCard = document.querySelector('.card-above');
  const centerCard = document.querySelector('.card-center');
  const belowCard = document.querySelector('.card-below');

  // Add the exit class to the above card to move it out and shrink it
  aboveCard.classList.add('card-exit');
  
  // Scale down the center card instantly as it moves up
  centerCard.style.transform = 'translateY(-75%) scale(0.8)'; // Shrink the center card
  centerCard.style.transition = 'transform 0.5s ease'; // Smooth scale transition

  // Prepare the below card to come to the center, scaling up and moving smoothly
  belowCard.style.transition = 'transform 0.5s ease, opacity 0.5s ease'; // Smooth transition for below card
  belowCard.style.transform = 'translateY(0%) scale(1.1)'; // Bring the below card to the center and scale it up
  belowCard.classList.add('card-enter'); // Start the animation for the below card
  
  // After the animation ends, reset the positions
  setTimeout(() => {
    // Reset positions for continuous circular motion
    aboveCard.classList.remove('card-above', 'card-exit');
    aboveCard.classList.add('card-below');

    centerCard.classList.remove('card-center');
    centerCard.classList.add('card-above');

    belowCard.classList.remove('card-below', 'card-enter');
    belowCard.classList.add('card-center');

    // Reset transforms for the next scroll event
    centerCard.style.transform = '';
    belowCard.style.transform = '';
  }, 500); // Matches the transition duration
}


// Function to handle mouse interactions (long click and upward movement)
function handleMouseEvents(card) {
  card.addEventListener('mousedown', (event) => {
    startTime = Date.now(); // Record the time the mouse was pressed
    isLongClick = false; // Reset the long-click flag

    // Set timeout to check if the click duration exceeds the threshold
    setTimeout(() => {
      if (Date.now() - startTime >= longClickThreshold) {
        isLongClick = true; // Mark as long click
      }
    }, longClickThreshold);
  });

  card.addEventListener('mousemove', (event) => {
    if (isLongClick) {
      // Track mouse movement only after a long click is detected
      if (event.clientY < lastY) {
        // Mouse is moving upward, trigger the card rotation animation
        if (!isMouseMovingUp) {
          isMouseMovingUp = true;
          rotateCards(); // Trigger the card animation
        }
      }
      lastY = event.clientY; // Update last Y position
    }
  });

  card.addEventListener('mouseup', (event) => {
    if (isLongClick && isMouseMovingUp) {
      // Animation already triggered when mouse moved up, no further action needed
    }
    isLongClick = false; // Reset long-click flag
    isMouseMovingUp = false; // Reset upward movement flag
  });

  card.addEventListener('mouseout', () => {
    isLongClick = false; // Reset long-click flag if mouse leaves the element
    isMouseMovingUp = false; // Reset upward movement flag
  });
}

// Apply mouse events to all cards
document.querySelectorAll('.card').forEach(card => {
  handleMouseEvents(card);
});
