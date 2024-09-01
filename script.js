var score = 0;
var clickingPower = 1;
var cursorCost = 20; // Increased initial cost for more balance
var cursors = 0;
var grandmaCost = 200; // Increased initial cost
var grandmas = 0;
var ovenCost = 3000; // Increased initial cost
var ovens = 0;
var grandpaCost = 50000; // Increased initial cost
var grandpas = 0;
var scorePerSecond = 0;
var cpsMultiplier = 1; // Track the CPS multiplier

// Adjust the CPS contributions for better balance
const cursorCPS = 0.2;
const grandmaCPS = 1.5;
const ovenCPS = 15;
const grandpaCPS = 50;

function checkAndRevealNextItem() {
    const grandmaItem = document.getElementById('shop-item-grandma');
    const ovenItem = document.getElementById('shop-item-oven');
    const grandpaItem = document.getElementById('shop-item-grandpa');

    if (score >= grandmaCost) {
        grandmaItem.classList.remove('hidden');
        grandmaItem.classList.remove('locked');
    } else if (grandmas === 0) {
        grandmaItem.classList.remove('hidden');
        grandmaItem.classList.add('locked');
    }

    if (score >= ovenCost) {
        ovenItem.classList.remove('hidden');
        ovenItem.classList.remove('locked');
    } else if (ovens === 0) {
        ovenItem.classList.remove('hidden');
        ovenItem.classList.add('locked');
    }

    if (score >= grandpaCost) {
        grandpaItem.classList.remove('hidden');
        grandpaItem.classList.remove('locked');
    } else if (grandpas === 0) {
        grandpaItem.classList.remove('hidden');
        grandpaItem.classList.add('locked');
    }
}

function addToScore(amount) {
    score += amount;
    document.getElementById("score").innerHTML = Math.floor(score);
    checkAndRevealNextItem();
}

function buyCursor() {
    if (score >= cursorCost) {
        score -= cursorCost;
        cursors += 1;
        cursorCost = Math.round(cursorCost * 1.15); // Reduced scaling for smoother progression

        document.getElementById("score").innerHTML = Math.floor(score);
        document.getElementById("cursorcost").innerHTML = cursorCost;
        document.getElementById("cursors").innerHTML = cursors;

        updateScorePerSecond();
        checkAndRevealNextItem();
    }
}

function buyGrandma() {
    if (score >= grandmaCost) {
        score -= grandmaCost;
        grandmas += 1;
        grandmaCost = Math.round(grandmaCost * 1.2); // Adjusted scaling

        document.getElementById("score").innerHTML = Math.floor(score);
        document.getElementById("grandmacost").innerHTML = grandmaCost;
        document.getElementById("grandmas").innerHTML = grandmas;

        updateScorePerSecond();
        checkAndRevealNextItem();
    }
}

function buyOven() {
    if (score >= ovenCost) {
        score -= ovenCost;
        ovens += 1;
        ovenCost = Math.round(ovenCost * 1.25); // Adjusted scaling

        document.getElementById("score").innerHTML = Math.floor(score);
        document.getElementById("ovencost").innerHTML = ovenCost;
        document.getElementById("ovens").innerHTML = ovens;

        updateScorePerSecond();
        checkAndRevealNextItem();
    }
}

function buyGrandpa() {
    if (score >= grandpaCost) {
        score -= grandpaCost;
        grandpas += 1;
        grandpaCost = Math.round(grandpaCost * 1.3); // Adjusted scaling

        document.getElementById("score").innerHTML = Math.floor(score);
        document.getElementById("grandpacost").innerHTML = grandpaCost;
        document.getElementById("grandpas").innerHTML = grandpas;

        updateScorePerSecond();
        checkAndRevealNextItem();
    }
}

function updateScorePerSecond() {
    // Adjusted CPS contributions
    scorePerSecond = (cursors * cursorCPS + grandmas * grandmaCPS + ovens * ovenCPS + grandpas * grandpaCPS) * cpsMultiplier;
    document.getElementById("scorepersecond").innerHTML = scorePerSecond.toFixed(2);
    updateShopCPSDisplay(); // Update shop CPS values whenever the CPS changes
}

