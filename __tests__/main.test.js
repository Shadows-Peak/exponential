// filepath: /__tests__/main.test.js
const { getByText, getByLabelText, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom/extend-expect');

document.body.innerHTML = `
    <button id="signUp">Sign Up</button>
    <button id="login">Login</button>
    <div id="content"></div>
`;

const main = require('./static/main.js'); // Adjust the path as needed

describe('User Interaction Tests', () => {
    test('Sign Up button click', async () => {
        // Wait for the DOM content to load
        await new Promise((resolve) => {
            document.addEventListener('DOMContentLoaded', resolve);
        });
        const signUpButton = getByText(document.body, 'Sign Up');
        fireEvent.click(signUpButton);

        expect(document.body).toHaveTextContent('Sign Up');
        expect(document.body).toHaveTextContent('Username:');
        expect(document.body).toHaveTextContent('Password:');
    });

    test('Login button click', () => {
        const loginButton = getByText(document.body, 'Login');
        fireEvent.click(loginButton);

        expect(document.body).toHaveTextContent('Login');
        expect(document.body).toHaveTextContent('Username:');
        expect(document.body).toHaveTextContent('Password:');
    });
});