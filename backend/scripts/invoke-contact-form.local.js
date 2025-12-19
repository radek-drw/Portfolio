import { handler } from '../src/contact-form.js';

const event = {
  body: JSON.stringify({
    name: 'Radek',
    email: 'test@example.com',
    message: 'Hello from local test!',
  }),
};

try {
  const response = await handler(event);
  console.log('Status:', response.statusCode);
  console.log('Body:', JSON.parse(response.body));
} catch (error) {
  console.error('Error during test:', error);
}
