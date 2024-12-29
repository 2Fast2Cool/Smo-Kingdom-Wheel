const allImages = [
    { file: "CapKingdom_Header.webp", displayName: "Cap Kingdom" },
    { file: "CascadeKingdom_Header.webp", displayName: "Cascade Kingdom" },
    { file: "SandKingdom_Header.webp", displayName: "Sand Kingdom" },
    { file: "LakeKingdom_Header.webp", displayName: "Lake Kingdom" },
    { file: "WoodedKingdom_Header.webp", displayName: "Wooded Kingdom" },
    { file: "CloudKingdom_Header.webp", displayName: "Cloud Kingdom" },
    { file: "LostKingdom_Header.webp", displayName: "Lost Kingdom" },
    { file: "MetroKingdom_Header.webp", displayName: "Metro Kingdom" },
    { file: "SnowKingdom_Header.webp", displayName: "Snow Kingdom" },
    { file: "SeasideKingdom_Header.webp", displayName: "Seaside Kingdom" },
    { file: "LuncheonKingdom_Header.webp", displayName: "Luncheon Kingdom" },
    { file: "RuinedKingdom_Header.webp", displayName: "Ruined Kingdom" },
    { file: "BowsersKingdom_Header.webp", displayName: "Bowser's Kingdom" },
    { file: "MushroomKingdom_Header.webp", displayName: "Mushroom Kingdom" },
    { file: "DarkSideKingdom_Header.webp", displayName: "Dark Side Kingdom" },
    { file: "DarkderSideKingdom_Header.webp", displayName: "Darkder Side Kingdom" },
    { file: "DeepWoods_Header.webp", displayName: "Deep Woods" },
];

let disabledImages = [];

const imageSelector = document.getElementById("image-selector");
const randomImageElement = document.getElementById("random-image");
const disabledImagesListElement = document.getElementById("disabled-images-list");
const imageListContainer = document.getElementById("image-list");
const backgroundColorPicker = document.getElementById("background-color-picker");

function populateImageSelector() {
    imageSelector.innerHTML = '';
    allImages.forEach(image => {
        const option = document.createElement("option");
        option.value = image.file;
        option.textContent = image.displayName;
        imageSelector.appendChild(option);
    });
}

function updateImageList() {
    imageListContainer.innerHTML = '';
    allImages.forEach((image, index) => {
        const div = document.createElement("div");
        div.className = "image-item";

        const span = document.createElement("span");
        span.textContent = image.displayName;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteImage(index);

        div.appendChild(span);
        div.appendChild(deleteButton);
        imageListContainer.appendChild(div);
    });
}

function pickRandomImage() {
    const enabledImages = allImages.filter(image => !disabledImages.includes(image.file));
    if (enabledImages.length === 0) {
        alert("No images left to choose from.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * enabledImages.length);
    const randomImage = enabledImages[randomIndex];
    randomImageElement.src = "images/" + randomImage.file;
}

function addCustomImage() {
    const fileInput = document.getElementById("image-upload-input");
    const nameInput = document.getElementById("image-name-input");

    const file = fileInput.files[0];
    const displayName = nameInput.value.trim();

    if (!file || !displayName) {
        alert("Please select a file and enter a display name.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        allImages.push({ file: e.target.result, displayName });
        populateImageSelector();
        updateImageList();
    };
    reader.readAsDataURL(file);

    fileInput.value = '';
    nameInput.value = '';
}

function deleteImage(index) {
    allImages.splice(index, 1);
    populateImageSelector();
    updateImageList();
}

function changeBackgroundColor() {
    const color = backgroundColorPicker.value;
    document.body.style.backgroundColor = color;
}

backgroundColorPicker.addEventListener("input", changeBackgroundColor);

// Initial population
populateImageSelector();
updateImageList();
