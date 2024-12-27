// All images list
let allImages = [
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
    { file: "DeepWoods_Header.webp", displayName: "Deep Woods" }
];

let disabledImages = [];

const imageSelector = document.getElementById("image-selector");
const randomImageElement = document.getElementById("random-image");
const disabledImagesListElement = document.getElementById("disabled-images-list");
const backgroundColorPicker = document.getElementById("background-color-picker");
const imageListContainer = document.getElementById("image-list");
const imageInput = document.getElementById("image-upload-input");
const imageNameInput = document.getElementById("image-name-input");

function populateImageSelector() {
    // Clear the selector
    imageSelector.innerHTML = '';

    // Populate the selector with available images
    allImages.forEach(image => {
        const option = document.createElement("option");
        option.value = image.file;
        option.textContent = image.displayName;
        imageSelector.appendChild(option);
    });

    // Populate the image list with delete buttons
    updateImageList();
}

function updateImageList() {
    // Clear the image list
    imageListContainer.innerHTML = '';

    allImages.forEach(image => {
        const imageItem = document.createElement("div");
        imageItem.className = "image-item";
        
        const imageName = document.createElement("span");
        imageName.textContent = image.displayName;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteImage(image.file);
        };

        imageItem.appendChild(imageName);
        imageItem.appendChild(deleteButton);
        imageListContainer.appendChild(imageItem);
    });
}

function deleteImage(imageFile) {
    // Remove the image from the allImages list
    allImages = allImages.filter(image => image.file !== imageFile);

    // Also remove the image from disabledImages if it's in the list
    disabledImages = disabledImages.filter(image => image !== imageFile);

    // Repopulate the image selector and image list after deletion
    populateImageSelector();
    updateDisabledImagesList();
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

function toggleImageStatus() {
    const selectedImageFile = imageSelector.value;
    if (disabledImages.includes(selectedImageFile)) {
        disabledImages = disabledImages.filter(image => image !== selectedImageFile);
    } else {
        disabledImages.push(selectedImageFile);
    }
    updateDisabledImagesList();
}

function updateDisabledImagesList() {
    if (disabledImages.length === 0) {
        disabledImagesListElement.textContent = "No images disabled yet.";
    } else {
        const disabledDisplayNames = disabledImages
            .map(file => {
                const image = allImages.find(image => image.file === file);
                return image ? image.displayName : file;
            });
        disabledImagesListElement.textContent = disabledDisplayNames.join("\n");
    }
}

// Function to change background color
backgroundColorPicker.addEventListener("input", function() {
    document.body.style.backgroundColor = backgroundColorPicker.value;
});

// Function to add custom image
function addCustomImage() {
    const file = imageInput.files[0];  // Get the file
    const displayName = imageNameInput.value; // Get the name of the image

    if (file && displayName) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Add the custom image to the allImages array
            const customImage = {
                file: e.target.result,  // Base64 data of the uploaded image
                displayName: displayName
            };
            allImages.push(customImage);  // Add it to the list of all images

            // Update the selector and list
            populateImageSelector();
            updateImageList();

            // Clear the input fields
            imageInput.value = '';
            imageNameInput.value = '';
        };
        reader.readAsDataURL(file);  // Read the file as a data URL
    } else {
        alert("Please select an image and enter a name.");
    }
}

populateImageSelector();  // Initial population of the image selector
