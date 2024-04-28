// Require the 'fetch' function from 'node-fetch'
const fetch = require('node-fetch').default;

// Define the URL you want to make the request to
const url = 'https://api.example.com/data';

// Make a GET request using node-fetch
fetch(url)
  .then(response => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Do something with the JSON data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });
