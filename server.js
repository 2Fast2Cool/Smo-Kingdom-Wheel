const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve images statically from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// API endpoint to get the list of image files
app.get('/get-image-list', (req, res) => {
    const imageDir = path.join(__dirname, 'images');
    fs.readdir(imageDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading images directory');
        }
        // Filter out files that are not images (optional)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
        res.json(imageFiles);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
