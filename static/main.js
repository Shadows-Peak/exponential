document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    fetch('/get_value')
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            document.getElementById('value-container').innerText = data.value;
        })
        .catch(error => console.error('Error fetching value:', error));
});
document.getElementById('signUp').addEventListener('click', function() {
    document.body.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signup-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit">Submit</button>
        </form>
    `;
});

document.getElementById('login').addEventListener('click', function() {
    document.body.innerHTML = `
        <h1>Login</h1>
        <form id="login-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit">Submit</button>
        </form>
    `;
});

document.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (form.id === 'signup-form') {
        console.log('Sign Up Form Data:', data);
        // Add your sign-up logic here
    } else if (form.id === 'login-form') {
        console.log('Login Form Data:', data);
        // Add your login logic here
    }
});