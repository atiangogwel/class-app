
// Function to handle registration
function handleRegister(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Send registration request
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      // Registration successful
      alert('Registration successful');

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    } else {
      // Handle registration error
      console.error('Registration failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
// event listeners
document.getElementById("registerForm").addEventListener("submit", handleRegister);
