// Function to handle deleting a recipe
function deleteRecipe(recipeId) {
  // Make a DELETE request to the server to delete the recipe
  fetch(`http://localhost:3000/recipes/${recipeId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete recipe');
    }
    return response.json();
  })
  .then(data => {
    // Show success message
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = data.message;
    messageContainer.classList.add('show');

    // Hide the message after 2 seconds
    setTimeout(() => {
      messageContainer.classList.remove('show');
    }, 2000);
    

    // Reload recipes
    loadRecipes();
  })
  .catch(error => {
    console.error('Error deleting recipe:', error);
  });
}

// Function to intialize editing a recipe. loads the clicked recipe on a modal
function editRecipe(recipeId) {
  // Make a GET request to fetch the recipe details
  fetch(`http://localhost:3000/recipes/${recipeId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }
      return response.json();
    })
    .then(recipe => {
      // Populate the modal with the recipe details
      const modalTitle = document.querySelector('.modal-title');
      const recipeIdInput = document.getElementById('recipeId');
      const recipeIdDisplay = document.getElementById('recipeIdDisplay');
      const recipeNameInput = document.getElementById('recipeName');
      const ingredientsTextarea = document.getElementById('ingredients');
      const instructionsTextarea = document.getElementById('instructions');

      modalTitle.textContent = "Edit Recipe";
      recipeIdInput.value = recipeId;
      recipeIdDisplay.textContent = recipeId; 
      recipeNameInput.value = recipe.name;
      ingredientsTextarea.value = recipe.ingredients;
      instructionsTextarea.value = recipe.instructions;

      // Show the modal
      const myModal = new bootstrap.Modal(document.getElementById('recipeModal'));
      myModal.show();
    })
    .catch(error => {
      console.error('Error fetching recipe details:', error);
      
    });
}
function loadAllRecipes(){
  document.getElementById('recipeCategoryTitle').textContent = 'All Recipes';
  const recipesContainer = document.querySelector('.card-body');

  
  // Make a GET request to fetch recipes for the user
  fetch(`http://localhost:3000/recipes`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      return response.json();
    })
    .then(data => {
      // Clear previous content
      recipesContainer.innerHTML = '';

      if (data && data.length > 0) {
        let rowContainer; // Container for rows
        data.forEach((recipe, index) => {
          // Create a new row container for every second recipe
          if (index % 2 === 0) {
            rowContainer = document.createElement('div');
            rowContainer.classList.add('row', 'mb-3');
            recipesContainer.appendChild(rowContainer);
          }
          const instructions = recipe.instructions.split(/\d+\./).filter(instruction => instruction.trim() !== '');
          const instructionList = instructions.map(instruction => `<li>${instruction.trim()}</li>`).join('');
          
          const recipeCard = `
            <div class="col" id="recipeCard-${recipe.recipe_id}">
              <div class="card">
                <div class="card-body">
                <h5 class="card-title">${recipe.name} Creator: <span style="color: blue;">${recipe.creator_name}</span></h5>
                <ul>${instructionList}</ul>
                  <button class="btn btn-info mr-2" onclick="addReview(${recipe.recipe_id})">Add Review</button>
                  <button class="btn btn-warning" onclick="viewreviews(${recipe.recipe_id})">View Reviews</button>
                </div>
              </div>
            </div>
          `;
          rowContainer.innerHTML += recipeCard;
        });
      } else {
        // No recipes found, display message
        recipesContainer.innerHTML = '<p>No recipes found </p>';
      }
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}

// Function to fetch and display recipes by userID
function loadRecipes() {
  document.getElementById('recipeCategoryTitle').textContent = 'My Recipes';
  const userId = localStorage.getItem('userID');
  const recipesContainer = document.querySelector('.card-body');

  // Make a GET request to fetch recipes for the user
  fetch(`http://localhost:3000/recipes/user/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      return response.json();
    })
    .then(data => {
      // Clear previous content
      recipesContainer.innerHTML = '';

      if (data && data.length > 0) {
        let rowContainer; // Container for rows
        data.forEach((recipe, index) => {
          // Create a new row container for every second recipe
          if (index % 2 === 0) {
            rowContainer = document.createElement('div');
            rowContainer.classList.add('row', 'mb-3');
            recipesContainer.appendChild(rowContainer);
          }
          const instructions = recipe.instructions.split(/\d+\./).filter(instruction => instruction.trim() !== '');
          const instructionList = instructions.map(instruction => `<li>${instruction.trim()}</li>`).join('');
          
          const recipeCard = `
            <div class="col" id="recipeCard-${recipe.recipe_id}">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${recipe.name}</h5>
                  <ul>${instructionList}</ul>
                  <button class="btn btn-success mr-2" onclick="editRecipe(${recipe.recipe_id})">Edit</button>
                  <button class="btn btn-danger" onclick="deleteRecipe(${recipe.recipe_id})">Delete</button>
                </div>
              </div>
            </div>
          `;
          rowContainer.innerHTML += recipeCard;
        });
      } else {
        // No recipes found, display message
        recipesContainer.innerHTML = '<p>No recipes found for this user.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}

function UpdateRecipe() {
  const recipeId = document.getElementById('recipeId').value;
  const name = document.getElementById('recipeName').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;
  
  const updatedRecipeData = { name, ingredients, instructions };

  fetch(`http://localhost:3000/recipes/update/${recipeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedRecipeData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = data.message;
    messageContainer.classList.add('show');
    $('#recipeModal').modal('hide');
    loadRecipes();

    // Hide the message after 2 seconds
    setTimeout(() => {
      messageContainer.classList.remove('show');
    }, 2000);
  })
  .catch(error => {
    console.error('Error updating recipe:', error);
    // Handle error scenario
    alert('Error updating recipe. Please try again.');
  });
}

