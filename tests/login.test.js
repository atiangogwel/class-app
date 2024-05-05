const { handleLogin } = require('../src/login');

// Mocking the fetch API
global.fetch = jest.fn();

describe('handleLogin function', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should login successfully and redirect to home page', async () => {
    // Mock successful response from the server
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'mockToken',
        userID: 'mockUserID', 
        first_name: 'mockFirstName', 
        last_name: 'mockLastName' 
      })
    });

    // Mock form data
    document.body.innerHTML = `
      <form id="loginForm">
        <input type="text" name="username" value="testuser">
        <input type="password" name="password" value="testpassword">
        <button type="submit">Submit</button>
      </form>
    `;

    // Trigger the form submission
    const form = document.getElementById('loginForm');
    await handleLogin.call(form, { preventDefault: jest.fn() });

    // Check if localStorage is updated with the correct values
    expect(localStorage.getItem('userID')).toEqual('mockUserID');
    expect(localStorage.getItem('first_name')).toEqual('mockFirstName');
    expect(localStorage.getItem('last_name')).toEqual('mockLastName');

    // Check if redirection happens
    expect(window.location.href).toBe('home.html');
  });

  test('should display error message on login failure', async () => {
    // Mock error response from the server
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: 'Invalid credentials'
      })
    });

    // Mock form data
    document.body.innerHTML = `
      <form id="loginForm">
        <input type="text" name="username" value="testuser">
        <input type="password" name="password" value="testpassword">
        <button type="submit">Submit</button>
      </form>
    `;

    document.body.innerHTML += '<div id="errorMessage"></div>';
    const form = document.getElementById('loginForm');
    await handleLogin.call(form, { preventDefault: jest.fn() });
    expect(document.getElementById('errorMessage').textContent).toBe('Invalid credentials');
  });
});
