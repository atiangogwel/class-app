function updateUserDetails() {
  // Retrieve user ID from local storage
  const userId = localStorage.getItem('userID');

  // Retrieve updated user details from the form
  const lastName = document.getElementById('lastName').value;
  const firstName = document.getElementById('firstName').value;
  const email = document.getElementById('email').value;
  const newPassword = document.getElementById('newPassword').value;

  // Construct the updated user data object
  const updatedUserData = {
    last_name: lastName,
    first_name: firstName,
    email: email,
    password: newPassword 
  };

  // Make an AJAX request to update the user details
  fetch(`http://localhost:3000/users/update/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUserData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update user details');
    }
    return response.json();
  })
  .then(data => {
    // Handle successful update
    console.log('User details updated successfully:', data);
    // Display success message
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = data.message;
    messageContainer.classList.add('show');

    setTimeout(() => {
      messageContainer.classList.remove('show');
      // Redirect to login page
      window.location.href = 'login.html';
    }, 3000);
  })
  .catch(error => {
    // Handle error
    console.error('Error updating user details:', error);
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = error.message; 
    messageContainer.classList.add('show');

    setTimeout(() => {
      messageContainer.classList.remove('show');
    }, 3000);
  });
}

module.exports = { updateUserDetails };
