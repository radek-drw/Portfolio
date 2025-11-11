import { handler } from '../src/sendContactForm.js';

const event = {
  body: JSON.stringify({
    name: 'John Doe',
    email: 'test@example.com',
    message: 'This is a test message',
  }),
};

try {
  const response = await handler(event);
  console.log('Status:', response.statusCode);
  console.log('Body:', JSON.parse(response.body));
} catch (error) {
  console.error('Error during test:', error);
}
