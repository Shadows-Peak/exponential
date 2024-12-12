

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

function menuLoad() {
    // HTML Load
    fetch('./templates/menu.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;
    })
    .catch(error => console.error('Error loading menu.html:', error));
    /*document.body.innerHTML = `
        <div id="left"></div>
        <div id="right"></div>
        <div id="top"></div>
        <div id="bottom"></div>
        <h1>Dilyan Lopez Exponential</h1>
        <hr>
        <button data-room-id=0 id="signUp"> Sign Up</button>
        <button data-room-id=0 id="login">Login</button>
        <div data-room-id=0 id="value-container">Loading...</div>
        <div data-room-id=2 class="circle">
            <div class="fill"></div>
        </div>
        <p>Kai: Everything is moved into the logged in page in terms of game functionality. The html now needs to be loaded in code as well, but I will likely add separate html files with empty everything but body so we can just edit those and then yoink the data in them from js so we don't have to write it all in js anyways im yapping and its only 12.</P>
        <h1 id="version" >login 1.4 </h1>
        <script type="text/javascript" src="./static/database.js"></script>
        <script type="text/javascript" src="./static/variables.js"></script>
        <script type="text/javascript" src="./static/framework/numberFramework.js"></script>
        <script type="text/javascript" src="./static/main.js"></script>
        <script type="text/javascript" src="./static/visuals.js"></script>
    `;*/

    // Event Listeners
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
                <button id="backButton">Back</button>
            </form>
        `;

        document.getElementById('backButton').addEventListener('click', function () {
            menuLoad();
        });
    });
    document.addEventListener('submit', function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        if ((data['username'] != 'Very-Secure-Username.gov') || (data['password'] != 'thosewhoknow')) {
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
            return;
        } else {
            alert("yippeee!!!");
        }

        if (form.id === 'signup-form') {
            console.log('Sign Up Form Data:', data);
            // Add your sign-up logic here
        } else if (form.id === 'login-form') {
            console.log('Login Form Data:', data);

            // Load game
            gameLoad();

            if (document.getElementById('username') === '') {
                if (document.getElementById('password' === '')) {
                    currentpage += 1
                }
            }
        }
    });
}
function gameLoad() {
    // HTML Load
    document.body.innerHTML = `
        <h1>This is a test logged in page</h1>
        <p>Username: ${data.username}</p>
        <p>Password: ${data.password}</p>
        <p>Random vars to test</p>
        <button data-room-id=2 id="clickButton"> Click Here </button>
        <h1 data-room-id=2 id="points"> You have XYZ Points </h1>
        <script type="text/javascript" src="./static/database.js"></script>
        <script type="text/javascript" src="./static/variables.js"></script>
        <script type="text/javascript" src="./static/framework/numberFramework.js"></script>
        <script type="text/javascript" src="./static/main.js"></script>
        <script type="text/javascript" src="./static/visuals.js"></script>
    `;

    // Event Listeners
    document.getElementById('clickButton').addEventListener('click', function () {
        Points += ClickValue
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fillCircle();
    menuLoad();
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
});