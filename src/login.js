// Function to handle login
async function handleLogin(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    // Send login request
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // If login is successful, extract JWT token from response
      const responseData = await response.json();
      const tokenPayload = parseJwt(responseData.token);
      const lastName = tokenPayload.last_name;
      const firstName = tokenPayload.first_name;
      const userID = tokenPayload.userID;

      localStorage.setItem('last_name', lastName);
      localStorage.setItem('first_name', firstName);
      localStorage.setItem('userID', userID);

      window.location.href = 'home.html';
    } else {
      // Handle login error
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Login failed';
      displayErrorMessage(errorMessage);
    }
  } catch (error) {
    displayErrorMessage('An error occurred while processing your request. Please try again.');

  }
}

// Helper function to parse JWT token
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

// Display error messages
function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById('errorMessage');
  if (errorMessageElement !== null) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
  }
}

// Programmatically attach event listener to the form
document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", handleLogin);
});
module.exports = { handleLogin}