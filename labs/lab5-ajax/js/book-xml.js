// Function to change the opacity of all image elements to 0.5
function changeAllImagesOpacity() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        image.style.opacity = '0.5';
    });
}

// Function to trigger an Ajax request to load data from an XML file
function loadXmlData(filePath, index) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const xmlDoc = xhr.responseXML;
            const books = xmlDoc.getElementsByTagName('book');
            const book = books[index];

            const title = book.getElementsByTagName('title')[0].textContent;
            const author = book.getElementsByTagName('author')[0].textContent;
            const sold = book.getElementsByTagName('sold')[0].textContent;
            const description = book.getElementsByTagName('description')[0].textContent;

            const detailsDiv = document.getElementById('details');
            detailsDiv.innerHTML = `
                <h3>${title}</h3>
                <p><b>Author:</b> ${author}</p>
                <p><b>Copies Sold:</b> ${sold} million</p>
                <p>${description}</p>
            `;
        }
    };
    xhr.send();
}

// Assign event listeners to images
document.getElementById('don-quixote-img').addEventListener('click', function() {
    loadXmlData('data/book-data.xml', 0);
    changeAllImagesOpacity();
    this.style.opacity = '1';
});

document.getElementById('two-cities-img').addEventListener('click', function() {
    loadXmlData('data/book-data.xml', 1);
    changeAllImagesOpacity();
    this.style.opacity = '1';
});

document.getElementById('lotr-img').addEventListener('click', function() {
    loadXmlData('data/book-data.xml', 2);
    changeAllImagesOpacity();
    this.style.opacity = '1';
});