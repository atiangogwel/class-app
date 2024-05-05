const { updateUserDetails } = require('../src/settings');

describe('updateUserDetails', () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
  };
  global.localStorage = localStorageMock;

  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'User details updated successfully' }),
    })
  );

  // Mock DOM elements
  document.body.innerHTML = `
    <input id="lastName" value="Doe">
    <input id="firstName" value="John">
    <input id="email" value="john@example.com">
    <input id="newPassword" value="newPassword123">
    <div id="messageContainer"></div>
  `;

  test('updates user details successfully', async () => {
    // Mock localStorage.getItem() to return a userId
    localStorageMock.getItem.mockReturnValue('13');
    console.log(localStorage.getItem('userID'));
  
    // Delay test execution to allow time for asynchronous operations
    setTimeout(async () => {
      await updateUserDetails();
  
      // Assertions
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/users/update/13', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastName: 'Doe',
          firstName: 'John',
          email: 'john@example.com',
          password: 'newPassword123',
        }),
      });
  
      // Wait for the message to be displayed
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Assert that success message is displayed
      const messageContainer = document.getElementById('messageContainer');
      expect(messageContainer.textContent).toBe('User details updated successfully');
      expect(messageContainer.classList.contains('show')).toBe(true);
    }, 100);
  });
  

  // Test error handling
  test('handles error when updating user details fails', async () => {
    // Mock localStorage.getItem() to return a userId
    localStorageMock.getItem.mockReturnValue('123456');
  
    // Mock fetch to simulate a failed request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
        statusText: 'Internal Server Error',
      })
    );
  
    // Delay test execution to allow time for asynchronous operations
    setTimeout(async () => {
      await updateUserDetails();
  
      // Wait for the message to be displayed
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Assert that error message is displayed
      const messageContainer = document.getElementById('messageContainer');
      expect(messageContainer.textContent).toBe('Failed to update user details');
      expect(messageContainer.classList.contains('show')).toBe(true);
    }, 100); 
  });
  
});
