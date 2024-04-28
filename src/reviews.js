function viewreviews(recipeId) {
  // Make a GET request to fetch reviews for the selected recipe
  fetch(`http://localhost:3000/recipes/get_reviews/${recipeId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return response.json();
    })
    .then(data => {
      const modalBody = document.getElementById('reviewList');
      modalBody.innerHTML = ''; // Clear previous reviews

      // Check if data is valid and reviews exist
      if (data && data.reviews && data.reviews.length > 0) {
        data.reviews.forEach(review => {
          // Create a card for each review
          const card = document.createElement('div');
          card.classList.add('card', 'mb-3');

          // Create card body
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          // Add reviewer name and review text to card body
          const reviewer = document.createElement('h5');
          reviewer.classList.add('card-title');
          reviewer.textContent = `By: ${review.Reviewer}`;
          cardBody.appendChild(reviewer);

          const reviewText = document.createElement('p');
          reviewText.classList.add('card-text');
          reviewText.textContent = review.review_text;
          cardBody.appendChild(reviewText);

          // Append card body to card
          card.appendChild(cardBody);

          // Append card to modal body
          modalBody.appendChild(card);
        });
      } else {
        // No reviews found for the recipe
        const noReviewsMessage = document.createElement('p');
        noReviewsMessage.textContent = 'No reviews found for this recipe';
        modalBody.appendChild(noReviewsMessage);
      }

      // Show the modal
      $('#viewReviewsModal').modal('show');
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
    });
}


//intialize adding a review
function addReview(recipeId) {
    // Check if user is logged in
    const userId = localStorage.getItem('userID');
    if (!userId) {
        // User is not logged in, prevent adding a review
        alert('You must be logged in to add a review.');
        return; 
    }
    
    // User is logged in, show the add review modal
    $('#addReviewModal').modal('show');
    document.getElementById('recipeIdInput').value = recipeId;
}

  
  // Function to submit the review
  function submitReview() {
    const recipeId = document.getElementById('recipeIdInput').value;
    const reviewText = document.getElementById('reviewText').value;
    const userId = localStorage.getItem('userID');
  
    // Make a POST request to add the review
    fetch(`http://localhost:3000/recipes/add_review/${recipeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipe_id: recipeId, review_text: reviewText, userID: userId })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      return response.json(); 
    })
    .then(data => {
      const messageContainer = document.getElementById('messageContainer');
      messageContainer.textContent = data.message;
      messageContainer.classList.add('show');
  
      setTimeout(() => {
        messageContainer.classList.remove('show');
      }, 3000);
  
      // Hide the modal on success
      $('#addReviewModal').modal('hide');
      loadAllRecipes();
    })
    .catch(error => {
      console.error('Error adding review:', error);
    });
  }
  module.exports = { viewreviews };