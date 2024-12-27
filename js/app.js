// Load settings from localStorage
window.onload = function () {
    loadSettings();
};

let names = JSON.parse(localStorage.getItem('names')) || ["Diya", "Charles", "Beatriz", "Ali", "Hanna", "Gabriel", "Fatima", "Eric"];
let disabledNames = JSON.parse(localStorage.getItem('disabledNames')) || [];
let hiddenNames = JSON.parse(localStorage.getItem('hiddenNames')) || [];  // Store hidden names
let backgroundColor = localStorage.getItem('backgroundColor') || "#ffffff"; // Default white background

const nameSelector = document.getElementById("name-selector");
const disabledNamesList = document.getElementById("disabled-names-list");
const spinButton = document.getElementById("spin-button");
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const resultBox = document.getElementById("result-box");
const resultText = document.getElementById("result-text");
const backgroundColorPicker = document.getElementById("background-color-picker");

document.body.style.backgroundColor = backgroundColor; // Set the initial background color
backgroundColorPicker.value = backgroundColor; // Set the color picker value

function saveSettings() {
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('disabledNames', JSON.stringify(disabledNames));
    localStorage.setItem('hiddenNames', JSON.stringify(hiddenNames)); // Save hidden names
    localStorage.setItem('backgroundColor', backgroundColor);
}

function loadSettings() {
    // Update the UI with saved names and settings
    populateNameSelector();
    drawWheel();
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (names.length === 0) {
        alert("No entries available to spin.");
        spinButton.disabled = true;
        return;
    }

    const sliceAngle = (2 * Math.PI) / names.length;

    names.forEach((name, i) => {
        if (hiddenNames.includes(name)) return; // Skip drawing hidden names

        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? "#FFDDC1" : "#FFABAB";
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText(name, canvas.width / 2 - 20, 10);
        ctx.restore();
    });

    spinButton.disabled = names.length === 0;
}

function spinWheel() {
    if (names.length === 0) {
        alert("No names to spin.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * names.length);

    // Display the result in the overlay box
    resultBox.style.display = "flex"; // Make it visible
    resultText.textContent = `Winner: ${names[randomIndex]}!`;
}

function closeResultBox() {
    resultBox.style.display = "none"; // Hide the result box
}

function addCustomName() {
    const input = document.getElementById("custom-name-input");
    const name = input.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        saveSettings(); // Save settings
        populateNameSelector();
        drawWheel();
    }
    input.value = "";
}

function toggleNameStatus() {
    const selectedName = nameSelector.value;
    if (!selectedName) return;

    if (disabledNames.includes(selectedName)) {
        disabledNames = disabledNames.filter(name => name !== selectedName);
        names.push(selectedName);
    } else {
        disabledNames.push(selectedName);
        names = names.filter(name => name !== selectedName);
    }
    saveSettings(); // Save settings
    populateNameSelector();
    updateDisabledNamesList();
    drawWheel();
}

function toggleNameVisibility() {
    const selectedName = nameSelector.value;
    if (!selectedName) return;

    if (hiddenNames.includes(selectedName)) {
        hiddenNames = hiddenNames.filter(name => name !== selectedName); // Unhide
    } else {
        hiddenNames.push(selectedName); // Hide
    }
    saveSettings(); // Save settings
    drawWheel();
}

function deleteName() {
    const selectedName = nameSelector.value;
    if (!selectedName) return;

    // Remove name from both names and disabledNames
    names = names.filter(name => name !== selectedName);
    disabledNames = disabledNames.filter(name => name !== selectedName);

    // If the name is hidden, remove from hiddenNames as well
    hiddenNames = hiddenNames.filter(name => name !== selectedName);

    saveSettings(); // Save settings
    populateNameSelector();
    updateDisabledNamesList();
    drawWheel();
}

function updateDisabledNamesList() {
    disabledNamesList.textContent = disabledNames.length
        ? disabledNames.join("\n")
        : "No names disabled yet.";
}

function populateNameSelector() {
    nameSelector.innerHTML = "";
    [...names, ...disabledNames].forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        nameSelector.appendChild(option);
    });
}

function setBackgroundColor() {
    backgroundColor = backgroundColorPicker.value;
    document.body.style.backgroundColor = backgroundColor; // Change background color
    saveSettings(); // Save the new color setting
}

populateNameSelector();
drawWheel();
