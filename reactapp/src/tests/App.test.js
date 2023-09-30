import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegistrationForm from '../components/RegistrationForm';

describe('RegistrationForm Component', () => {
  it('renders RegistrationForm without crashing', () => {
    render(<RegistrationForm />);
  });

  it('displays validation errors for empty fields on submit', () => {
    const { getByText, getByTestId } = render(<RegistrationForm />);
    const submitButton = getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Check for validation error messages for required fields
    const usernameError = getByText('Username is required');
    const emailError = getByText('Email is required');
    const passwordError = getByText('Password is required');
    const confirmPasswordError = getByText('Confirm Password is required');

    expect(usernameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(confirmPasswordError).toBeInTheDocument();
  });

  it('displays validation error for invalid email', () => {
    const { getByTestId, getByLabelText, getByText } = render(<RegistrationForm />);
    const emailInput = getByLabelText('Email');
    const submitButton = getByTestId('submit-button');

    // Enter an invalid email address
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Check for validation error message for invalid email
    const emailError = getByText('Invalid email format');
    expect(emailError).toBeInTheDocument();
  });

  it('displays validation error if passwords do not match', () => {
    const { getByTestId, getByLabelText, getByText } = render(<RegistrationForm />);
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByTestId('submit-button');

    // Enter different passwords
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.click(submitButton);

    // Check for validation error message for password mismatch
    const passwordMismatchError = getByText('Passwords do not match');
    expect(passwordMismatchError).toBeInTheDocument();
  });

  it('submits the form with valid input', () => {
    const { getByTestId, getByLabelText, queryByText } = render(<RegistrationForm />);
    const usernameInput = getByLabelText('Username');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByTestId('submit-button');

    // Enter valid input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Check that validation errors are not displayed
    const validationErrors = queryByText(/is required|Invalid email format|Passwords do not match/);
    expect(validationErrors).toBeNull();
  });

  // Add more test cases for additional form validation or functionality as needed.
});
