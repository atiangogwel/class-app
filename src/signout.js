// Function to handle logout
function handleLogout(event) {
    event.preventDefault(); 
  
    fetch('http://localhost:3000/logout', {
      method: 'GET',
      credentials: 'include' 
    })
    .then(response => {
      if (response.ok) {
        console.log('Logout successful');
        window.location.href = 'login.html';
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  document.getElementById('logoutButton').addEventListener('click', handleLogout);
