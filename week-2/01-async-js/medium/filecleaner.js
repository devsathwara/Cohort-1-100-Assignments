const fs = require('fs');

function cleanfile(path) {
    try {
        
    const data = fs.readFileSync(path, 'utf-8');

    const cleanedData = data.replace(/\s+/g, ' ');

    fs.writeFileSync(path, cleanedData);

    console.log('File is cleaned');
    } catch (error) {
        console.error(error)
    }
}

const filePath = './test.txt'; // Specify the correct file path

cleanfile(filePath);
console.log(fs.readFileSync(filePath, 'utf-8'));
