
// Store reference to the global member data for bio information
let allMemberData = [];

// Function to load the full member data for bio modals
function loadFullMemberData() {
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  
  // Configure the request - using GET method, asynchronous (true)
  xhr.open('GET', '/data/members.json', true);
  
  // Set up the onload handler
  xhr.onload = function() {
    // Check if the server status was okay (200)
    if (xhr.status === 200) {
      try {
        // Parse the JSON response and store it
        allMemberData = JSON.parse(xhr.responseText);
      } catch (e) {
        console.error('Error parsing full member data:', e);
      }
    }
  };
  
  // Send the request
  xhr.send();
}

/**
 * Load HTML member content using vanilla JavaScript XMLHttpRequest
 * This function follows the specification requirements:
 * 1. Creates an XMLHttpRequest object
 * 2. Checks if server status is okay
 * 3. Updates the page with the responseText
 * 4. Uses HTTP GET for an asynchronous request
 */
function loadHTMLMembers() {
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  
  // Set up event handler for when the request completes
  xhr.onload = function() {
    // Check if the server status was okay (200)
    if (xhr.status === 200) {
      // Update the content of the HTML section with the responseText
      document.getElementById('html-members-container').innerHTML = xhr.responseText;
      
      // Add event listeners to the new buttons
      attachBioViewListeners();
    } else {
      console.error('Failed to load HTML members. Status:', xhr.status);
    }
  };
  
  // Handle network errors
  xhr.onerror = function() {
    console.error('Network error when trying to load HTML members');
  };
  
  // Configure the request - using GET method, path to HTML file, asynchronous (true)
  xhr.open('GET', '/data/members-html.html', true);
  
  // Send the request
  xhr.send();
}

/**
 * Display a member's bio in a modal
 * @param {string} memberName - The name of the member to display
 */
function showMemberBio(memberName) {
  // Find the member in our data
  const member = allMemberData.find(m => m.name === memberName);
  
  if (!member) {
    console.error('Member not found:', memberName);
    return;
  }
  
  // Update the modal content
  document.getElementById('bioModalLabel').textContent = member.name;
  document.getElementById('bioModalImage').src = member.photo;
  document.getElementById('bioModalImage').alt = member.name;
  document.getElementById('bioModalContent').textContent = member.bio;
  
  // Show the modal using Bootstrap
  var bioModal = new bootstrap.Modal(document.getElementById('bioModal'));
  bioModal.show();
}

/**
 * Attach event listeners to all bio view buttons
 */
function attachBioViewListeners() {
  const bioButtons = document.querySelectorAll('#html-members-container .view-bio-btn');
  
  bioButtons.forEach(button => {
    button.addEventListener('click', function() {
      const memberName = this.getAttribute('data-member');
      showMemberBio(memberName);
    });
  });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load the full member data for bio modals
  loadFullMemberData();
  
  // Add event listener to the load button
  document.getElementById('load-html-members').addEventListener('click', loadHTMLMembers);
});