function AddRecipe() {
  const recipeName = document.getElementById('add_recipeName').value;
  const ingredients = document.getElementById('add_ingredients').value;
  const instructions = document.getElementById('add_instructions').value;
  const userId = localStorage.getItem('userID'); 

  const recipeData = {
    name: recipeName,
    ingredients: ingredients,
    instructions: instructions,
    userID: userId
  };

  fetch('http://localhost:3000/recipes/add_new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipeData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }
    return response.json();
  })
  .then(data => {
    // Show success message
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = data.message;
    messageContainer.classList.add('show');

    // Hide the message after 2 seconds
    setTimeout(() => {
      messageContainer.classList.remove('show');
    }, 2000);

    // Optionally, reload recipes
    loadRecipes();

    // clear the form fields
    document.getElementById('add_recipeName').value = '';
    document.getElementById('add_ingredients').value = '';
    document.getElementById('add_instructions').value = '';

    // Close the modal
    $('#addrecipeModal').modal('hide');
  })
  .catch(error => {
    console.error('Error adding recipe:', error);
    // Handle error scenario
    alert('Error adding recipe. Please try again.');
  });
}

function searchRecipes() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const recipeTitles = document.querySelectorAll('.card-title');
  let found = false; // Flag to track if any search results are found

  recipeTitles.forEach(recipeTitle => {
    const recipeName = recipeTitle.textContent.toLowerCase();
    const recipeCard = recipeTitle.parentElement.parentElement.parentElement; // Get the recipe card element

    if (recipeName.includes(searchInput)) {
      recipeCard.style.display = ''; // Display the recipe card if the search query matches
      found = true; // Set flag to true if at least one search result is found
    } else {
      recipeCard.style.display = 'none'; // Hide the recipe card if the search query does not match
    }
  });

  // Display a message if no search results are found
  const noResultsMessage = document.getElementById('noResultsMessage');
  if (!found && searchInput.trim() !== '') {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }

  // Return to initial state when search input is cleared
  if (searchInput.trim() === '') {
    recipeTitles.forEach(recipeTitle => {
      const recipeCard = recipeTitle.parentElement.parentElement.parentElement;
      recipeCard.style.display = ''; // Display all recipe cards
    });
    noResultsMessage.style.display = 'none'; // Hide the no results message
  }
}



// Call loadRecipes function to initially load recipes
loadRecipes();
