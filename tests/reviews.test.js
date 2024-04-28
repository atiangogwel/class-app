// Import Jest and jest-fetch-mock
const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

// Import jsdom
const { JSDOM } = require('jsdom');

// Import the viewreviews function
const { viewreviews } = require('../src/reviews');

describe('viewreviews function', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    it('fetches and displays reviews correctly', async () => {
        // Define sample data for testing
        const recipeId = '1';
        const mockData = {
          reviews: [
            { Reviewer: 'John', review_text: 'Great recipe!' },
            { Reviewer: 'Alice', review_text: 'Amazing dish!' }
          ]
        };
      
        // Mock the fetch request
        fetchMock.mockResponseOnce(JSON.stringify(mockData));
      
        // Create a mock DOM environment
        const dom = new JSDOM(`
          <div id="reviewList"></div>
          <div id="viewReviewsModal">
            <div class="modal-body"></div>
          </div>
        `);
      
        // Set global variables for the mock DOM
        global.document = dom.window.document;
        global.window = dom.window;
      
        // Call the viewreviews function
        await viewreviews(recipeId);
      
        // Wait for microtasks to complete
        await new Promise(resolve => setTimeout(resolve));
      
        // Assertions
        expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/recipes/get_reviews/${recipeId}`);
        expect(document.querySelectorAll('.card').length).toBe(2); // Ensure two cards are rendered
        expect(document.querySelector('.card-title').textContent).toBe('By: John'); 
        expect(document.querySelector('.card-text').textContent).toBe('Great recipe!');
      });
      
  

  it('displays message for no reviews', async () => {
    // Define sample data for testing
    const recipeId = '1';
    const mockData = { reviews: [] };

    // Mock the fetch request
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Create a mock DOM environment
    const dom = new JSDOM(`
      <div id="reviewList"></div>
      <div id="viewReviewsModal">
        <div class="modal-body"></div>
      </div>
    `);

    // Set global variables for the mock DOM
    global.document = dom.window.document;
    global.window = dom.window;

    // Call the viewreviews function
    await viewreviews(recipeId);

    // Assertions
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/recipes/get_reviews/${recipeId}`);
    const errorMessage = document.querySelector('p');
    if (errorMessage) {
      expect(errorMessage.textContent).toBe('No reviews found for this recipe');
    }  });

  it('handles fetch error', async () => {
    // Define sample data for testing
    const recipeId = '1';

    // Mock a failed fetch request
    fetchMock.mockRejectOnce(new Error('Failed to fetch reviews'));

    // Create a mock DOM environment
    const dom = new JSDOM(`
      <div id="reviewList"></div>
      <div id="viewReviewsModal">
        <div class="modal-body"></div>
      </div>
    `);

    // Set global variables for the mock DOM
    global.document = dom.window.document;
    global.window = dom.window;

    // Call the viewreviews function
    await viewreviews(recipeId);

    // Assertions
    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/recipes/get_reviews/${recipeId}`);
    const errorMessage = document.querySelector('p');
    if (errorMessage) {
      expect(errorMessage.textContent).toBe('No reviews found for this recipe');
    }
  });
});
