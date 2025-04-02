/*import { Points, ClickValue, currentpage } from './variables.js';
import { GameTick } from './visuals.js';*/

//import bcrypt from 'bcrypt';

function fillCircle(value) {
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

function signUpRun() {
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
function backButtonRun() {
    menuLoad();
}
function loginRun() {
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
    const posts = await loadPosts(); // This should not be here, but it is for testing purposes
    console.log('Posts:', JSON.stringify(posts, undefined, 2)); // ditto for this line

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
}

function menuLoad() {
    // HTML Load
    fetch('./templates/menu.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;

        // Event Listeners

        try{
            document.getElementById('signUp').removeEventListener('click',signUpRun);
            document.getElementById('login').removeEventListener('click',loginRun);
            document.getElementById('backButton').removeEventListener('click',backButtonRun);
            document.removeEventListener('submit',submitRun);
        } catch(error) {
            console.log("No event listeners to remove")
        }

        document.getElementById('signUp').addEventListener('click', signUpRun);
        document.getElementById('login').addEventListener('click', loginRun);
        document.addEventListener('submit', submitRun);
    })
    .catch(error => alert(error));
    //.catch(error => console.error('Error loading menu.html:', error));
}

function gameLoad() {
    // HTML Load
    fetch('./templates/game.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;

        setInterval(GameTick, 10);

        // Event Listeners
        document.getElementById('logoutButton').addEventListener('click', function () {
            menuLoad();
        });

        function clickButton() {
            if (HarvestPoints + ResourcesPerHarvest < HarvestPointsNeeded) {
                HarvestPoints += ResourcesPerHarvest
            } else if (HarvestPoints < HarvestPointsNeeded) {
                HarvestPoints = HarvestPointsNeeded;
            }
            fillCircle(HarvestPoints);
        }

        function clickTicTacToe() {
            const ticTacToePopup = document.getElementById('TicTacToePopup');
            if (ticTacToePopup) {
                ticTacToePopup.style.display = 'block';
        
                const cells = document.querySelectorAll('#TicTacToeBoard .cell');
                let currentPlayer = 'X';
        
                // Clear the board
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.addEventListener('click', handleCellClick);
                });
        
                // Close button functionality
                const closeButton = document.getElementById('closeTicTacToePopup');
                function closePopup() {
                    ticTacToePopup.style.display = 'none';
        
                    // Remove event listeners from cells
                    cells.forEach(cell => {
                        cell.removeEventListener('click', handleCellClick);
                    });
        
                    // Remove the close button event listener
                    closeButton.removeEventListener('click', closePopup);
                }
                closeButton.addEventListener('click', closePopup);
        
                function handleCellClick() {
                    if (shipmentsQueued+1 > maxQueueableShipments) {
                        alert('You have reached the maximum number of queued shipments. Please export some shipments before playing.');
                        closePopup();
                    }
                    if (this.textContent === '') {
                        this.textContent = currentPlayer;
                        this.style.color = currentPlayer === 'X' ? 'blue' : 'red';
        
                        if (checkWin(currentPlayer)) {
                            alert(`${currentPlayer} wins!`);
                            if (shipmentsQueued < maxQueueableShipments) {
                                queuedResources -= 1;
                                shipmentsQueued++;
                            }
                            resetBoard(cells);
                            if (queuedResources < 1) {
                                closePopup();
                            }
                            if (shipmentsQueued+1 > maxQueueableShipments) {
                                closePopup();
                                alert(shipmentsQueued);
                                alert('Playing further would take you over your maximum capacity of queueable shipments. Please export some shipments before playing.');
                            }
                        } else if (Array.from(cells).every(cell => cell.textContent !== '')) {
                            alert('It\'s a draw!');
                            resetBoard(cells);
                        } else {
                            currentPlayer = 'O';
                            const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
                            if (emptyCells.length > 0) {
                                const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                                randomCell.textContent = 'O';
                                randomCell.style.color = 'red';

                                if (checkWin('O')) {
                                    alert('O wins!');
                                    resetBoard(cells);
                                } else if (Array.from(cells).every(cell => cell.textContent !== '')) {
                                    alert('It\'s a draw!');
                                    resetBoard(cells);
                                }
                            }
                            currentPlayer = 'X';
                        }
                    }
                }
            }
        }
        function checkWin(player) {
            const cells = document.querySelectorAll('#TicTacToeBoard .cell');
            const winningCombinations = [
                [0, 1, 2], // Top row
                [3, 4, 5], // Middle row
                [6, 7, 8], // Bottom row
                [0, 3, 6], // Left column
                [1, 4, 7], // Middle column
                [2, 5, 8], // Right column
                [0, 4, 8], // Diagonal top-left to bottom-right
                [2, 4, 6]  // Diagonal top-right to bottom-left
            ];
        
            return winningCombinations.some(combination => {
                return combination.every(index => cells[index].textContent === player);
            });
        }
        function resetBoard(cells) {
            cells.forEach(cell => {
                cell.textContent = '';
            });
        }

        let waitingPackages = []; // Array to store packages waiting to move in

        function animatePackageToShippingStation(toPackage) {
            const processUnit = document.getElementById('processUnit');
            const shippingStation = document.getElementById('ShippingStation');
        
            const processUnitRect = processUnit.getBoundingClientRect();
            const shippingStationRect = shippingStation.getBoundingClientRect();
        
            const packageElement = document.createElement('div');
            packageElement.className = 'floatingPackage';
            document.body.appendChild(packageElement);
        
            packageElement.style.position = 'absolute';
            packageElement.style.left = `${processUnitRect.left + processUnitRect.width / 2}px`;
            packageElement.style.top = `${processUnitRect.top + processUnitRect.height / 2}px`;
            packageElement.style.width = '20px';
            packageElement.style.height = '20px';
            packageElement.style.backgroundColor = '#ffcc00';
            packageElement.style.borderRadius = '50%';
            packageElement.style.zIndex = '1';
        
            // Check if shipmentsLoaded is at max capacity
            if (shipmentsLoaded >= maxShipments) {
                // Stop the package short and line it up
                const waitingPosition = {
                    left: `${shippingStationRect.left + shippingStationRect.width / 2}px`,
                    top: `${shippingStationRect.top - 30 - waitingPackages.length * 25}px` // Stack packages vertically
                };
            
                packageElement.style.left = waitingPosition.left;
                packageElement.style.top = waitingPosition.top;
            
                waitingPackages.push(packageElement); // Add to waiting queue
            } else {
                // Animate the package to the shipping station
                const animation = packageElement.animate([
                    { left: `${processUnitRect.left + processUnitRect.width / 2}px`, top: `${processUnitRect.top + processUnitRect.height / 2}px` },
                    { left: `${shippingStationRect.left + shippingStationRect.width / 2}px`, top: `${shippingStationRect.top + shippingStationRect.height / 2}px` }
                ], {
                    duration: 1000,
                    easing: 'ease'
                });
            
                animation.onfinish = function () {
                    document.body.removeChild(packageElement);
                    shipmentsLoaded += toPackage;
                    document.getElementById('shipmentsCounter').textContent = `Shipments Loaded: ${shipmentsLoaded}/${maxShipments}`;
                    processWaitingPackages(toPackage); // Check if waiting packages can move in
                };
            }
        }

        function processWaitingPackages(toPackage) {
            while (waitingPackages.length > 0 && shipmentsLoaded < maxShipments) {
                const packageElement = waitingPackages.shift(); // Get the first waiting package
                
                const shippingStation = document.getElementById('ShippingStation');
                const shippingStationRect = shippingStation.getBoundingClientRect();
            
                // Animate the package to the shipping station
                const animation = packageElement.animate([
                    { left: packageElement.style.left, top: packageElement.style.top },
                    { left: `${shippingStationRect.left + shippingStationRect.width / 2}px`, top: `${shippingStationRect.top + shippingStationRect.height / 2}px` }
                ], {
                    duration: 1000,
                    easing: 'ease'
                });
            
                animation.onfinish = function () {
                    document.body.removeChild(packageElement);
                    shipmentsLoaded += toPackage;
                    document.getElementById('shipmentsCounter').textContent = `Shipments Loaded: ${shipmentsLoaded}/${maxShipments}`;
                };
            }
        }
        function clickExportShipment() {
            if (shipmentsLoaded > 0) {
                DilyanPoints += shipmentsLoaded;
                shipmentsLoaded = 0;
            }
        }

        document.getElementById('clickableCircle').addEventListener('click', clickButton);
        document.getElementById('TicTacToeSelect').addEventListener('click', function() {
            if (queuedResources >= 1) {
                clickTicTacToe();
            } else if (queuedResources+1 > maxQueueableResources) {
                alert('Playing Tic-Tac-Toe would take you over your maximum capacity of queueable resources. Please export some shipments or find a game that processes less resources.');
            } else {
                alert('You need at least 1 queued resource to play Tic-Tac-Toe!');
            }
        });
        document.getElementById('exportShipmentButton').addEventListener('click', clickExportShipment);

        document.getElementById('clickButton').addEventListener('click', function () {
            if (HarvestPoints == HarvestPointsNeeded && queuedResources+HarvestClickValue <= maxQueueableResources) {
                HarvestPoints = 0;
                fillCircle(HarvestPoints);
                const circle = document.querySelector('.circle');
                const circleRect = circle.getBoundingClientRect();

                const transferCell = document.createElement('div');
                transferCell.className = 'transferCell';
                document.body.appendChild(transferCell);

                transferCell.style.position = 'absolute';
                transferCell.style.left = `${circleRect.left + circleRect.width / 2}px`;
                transferCell.style.top = `${circleRect.top + circleRect.height / 2}px`;
                transferCell.style.width = '20px';
                transferCell.style.height = '20px';
                transferCell.style.backgroundColor = '#dcb773';
                transferCell.style.borderRadius = '50%';
                transferCell.style.zIndex = '1';

                const animation = transferCell.animate([
                    { left: `${circleRect.left + circleRect.width / 2}px`, top: `${circleRect.top + circleRect.height / 2}px` },
                    { left: '70%', top: '60%' }
                ], {
                    duration: 1000,
                    easing: 'ease'
                });

                animation.onfinish = function() {
                    console.log('Animation finished');
                    document.body.removeChild(transferCell);
                    queuedResources += HarvestClickValue;
                };
            }
        });

        document.getElementById('packageShipmentsButton').addEventListener('click', function () {
            if (shipmentsQueued > 0 && shipmentsLoaded < maxShipments) {
                if (shipmentsQueued + shipmentsLoaded > maxShipments) {
                    // If adding the queued shipments would exceed the max, only package the difference
                    let shipmentsToPackage = maxShipments - shipmentsLoaded;
                    // Ensure we don't package more than we have queued
                    if (shipmentsToPackage > shipmentsQueued) {
                        shipmentsToPackage = shipmentsQueued;
                    }
                    // This ensures we don't package more than we have queued
                    shipmentsQueued -= shipmentsToPackage;
                    // Animate the package to the shipping station
                    animatePackageToShippingStation(shipmentsToPackage);
                    return; // Exit the function after packaging the difference
                }
                let shipmentsToPackage = shipmentsQueued;
                shipmentsQueued = 0;
                animatePackageToShippingStation(shipmentsToPackage);
            } else if (shipmentsQueued < 0 && shipmentsLoaded < maxShipments) {
                alert('You have no shipments queued! Please queue some shipments before packaging.');
            } else if (shipmentsLoaded >= maxShipments) {
                alert('Maximum shipments loaded! Please export shipments before packaging more.');
                if (shipmentsQueued + shipmentsLoaded > maxShipments) {
                    // If adding the queued shipments would exceed the max, only package the difference
                    let shipmentsToPackage = maxShipments - shipmentsLoaded;
                    // Ensure we don't package more than we have queued
                    if (shipmentsToPackage > shipmentsQueued) {
                        shipmentsToPackage = shipmentsQueued;
                    }
                    // This ensures we don't package more than we have queued
                    shipmentsQueued -= shipmentsToPackage;
                    // Animate the package to the shipping station
                    animatePackageToShippingStation(shipmentsToPackage);
                    return; // Exit the function after packaging the difference
                }
                let shipmentsToPackage = shipmentsQueued;
                shipmentsQueued = 0;
                animatePackageToShippingStation(shipmentsToPackage);
            }
        });
    })
    .catch(error => console.error('Error loading game.html:', error));
}

document.addEventListener('DOMContentLoaded', function () {
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
function forumLoad() {
    // HTML Load
    fetch('./templates/form.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;

        // Continuously run loadPosts
        setInterval(renderPosts, 5000); // Adjust the interval as needed
    })
    .catch(error => console.error('Error loading forum.html:', error));
}
