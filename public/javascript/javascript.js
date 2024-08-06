function showAlert() {
    alert('Button clicked!');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.body; // Use the body as the container
  
    container.addEventListener('click', (event) => {
      // Create a new food item
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      
      // Position the food item based on cursor position
      foodItem.style.left = `${event.clientX - 25}px`; // Center the food item on the cursor
      foodItem.style.top = `${event.clientY - 25}px`; // Center the food item on the cursor
  
      // Append the food item to the body
      document.body.appendChild(foodItem);
  
      // Remove the food item after animation completes
      foodItem.addEventListener('animationend', () => {
        foodItem.remove();
      });
    });
  });
  
  

  /*Walking Chicken?*/
  document.addEventListener('DOMContentLoaded', () => {
    const chicken = document.querySelector('.walking');
    const platform = document.querySelector('.platform');
    
    const movementSpeed = 5; // Speed of horizontal movement
    const updateInterval = 20; // Update position every 20 milliseconds
    const stopDuration = 1000; // Duration (ms) before stopping and changing direction
  
    let posX = 0;
    let directionX = 1; // 1 for right, -1 for left
    let isMoving = true; // Flag to control movement
    let isKeyboardControlled = false; // Flag to control whether keyboard is active
  
    function moveChicken() {
      const platformRect = platform.getBoundingClientRect();
      const maxX = platformRect.width - chicken.offsetWidth;
      
      if (isKeyboardControlled) {
        // Move chicken based on keyboard input
        if (directionX === 1 && posX < maxX) {
          posX += movementSpeed;
        } else if (directionX === -1 && posX > 0) {
          posX -= movementSpeed;
        }
      } else if (isMoving) {
        // Move chicken horizontally
        posX += movementSpeed * directionX;
  
        // Reverse direction when reaching boundaries
        if (posX <= 0 || posX >= maxX) {
          directionX *= -1;
        }
      }
  
      chicken.style.left = `${posX}px`;
    }
  
    function stopAndChangeDirection() {
      isMoving = false;
      setTimeout(() => {
        isMoving = true;
        directionX *= -1; // Change direction
        // Move to a random position on the platform
        const platformRect = platform.getBoundingClientRect();
        posX = Math.floor(Math.random() * (platformRect.width - chicken.offsetWidth));
        chicken.style.left = `${posX}px`;
      }, stopDuration);
    }
  
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        isKeyboardControlled = true;
        directionX = -1;
      } else if (event.key === 'ArrowRight') {
        isKeyboardControlled = true;
        directionX = 1;
      }
    }
  
    function handleKeyUp(event) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        isKeyboardControlled = false;
        directionX = 0;
      }
    }
  
    // Move the chicken continuously
    setInterval(moveChicken, updateInterval);
  
    // Stop and change direction at random intervals
    setInterval(stopAndChangeDirection, stopDuration * 2);
  
    // Add event listeners for keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  });
  