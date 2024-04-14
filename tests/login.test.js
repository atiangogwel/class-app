const handleLogin = require('../public/login');

describe('handleLogin function', () => {
  test('successful login', async () => {
    // Mock FormData
    global.FormData = jest.fn(() => ({
      forEach: jest.fn()
    }));

    // Mock fetch
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'mockToken' })
    }));

    // Mock localStorage
    global.localStorage = {
      setItem: jest.fn()
    };

 
    delete window.location;
    window.location = { href: '' };

    // Mock parseJwt
    const mockParseJwt = jest.fn().mockReturnValue({ first_name: 'John', last_name: 'Doe' });
    global.parseJwt = mockParseJwt;

    // Mock event object
    const event = { preventDefault: jest.fn() };

    // Call the function
    await handleLogin.call({ preventDefault: jest.fn() }, event);

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    expect(global.localStorage.setItem).toHaveBeenCalledWith('last_name', 'Doe');
    expect(global.localStorage.setItem).toHaveBeenCalledWith('first_name', 'John');
    expect(window.location.href).toBe('home.html');
  });

  test('login failure', async () => {
    // Mock FormData
    global.FormData = jest.fn(() => ({
      forEach: jest.fn()
    }));

    // Mock fetch
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid credentials' })
    }));

    // Mock displayErrorMessage
    const mockDisplayErrorMessage = jest.fn();
    global.displayErrorMessage = mockDisplayErrorMessage;

    // Mock event object
    const event = { preventDefault: jest.fn() };

    // Call the function
    await handleLogin.call({ preventDefault: jest.fn() }, event);

    // Assertions
    expect(mockDisplayErrorMessage).toHaveBeenCalledWith('Invalid credentials');
  });

  test('error handling', async () => {
    // Mock FormData
    global.FormData = jest.fn(() => ({
      forEach: jest.fn()
    }));

    // Mock fetch to simulate network error
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    // Mock console.error
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock event object
    const event = { preventDefault: jest.fn() };

    // Call the function
    await handleLogin.call({ preventDefault: jest.fn() }, event);
    expect(mockConsoleError).toHaveBeenCalledWith('Error:', new Error('Network error'));
    mockConsoleError.mockRestore();
  });
});
