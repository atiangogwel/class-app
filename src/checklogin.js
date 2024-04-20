// Check if userID exists in local storage
const USERID = localStorage.getItem('userID');
const redirectToLogin = () => {
  window.location.href = 'login.html'; 
}

// Check if userID is null or empty
if (!USERID) {
  redirectToLogin(); 
}
