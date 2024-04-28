// Require the function that performs the HTTP request
const fetchData = require('../src/fetchData');

// Mock the Fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test data' }),
  })
);

describe('fetchData', () => {
  it('fetches data from the API', async () => {
    // Call the function that performs the HTTP request
    const data = await fetchData();

    // Check if the data returned matches the expected data
    expect(data).toEqual({ data: 'test data' });

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data');
  });

  it('handles errors gracefully', async () => {
    // Mock a failed response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    // Call the function that performs the HTTP request
    const error = await fetchData().catch(error => error);

    // Check if the error message matches the expected error
    expect(error.message).toEqual('Network response was not ok');
  });
});