function updateShopCPSDisplay() {
    // Update CPS display for each shop item
    document.getElementById("cursorCPS").innerHTML = (cursorCPS * cpsMultiplier).toFixed(2);
    document.getElementById("grandmaCPS").innerHTML = (grandmaCPS * cpsMultiplier).toFixed(2);
    document.getElementById("ovenCPS").innerHTML = (ovenCPS * cpsMultiplier).toFixed(2);
    document.getElementById("grandpaCPS").innerHTML = (grandpaCPS * cpsMultiplier).toFixed(2);
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (savedGame !== null) {
        if (typeof savedGame.score !== "undefined") score = savedGame.score;
        if (typeof savedGame.clickingPower !== "undefined") clickingPower = savedGame.clickingPower;
        if (typeof savedGame.cursorCost !== "undefined") cursorCost = savedGame.cursorCost;
        if (typeof savedGame.cursors !== "undefined") cursors = savedGame.cursors;
        if (typeof savedGame.grandmaCost !== "undefined") grandmaCost = savedGame.grandmaCost;
        if (typeof savedGame.grandmas !== "undefined") grandmas = savedGame.grandmas;
        if (typeof savedGame.ovenCost !== "undefined") ovenCost = savedGame.ovenCost;
        if (typeof savedGame.ovens !== "undefined") ovens = savedGame.ovens;
        if (typeof savedGame.grandpaCost !== "undefined") grandpaCost = savedGame.grandpaCost;
        if (typeof savedGame.grandpas !== "undefined") grandpas = savedGame.grandpas;
        if (typeof savedGame.cpsMultiplier !== "undefined") cpsMultiplier = savedGame.cpsMultiplier;
    }
    checkAndRevealNextItem();
}

function saveGame() {
    var gameSave = {
        score: score,
        clickingPower: clickingPower,
        cursorCost: cursorCost,
        cursors: cursors,
        grandmaCost: grandmaCost,
        grandmas: grandmas,
        ovenCost: ovenCost,
        ovens: ovens,
        grandpaCost: grandpaCost,
        grandpas: grandpas,
        cpsMultiplier: cpsMultiplier
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function resetGame(keepMultiplier = false) {
    if (confirm("Are you sure you want to reset the game?")) {
        // Remove saved game from localStorage
        localStorage.removeItem("gameSave");

        // Reset all game state variables
        score = 0;
        clickingPower = 1;
        cursorCost = 20;
        cursors = 0;
        grandmaCost = 200;
        grandmas = 0;
        ovenCost = 3000;
        ovens = 0;
        grandpaCost = 50000;
        grandpas = 0;
        scorePerSecond = 0;

        // Reset multiplier if keepMultiplier is false
        if (!keepMultiplier) {
            cpsMultiplier = 1;
        }

        // Update all the UI elements to reflect the reset state
        document.getElementById("score").innerHTML = score;
        document.getElementById("cursorcost").innerHTML = cursorCost;
        document.getElementById("cursors").innerHTML = cursors;
        document.getElementById("grandmacost").innerHTML = grandmaCost;
        document.getElementById("grandmas").innerHTML = grandmas;
        document.getElementById("ovencost").innerHTML = ovenCost;
        document.getElementById("ovens").innerHTML = ovens;
        document.getElementById("grandpacost").innerHTML = grandpaCost;
        document.getElementById("grandpas").innerHTML = grandpas;

        // Refresh score per second and multiplier display
        updateScorePerSecond();
        updateRebirthMultiplierDisplay();

        // Hide locked shop items (since we reset progress)
        checkAndRevealNextItem();
    }
}

// Function to handle the opening of the rebirth modal
function openRebirthModal() {
    document.getElementById('rebirthScore').innerText = Math.floor(score);
    
    // Check if the player has enough cookies to rebirth
    if (score >= 500000) {
        // Enable the rebirth button if enough score is reached
        document.getElementById('rebirthConfirmBtn').disabled = false;
    } else {
        // Disable the rebirth button if not enough score
        document.getElementById('rebirthConfirmBtn').disabled = true;
    }

    // Display the modal
    document.getElementById('rebirthModal').style.display = 'flex';
}

// Function to close the rebirth modal
function closeRebirthModal() {
    document.getElementById('rebirthModal').style.display = 'none';
}

// Rebirth function
function confirmRebirth() {
    cpsMultiplier *= 1.2; // Increase CPS multiplier
    closeRebirthModal();
    resetGame(true); // Reset the game but keep the multiplier
    updateRebirthMultiplierDisplay(); // Update the multiplier display
}

// Call the openRebirthModal function when the rebirth button is clicked
document.querySelector('.btn-rebirth').onclick = openRebirthModal;

function updateRebirthMultiplierDisplay() {
    document.getElementById("rebirthMultiplier").innerHTML = "x" + cpsMultiplier.toFixed(2) + " Multiplier";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('rebirthModal')) {
        closeRebirthModal();
    }
};

window.onload = function() {
    loadGame();
    updateScorePerSecond();
    updateRebirthMultiplierDisplay();
    updateShopCPSDisplay();
    document.getElementById("score").innerHTML = Math.floor(score);
    document.getElementById("cursorcost").innerHTML = cursorCost;
    document.getElementById("cursors").innerHTML = cursors;
    document.getElementById("grandmacost").innerHTML = grandmaCost;
    document.getElementById("grandmas").innerHTML = grandmas;
    document.getElementById("ovencost").innerHTML = ovenCost;
    document.getElementById("ovens").innerHTML = ovens;
    document.getElementById("grandpacost").innerHTML = grandpaCost;
    document.getElementById("grandpas").innerHTML = grandpas;
};

setInterval(function() {
    addToScore(scorePerSecond);
}, 1000);

setInterval(function() {
    saveGame();
}, 30000);

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);
