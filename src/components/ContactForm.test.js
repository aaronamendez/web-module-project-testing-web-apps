import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

// the component renders the contact form component without errors.
test('renders without errors', () => {
	render(<ContactForm />);
});

// the header h1 element exists. Include three asserts, if the header is in the document, if the heads is truthy, if the header has the correct test content.
test('renders the contact form header', () => {
	render(<ContactForm />);

	const headerElement = screen.queryByText(/contact form/i);

	expect(headerElement).toBeInTheDocument();
	expect(headerElement).toBeTruthy();
	expect(headerElement).toHaveTextContent(/contact form/i);
});

// the component renders ONE error message if the user enters less than 4 characters into the firstname field. Make sure to use async / await and the correct screen method to account for state change.
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {});

// test('renders THREE error messages if user enters no values into any fields.', async () => {});

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {});

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {});

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {});

// test('renders all fields text when all fields are submitted.', async () => {});
