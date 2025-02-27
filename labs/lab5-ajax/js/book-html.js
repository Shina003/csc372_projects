// Function to change the opacity of all image elements to 0.5
function changeAllImagesOpacity() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        image.style.opacity = '0.5';
    });
}

// Function to trigger an Ajax request to load data from an HTML file
function loadHtmlData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('details').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Assign event listeners to images
document.getElementById('don-quixote-img').addEventListener('click', function() {
    loadHtmlData('data/cervantes-data.html');
    changeAllImagesOpacity();
    this.style.opacity = '1';
});

document.getElementById('two-cities-img').addEventListener('click', function() {
    loadHtmlData('data/dickens-data.html');
    changeAllImagesOpacity();
    this.style.opacity = '1';
});

document.getElementById('lotr-img').addEventListener('click', function() {
    loadHtmlData('data/tolkien-data.html');
    changeAllImagesOpacity();
    this.style.opacity = '1';
});