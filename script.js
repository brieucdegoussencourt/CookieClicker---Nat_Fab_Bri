// Declarations
let clicks = 0;
let multiplier_A_Cost = 2;
let multiplier_B_Cost = 5;
let multiplier_C_Cost = 200;
let bonusCost = 8000;
let multiplier_A_Count = 0;
let multiplier_B_Count = 0;
let multiplier_C_Count = 0;
let autoClickerCost = 100;
let multiplier_A_Active = false;
let multiplier_B_Active = false;
let multiplier_C_Active = false;
let autoClickerActive = false;
let bonusActive = false;
let autoClickInterval;
let bonusDuration = 30;
let bonusTimer;

// Tracking cumulative multiplier
let cumulativeMultiplier = 1;

// Get element ID
const cookieArea = document.getElementById('cookieArea');
const clickCount = document.getElementById('clickCount');
const multiplier = document.getElementById('multiplier_A_');
const multiplierB = document.getElementById('multiplier_B_');
const multiplierC = document.getElementById('multiplier_C_');
const clickValue = document.getElementById('clickValue');
const bonus = document.getElementById('bonus');
const timer = document.getElementById('timer');
const autoClicker = document.getElementById('autoClicker');
const welcomeMessage = document.getElementById('welcomeMessage');

// Prompt user name
function setUserName() {
    const userName = prompt("Please enter your name:");
    if (userName) {
        welcomeMessage.textContent = `Welcome ${userName}`;
    }
}
setUserName();

// Update click count
function updateClickCount() {
    clickCount.textContent = `${clicks}`;
}

// Update click value
function updateClickValue() {
    let clickIncrement = calculateClickValue();
    clickValue.textContent = `Click Value: ${clickIncrement}`;
}

// Calculate the current click value based on multipliers
function calculateClickValue() {
    return 1 * (multiplier_A_Count * 2 + multiplier_B_Count * 5 + multiplier_C_Count * 20 + 1);
}

cookieArea.addEventListener('click', () => {
    let clickIncrement = calculateClickValue();
    clicks += clickIncrement;
    updateClickCount();
    updateClickValue();
    applyBonus();
});

// Multiplier A
multiplier.addEventListener('click', () => {
    if (clicks >= multiplier_A_Cost) {
        clicks -= multiplier_A_Cost;
        multiplier_A_Cost *= 2;
        multiplier_A_Count++;
        multiplier.innerHTML = `Click * 2 <br> ${multiplier_A_Cost}$`;

        updateClickCount();
        updateClickValue();
    }
});

// Multiplier B
multiplierB.addEventListener('click', () => {
    if (clicks >= multiplier_B_Cost) {
        clicks -= multiplier_B_Cost;
        multiplier_B_Cost *= 3;
        multiplier_B_Count++;
        multiplierB.innerHTML = `Click * 5 <br> ${multiplier_B_Cost}$`;

        updateClickCount();
        updateClickValue();
    }
});

// Multiplier C
multiplierC.addEventListener('click', () => {
    if (clicks >= multiplier_C_Cost) {
        clicks -= multiplier_C_Cost;
        multiplier_C_Cost *= 4;
        multiplier_C_Count++;
        multiplierC.innerHTML = `Click * 20 <br> ${multiplier_C_Cost}$`;

        updateClickCount();
        updateClickValue();
    }
});

// Autoclick
autoClicker.addEventListener('click', () => {
    if (!autoClickerActive) {
        if (clicks >= autoClickerCost) {
            clicks -= autoClickerCost;
            autoClickerCost *= 2;
            autoClickerActive = true;
            autoClicker.innerHTML = "Auto Click <br> Active";

            autoClickInterval = setInterval(autoClickerAction, 1000);
            cookieArea.classList.add('spin'); // spin 

            if (bonusActive) {
                cookieArea.classList.remove('spin');
                cookieArea.classList.add('fastSpin');
            }
        }
    } else {
        autoClickerActive = false;
        clearInterval(autoClickInterval);
        cookieArea.classList.remove('spin'); // remove spin

        if (!bonusActive) {
            autoClicker.innerHTML = `Auto Click <br> ${autoClickerCost} $`;
        }
    }
    updateClickCount();
});

function autoClickerAction() {
    clicks += calculateClickValue();
    updateClickCount();
}

// Bonus functions
function applyBonus() {
    if (bonusActive) {
        clicks *= 1,5;
        updateClickCount();
    }
}

function updateBonus() {
    bonus.innerHTML = `Bonus: <br> ${bonusCost} $`;
}

// Timer
function activateBonus() {
    if (!bonusActive && clicks >= bonusCost) {
        clicks -= bonusCost;
        bonusActive = true;
        updateClickCount();
        bonusDuration = 30;
        updateTimer(bonusDuration);

        if (autoClickerActive) {
            cookieArea.classList.remove('spin');
        }
        cookieArea.classList.add('fastSpin'); // Fast spin!

        bonusTimer = setInterval(() => {
            bonusDuration--;
            updateTimer(bonusDuration);

            if (bonusDuration <= 0) {
                clearInterval(bonusTimer);
                bonusActive = false;
                bonus.innerHTML = `Bonus: ${bonusCost}`;
                updateTimer(-1);  // Reset timer display

                cookieArea.classList.remove('fastSpin'); // Remove fast spinning
                if (autoClickerActive) {
                    cookieArea.classList.add('spin'); // Add normal spin if autoclicker is active
                }
                updateClickValue();
            }
        }, 1000);
    }
}

bonus.addEventListener('click', () => {
    activateBonus();
});

function updateTimer(seconds) {
    if (seconds >= 0) {
        timer.style.display = 'block';
        timer.innerHTML = `Bonus time remaining: ${seconds}s`;
    } else {
        timer.style.display = 'none';
        timer.innerHTML = ``;
    }
}

updateClickCount();
updateBonus();
updateTimer(-1); // Hide timer
updateClickValue();
