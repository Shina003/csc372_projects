// Select the main title and paragraphs we want to modify
const mainTitle = document.querySelector('h1');
const authorParagraph = document.querySelector('.main-content p:last-child');

// Update the main title with welcome message
mainTitle.textContent = "Welcome to Fountain Brothers!";

// Function to handle mouseover event
function highlightTitle() {
    mainTitle.style.color = 'yellow';
}

// Function to handle mouseout event
function resetTitle() {
    mainTitle.style.color = 'white';
}

// Add event listeners to the title
mainTitle.addEventListener('mouseover', highlightTitle);
mainTitle.addEventListener('mouseout', resetTitle);

// Function to make text uppercase and add emphasis
function emphasizeText(element) {
    element.style.fontWeight = 'bold';
    element.textContent = element.textContent.toUpperCase();
}

// Add click event to content paragraph that transforms its text
mainTitle.addEventListener('click', function() {
    emphasizeText(this);
});