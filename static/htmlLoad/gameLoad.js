function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function gameLoad() {
    // HTML Load
    fetch('./templates/game.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;

        setInterval(GameTick, 10);

        // Event Listeners
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', function () {
                menuLoad();
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('logged_in');
                localStorage.removeItem('first_load');
            });
        } else {
            console.warn('logoutButton element not found.');
        }
        document.getElementById('forumButton').addEventListener('click', function () {
            const forumButton = document.getElementById('forumButton');
            if (forumButton) {
                forumButton.addEventListener('click', async function () {
                    await forumLoad();
                });
            } else {
                console.warn('forumButton element not found.');
            }});

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

        willFillorIsFull = false;
        pendingToAdd = 0;
        activelyChecking = false;
        goingToBeFulfilled = 0;

        async function animatePackageToShippingStation(toPackage) {
            const processUnit = document.getElementById('processUnit');
            const shippingStation = document.getElementById('ShippingStation');
        
            const processUnitRect = processUnit.getBoundingClientRect();
            const shippingStationRect = shippingStation.getBoundingClientRect();
        
            var localIndex = 0;

            if (toPackage == false) {
                if (waitingPackages.length == 0) {
                    return;
                }
                if (shipmentsLoaded >= maxShipments) {
                    // If shipmentsLoaded is at max capacity, we need to wait for the packages to be processed
                    return;
                } else if (activelyChecking == false) {
                    console.log('Running it again');
                    activelyChecking = true;
                    for (let index = 0; index < waitingPackages.length; index++) {
                        const { element: packageElement, value: packageValue } = waitingPackages[index];
                        const curWaiting = waitingPackages.length;
        
                        const x1 = shippingStationRect.right + 30;
                        const y1 = shippingStationRect.top + (shippingStationRect.bottom-shippingStationRect.top) / 2;
                        const x2 = processUnitRect.left - 30;
                        const y2 = processUnitRect.top + (processUnitRect.bottom-processUnitRect.top) / 2;
                        
                        const dx = (x2 - x1) / (maxWaitingShipments - 1);
                        const dy = (y2 - y1) / (maxWaitingShipments - 1);
                        if (shipmentsLoaded + packageValue > maxShipments || willFillorIsFull) {
                            // Calculate the diagonal position for waiting packages using y = mx + b
                            console.log(`index: ${index}`);
                            const x = x1 + dx * (index);
                            const y = y1 + dy * (index);
    
                            packageElement.style.left = `${packageElement.getBoundingClientRect().left}px`;
                            packageElement.style.top = `${packageElement.getBoundingClientRect().top}px`;
    
                            const waitingPositionX = (x - 10)
                            const waitingPositionY = (y - 10)
    
                            console.log(`Waiting position: ${waitingPositionX}, ${waitingPositionY}`);
                            console.log(`Package position: ${packageElement.getBoundingClientRect().left + packageElement.getBoundingClientRect().width / 2}px, ${packageElement.getBoundingClientRect().top + packageElement.getBoundingClientRect().height / 2}px`);
    
                            const waitingAnimation = packageElement.animate([
                                { left: `${packageElement.getBoundingClientRect().left + packageElement.getBoundingClientRect().width / 2}px`, top: `${packageElement.getBoundingClientRect().top + packageElement.getBoundingClientRect().height / 2}px` },
                                { left: `${waitingPositionX}px`, top: `${waitingPositionY}px` }
                            ], {
                                duration: 1000,
                                easing: 'ease'
                            });
    
                            waitingAnimation.onfinish = function () {
                                packageElement.style.left = `${waitingPositionX}px`;
                                packageElement.style.top = `${waitingPositionY}px`;
                            };
                        } else {
                            // Remove the package from the waiting queue
                            waitingPackages.splice(index, 1);
                            index--;
                            goingToBeFulfilled += packageValue;
                            if ((waitingPackages.length > 0) && (shipmentsLoaded +goingToBeFulfilled + waitingPackages[index+1].value > maxShipments)) {
                                willFillorIsFull = true;
                            } else {
                                willFillorIsFull = false;
                            }
                            // Animate the package to the shipping station with spacing
                            const animation = packageElement.animate([
                                { left: `${packageElement.getBoundingClientRect().left + packageElement.getBoundingClientRect().width / 2}px`, top: `${packageElement.getBoundingClientRect().top + packageElement.getBoundingClientRect().height / 2}px` },
                                {
                                    left: `${shippingStationRect.left + shippingStationRect.width / 2}px`,
                                    top: `${shippingStationRect.top + shippingStationRect.height / 2}px`
                                }
                            ], {
                                duration: 1000,
                                easing: 'ease'
                            });
            
                            animation.onfinish = function () {
                                document.body.removeChild(packageElement);
                                shipmentsLoaded += packageValue;
                                goingToBeFulfilled -= packageValue;
                                if (goingToBeFulfilled == 0) {
                                    activelyChecking = false;
                                    console.log('Finished processing all packages');
                                }
                                pendingToAdd -= packageValue;
                                document.getElementById('shipmentsCounter').textContent = `Shipments Loaded: ${shipmentsLoaded}/${maxShipments}`;
                            };
                        }
                    };
                }
            } else {
                toPackage.forEach((packageValue, index) => {
                    const curWaiting = waitingPackages.length;
    
                    const x1 = shippingStationRect.right + 30;
                    const y1 = shippingStationRect.top + (shippingStationRect.bottom-shippingStationRect.top) / 2;
                    const x2 = processUnitRect.left - 30;
                    const y2 = processUnitRect.top + (processUnitRect.bottom-processUnitRect.top) / 2;
                    
                    const dx = (x2 - x1) / (maxWaitingShipments - 1);
                    const dy = (y2 - y1) / (maxWaitingShipments - 1);
                    setTimeout(() => {
                        pendingToAdd += packageValue;
                        if (shipmentsLoaded + pendingToAdd > maxShipments) {
                            willFillorIsFull = true;
                        }
                        shipmentsQueued -= packageValue;
            
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
                        if (shipmentsLoaded >= maxShipments || willFillorIsFull) {
                            // Calculate the diagonal position for waiting packages using y = mx + b
                            const x = x1 + dx * (curWaiting+localIndex);
                            const y = y1 + dy * (curWaiting+localIndex);
    
                            const waitingPositionX = (x - 10)
                            const waitingPositionY = (y - 10)
    
                            localIndex++;
    
                            const waitingAnimation = packageElement.animate([
                                { left: `${processUnitRect.left + processUnitRect.width / 2}px`, top: `${processUnitRect.top + processUnitRect.height / 2}px` },
                                { left: `${waitingPositionX}px`, top: `${waitingPositionY}px` }
                            ], {
                                duration: 1000,
                                easing: 'ease'
                            });
    
                            waitingAnimation.onfinish = function () {
                                packageElement.style.left = `${waitingPositionX}px`;
                                packageElement.style.top = `${waitingPositionY}px`;
                                waitingPackages.push({ element: packageElement, value: packageValue });
                            };
                        } else {
                            // Animate the package to the shipping station with spacing
                            const animation = packageElement.animate([
                                { left: `${processUnitRect.left + processUnitRect.width / 2}px`, top: `${processUnitRect.top + processUnitRect.height / 2}px` },
                                {
                                    left: `${shippingStationRect.left + shippingStationRect.width / 2}px`,
                                    top: `${shippingStationRect.top + shippingStationRect.height / 2}px`
                                }
                            ], {
                                duration: 1000,
                                easing: 'ease'
                            });
            
                            animation.onfinish = function () {
                                document.body.removeChild(packageElement);
                                shipmentsLoaded += packageValue;
                                pendingToAdd -= packageValue;
                                document.getElementById('shipmentsCounter').textContent = `Shipments Loaded: ${shipmentsLoaded}/${maxShipments}`;
                            };
                        }
                    }, index * 300); // Delay each spawn by 300ms
                });
            }  
        }

        /*function processWaitingPackages() {
            const spacing = 30; // Spacing between package elements
        
            // Iterate through waitingPackages using .forEach
            waitingPackages.forEach((waitingPackage, index) => {
                const { element: packageElement, value: packageValue } = waitingPackage;
        
                if (shipmentsLoaded + packageValue <= maxShipments) {
                    // Remove the package from the waiting queue
                    waitingPackages.splice(index, 1);
        
                    const shippingStation = document.getElementById('ShippingStation');
                    const shippingStationRect = shippingStation.getBoundingClientRect();
        
                    // Calculate the position with spacing
                    const currentLoadedCount = shipmentsLoaded;
                    const offsetX = (currentLoadedCount % 5) * spacing; // Adjust X position for spacing
                    const offsetY = Math.floor(currentLoadedCount / 5) * spacing; // Adjust Y position for spacing
        
                    // Animate the package to the shipping station with spacing
                    const animation = packageElement.animate([
                        { left: packageElement.style.left, top: packageElement.style.top },
                        {
                            left: `${shippingStationRect.left + shippingStationRect.width / 2 + offsetX}px`,
                            top: `${shippingStationRect.top + shippingStationRect.height / 2 + offsetY}px`
                        }
                    ], {
                        duration: 1000,
                        easing: 'ease'
                    });
        
                    animation.onfinish = function () {
                        document.body.removeChild(packageElement);
                        shipmentsLoaded += packageValue;
                        pendingToAdd -= packageValue;
                        document.getElementById('shipmentsCounter').textContent = `Shipments Loaded: ${shipmentsLoaded}/${maxShipments}`;
                    };
                }
            });
        }*/
        window.animatePackageToShippingStation = animatePackageToShippingStation;
        function clickExportShipment() {
            if (shipmentsLoaded > 0) {
                DilyanPoints += shipmentsLoaded;
                shipmentsLoaded = 0;
                willFillorIsFull = false;
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

        function splitExports(numberToSplit, splitSize) {
            let trackingNumber = numberToSplit;
            let trackingList = [];
            for (i = 1; i <= Math.ceil(numberToSplit/splitSize); i++) {
                if (trackingNumber - splitSize < 0) {
                    trackingList.push(trackingNumber);
                    trackingNumber = 0;
                } else {
                    trackingList.push(splitSize);
                    trackingNumber -= splitSize;
                }
            }
            return trackingList;
        }

        document.getElementById('packageShipmentsButton').addEventListener('click', function () {
            if (shipmentsQueued > 0 && waitingPackages.length < maxWaitingShipments) {
                let shipmentsToPackage;
                if (shipmentsLoaded >= maxShipments) {
                    shipmentsToPackage = splitExports(Math.min(maxWaitingShipments-waitingPackages.length,shipmentsQueued),shipmentsPerPackage);
                } else {
                    shipmentsToPackage = splitExports(shipmentsQueued,shipmentsPerPackage);
                }
                animatePackageToShippingStation(shipmentsToPackage);
            } else if (shipmentsQueued <= 0) {
                alert('You have no shipments queued! Please queue some shipments before packaging.');
            } else if (waitingPackages.length >= maxWaitingShipments) {
                alert('You have reached the maximum number of waiting packages. Please export some shipments before packaging more.');
            }
        });
    })
    .catch(error => console.error('Error loading game.html:', error));
}
window.gameLoad = gameLoad;
