// Add an event listener to the logout button
document.addEventListener("DOMContentLoaded", function() {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }
});

// Function to handle logout
async function handleLogout(event) {
  event.preventDefault();

  try {
    // Send logout request
    const response = await fetch('http://localhost:3000/logout', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      // Clear local storage upon successful logout
      localStorage.removeItem('token');
      localStorage.removeItem('last_name');
      localStorage.removeItem('first_name');
      localStorage.removeItem('userID');
      
      window.location.href = 'login.html'; 
    } else {
      // Handle logout error
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Logout failed';
      console.error('Logout failed:', errorMessage);
      // Display error message to the user
      alert(errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error logging out');
  }
}