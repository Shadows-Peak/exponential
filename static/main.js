

function fillCircle() {
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
        let height = 0;
        const interval = setInterval(() => {
            if (height >= 100) {
                clearInterval(interval);
            } else {
                height++;
                fillElement.style.height = height + '%';
            }
        }, 50); // Adjust the interval duration as needed
    }).catch(() => {
        console.error('Fill element not found');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fillCircle();
    /*
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
        .catch(error => console.error('Error fetching value:', error)); */


    document.getElementById('signUp').addEventListener('click', function () {
        document.body.innerHTML = `
            <h1>Sign Up</h1>
            <form id="signup-form">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required><br><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br><br>
                <button type="submit" id="submitbutton">Submit</button>
            </form>
        `;
    });
    document.getElementById('login').addEventListener('click', function () {
        document.body.innerHTML = `
            <h1>Login</h1>
            <form id="login-form">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required><br><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br><br>
                <button type="submit" id="submitbutton">Submit</button>
            </form>
        `;
    });
    document.getElementById('clickButton').addEventListener('click', function () {
        Points += ClickValue
        // Please :c
        // ;-;
        // :3 ill do anything
    });
    document.addEventListener('submit', function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        if ((form.getElementById('username') != 'Very-Secure-Username.gov') || (form.getElementById('password') != 'thosewhoknow')) {
            const popup = document.createElement('div');
            document.body.appendChild(popup);
            const popupTXT = document.createElement("h1");
            popupTXT.textContent = 'Incorrect username or password. Please try again.';
            popup.appendChild(popupTXT);
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.padding = '20px';
            popup.style.backgroundColor = 'white';
            popup.style.border = '1px solid black';
            popup.style.zIndex = '1000';

            setTimeout(() => {
                document.body.removeChild(popup);
            }, 3000);
        } else {
            alert("yippeee!!!");
        }

        if (form.id === 'signup-form') {
            console.log('Sign Up Form Data:', data);
            // Add your sign-up logic here
        } else if (form.id === 'login-form') {
            console.log('Login Form Data:', data);
            if (document.getElementById('username') === '') {
                if (document.getElementById('password' === '')) {
                    currentpage += 1
                }
            }
        }
    });
});
