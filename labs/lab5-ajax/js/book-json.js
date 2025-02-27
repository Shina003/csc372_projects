// Function to change the opacity of all image elements to 0.5
function changeAllImagesOpacity() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        image.style.opacity = '0.5';
    });
}

// Function to trigger an Ajax request to load data from a JSON file
function loadJsonData(filePath, index) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const book = data.books[index];

            const detailsDiv = document.getElementById('details');
            detailsDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p><b>Author:</b> ${book.author}</p>
                <p><b>Copies Sold:</b> ${book.sold} million</p>
                <p>${book.description}</p>
            `;
        }
    };
    xhr.send();
}

// Assign event listeners to images
document.getElementById('don-quixote-img').addEventListener('click', function() {
    loadJsonData('data/book-data.json', 0);
    changeAllImagesOpacity();
    this.style.opacity = '1';
});

document.getElementById('two-cities-img').addEventListener('click', function() {
    loadJsonData('data/book-data.json', 1);
    changeAllImagesOpacity();
    this.style.opacity = '1';
});

document.getElementById('lotr-img').addEventListener('click', function() {
    loadJsonData('data/book-data.json', 2);
    changeAllImagesOpacity();
    this.style.opacity = '1';
});