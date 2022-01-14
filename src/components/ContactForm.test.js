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
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
	render(<ContactForm />);

	const firstNameField = screen.getByLabelText(/First Name*/i);
	userEvent.type(firstNameField, '123');

	const errorMessages = await screen.findAllByTestId('error');
	expect(errorMessages).toHaveLength(1);
});

// the component renders THREE error messages if the user submits without filling in any values.
test('renders THREE error messages if user enters no values into any fields.', async () => {
	render(<ContactForm />);

	const submitButton = screen.getByRole('button');
	userEvent.click(submitButton);

	await waitFor(() => {
		const errorMessages = screen.queryAllByTestId('error');
		expect(errorMessages).toHaveLength(3);
	});
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
	render(<ContactForm />);
	const firstNameField = screen.getByLabelText(/first name*/i);
	userEvent.type(firstNameField, 'elon');
	const lastNameField = screen.getByLabelText(/last name*/i);
	userEvent.type(lastNameField, 'musk');

	const button = screen.getByRole('button');
	userEvent.click(button);

	waitFor(() => {
		const errorMessages = screen.getAllByTestId('error');
		expect(errorMessages).toHaveLength(1);
	});
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);
	const emailField = screen.getByLabelText(/email*/i);
	userEvent.type(emailField, 'aaron@gmail');

	waitFor(() => {
		const errorMessage = screen.findByText(
			/email must be a valid email address/i
		);
		expect(errorMessage).toBeInTheDocument();
	});
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
	render(<ContactForm />);
	const button = screen.getByRole('button');
	userEvent.click(button);

	const errorMessage = await screen.findByText(/lastName is a required field/i);
	expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
	render(<ContactForm />);

	const firstName = screen.getByLabelText(/first name*/i);
	const lastName = screen.getByLabelText(/last name*/i);
	const email = screen.getByLabelText(/email*/i);

	userEvent.type(firstName, 'elon');
	userEvent.type(lastName, 'musk');
	userEvent.type(email, 'elon@spacex.com');

	const button = screen.getByRole('button');
	userEvent.click(button);

	waitFor(() => {
		const firstNameDisplay = screen.queryByText('elon');
		const lastNameDisplay = screen.queryByText('musk');
		const emailDisplay = screen.queryByText('elon@spacex.com');
		const messageDisplay = screen.queryByTestId('messageDisplay');

		expect(firstNameDisplay).toBeInTheDocument();
		expect(lastNameDisplay).toBeInTheDocument();
		expect(emailDisplay).toBeInTheDocument();
		expect(messageDisplay).toBeInTheDocument();
	});
});

test('renders all fields text when all fields are submitted.', async () => {
	render(<ContactForm />);

	const firstName = screen.getByLabelText(/first name*/i);
	const lastName = screen.getByLabelText(/last name*/i);
	const email = screen.getByLabelText(/email*/i);
	const messageField = screen.getByLabelText(/message/i);

	userEvent.type(firstName, 'elon');
	userEvent.type(lastName, 'musk');
	userEvent.type(email, 'elon@spacex.com');
	userEvent.type(messageField, 'Message Text');

	const button = screen.getByRole('button');
	userEvent.click(button);

	waitFor(() => {
		const firstNameDisplay = screen.queryByText(/elon/i);
		const lastNameDisplay = screen.queryByText(/musk/i);
		const emailDisplay = screen.queryByText(/elon@spacex.com/i);
		const messageDisplay = screen.queryByTestId(/message text/i);

		expect(firstNameDisplay).toBeInTheDocument();
		expect(lastNameDisplay).toBeInTheDocument();
		expect(emailDisplay).toBeInTheDocument();
		expect(messageDisplay).toBeInTheDocument();
	});
});
