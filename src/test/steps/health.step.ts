import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';

let response: any;

Given('the server is running', () => {
  // No specific action needed for this step
});

When('I make a GET request to {string}', async (endpoint: string) => {
  const url = `http://localhost:3000${endpoint}`; // Assuming your server is running on localhost:3000
  response = await axios.get(url);
});

Then('the response status should be {int}', (expectedStatus: number) => {
  //expect(response.status).to.equal(expectedStatus);
});

Then('the response should contain the text {string}', (expectedText: string) => {
  //expect(response.data).to.include(expectedText);
});
