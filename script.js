//déclarations
let clicks = 0;
let multiplier_A_Cost = 2;
let multiplier_B_Cost = 5;
let multiplier_C_Cost = 200;
let bonusCost = 500;
let multiplier_A_Active = false;
let multiplier_B_Active = false;
let multiplier_C_Active = false;
let autoClickerActive = false;
let bonusActive = false;
let autoClickerCost = 100;
let autoClickInterval;
let bonusDuration = 30;
let bonusTimer;

//get element ID
const cookieArea = document.getElementById('cookieArea');
const clickCount = document.getElementById('clickCount');
const multiplier = document.getElementById('multiplier_A_');
const multiplierB = document.getElementById('multiplier_B_');
const multiplierC = document.getElementById('multiplier_C_');
const clickValue = document.getElementById('clickValue');
const bonus = document.getElementById('bonus');
const timer = document.getElementById('timer');
const autoClicker = document.getElementById('autoClicker');

// Prompt user name
function setUserName() {
    const userName = prompt("Please enter your name:");
    if (userName) {
        welcomeMessage.textContent = `Welcome ${userName}`;
    }
}
setUserName();

//clic count
function updateClickCount() {
    clickCount.textContent = `${clicks}`;
}

//clic value
function updateClickValue(value) {
    clickValue.textContent = `Click Value: ${value}`;
}

cookieArea.addEventListener('click', () => {
    let clickIncrement = 1;

    if (multiplier_A_Active) {
        clickIncrement = 2;
    } else if (multiplier_B_Active) {
        clickIncrement = 5;
    } else if (multiplier_C_Active) {
        clickIncrement = 20;
    }

    clicks += clickIncrement;
    updateClickCount();
    updateClickValue(clickIncrement);
    applyBonus();
});

//multiplier A
multiplier.addEventListener('click', () => {
    if (clicks >= multiplier_A_Cost) {
        clicks -= multiplier_A_Cost;
        multiplier_A_Cost *= 2;
        multiplier.innerHTML = `Click * 2 <br> ${multiplier_A_Cost}$`;
        multiplier_A_Active = true;
        multiplier_B_Active = false;
        multiplier_C_Active = false;
    }
    updateClickCount();
});

//multiplier B
multiplierB.addEventListener('click', () => {
    if (clicks >= multiplier_B_Cost) {
        clicks -= multiplier_B_Cost;
        multiplier_B_Cost *= 3;
        multiplierB.innerHTML = `Click * 5 <br> ${multiplier_B_Cost}$`;
        multiplier_B_Active = true;
        multiplier_A_Active = false;
        multiplier_C_Active = false;
    }
    updateClickCount();
});

//multiplier C
multiplierC.addEventListener('click', () => {
    if (clicks >= multiplier_C_Cost) {
        clicks -= multiplier_C_Cost;
        multiplier_C_Cost *= 4;
        multiplierC.innerHTML = `Click * 20 <br> ${multiplier_C_Cost}$`;
        multiplier_C_Active = true;
        multiplier_A_Active = false;
        multiplier_B_Active = false;
    }
    updateClickCount();
});

//Autoclick
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
    clicks += 20;
    updateClickCount();
}

//début: Bonus
function applyBonus() {
    if (bonusActive) {
        clicks *= 1,15;
        updateClickCount();
    }
}

function updateBonus() {
    bonus.innerHTML = `Bonus: <br> ${bonusCost} $`;
}

//timer
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
                updateTimer(-1);  // reset du timer display

                cookieArea.classList.remove('fastSpin'); // Remove fast spinning
                if (autoClickerActive) {
                    cookieArea.classList.add('spin'); // Rajout du spin normal si l'auto clicker est actif
                }
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

//fin: Bonus

//vibrate onclick

function vibrate(){
     if(!("vibrate" in navigator)){
       alert("Vibrate not supported!");
       return;
     }
     navigator.vibrate(5500);
   }
