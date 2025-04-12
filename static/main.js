document.addEventListener('DOMContentLoaded', function () {
menuLoad();
});
async function fillCircle(value) {
    const waitForElement = (selector) => {
        return new Promise((resolve) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver((mutations, me) => {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                    me.disconnect();
                }
            });

            observer.observe(document, {
                childList: true,
                subtree: true
            });
        });
    };

    waitForElement('.fill').then((fillElement) => {
        //let height = 0;
        /* Automated filling of circle
        const interval = setInterval(() => {
            if (height >= 100) {
                clearInterval(interval);
            } else {
                height++;
                fillElement.style.height = height + '%';
            }
        }, 50); // Adjust the interval duration as needed*/
        fillElement.style.height = value*(100/HarvestPointsNeeded) + '%';
    }).catch(() => {
        console.error('Fill element not found');
    });
}

async function signUpRun() {
    document.body.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signup-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit" id="submitbutton">Submit</button>
            <button type="button" id="backButton">Back</button>
        </form>
    `;
    document.getElementById('backButton').addEventListener('click', backButtonRun);
}
async function backButtonRun() {
    menuLoad();
}
async function loginRun() {
    document.body.innerHTML = `
        <h1>Login</h1>
        <form id="login-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit" id="submitbutton">Submit</button>
            <button type="button" id="backButton">Back</button>
        </form>
    `;
    document.getElementById('backButton').addEventListener('click', backButtonRun);
    
}
async function submitRun(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data.username, await hashPassword(data.password));
    localStorage.setItem('username', data.username);
    localStorage.setItem('password', data.password);
    

    if (form.id === 'signup-form') {
        console.log('Sign Up Form Data:', JSON.stringify(data, undefined, 2));
        try {
            const userRecord = await getUserByUsername(data.username);
            data.password = await hashPassword(data.password);
            if (userRecord) {
                alert('Error: Username already exists.');
            } else {
                const response = await signUp(data.username, data.password);
                if (response) {
                    if (localStorage.getItem('made_account') === 'true') {
                        alert('You have already made an account, please log in.');
                    } else {
                        alert('Sign Up Successful (we dont store passwords in plaintext, if you forget your password, make a new account (or pay me like 5 bucks and I will reset it for you))');
                        localStorage.setItem('made_account', 'true');
                        gameLoad();
                    }
                } else {
                    alert('Sign Up Failed');
                }
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('Sign Up Failed');
        }
    } else if (form.id === 'login-form') {
        console.log('Login Form Data:', JSON.stringify(data, undefined, 2));
        try {  
            const userRecord = await getUserByUsername(data.username);
            if (userRecord) {
                const enteredPasswordHash = await hashPassword(data.password); // Ensure hashPassword is defined
                console.log('Entered Hash:', enteredPasswordHash);
                console.log('Stored Hash:', userRecord.fields.password);

                if (enteredPasswordHash === userRecord.fields.password) {
                    alert('Login Successful');
                    localStorage.setItem('logged_in', 'true');
                    gameLoad();
                } else {
                    alert('Incorrect password. Login failed.');
                    console.error('Incorrect password for user:', userRecord.fields.username);
                }
            } else {
                alert('Error: User not found.');
                console.error('Login failed: User not found.');
                
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login Failed');
        }
    }
menuLoad();
}