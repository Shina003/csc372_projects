
// Store reference to the global member data for bio information
let allMemberData = [];

// Function to load the full member data for bio modals
function loadFullMemberData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/data/members.json', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        allMemberData = JSON.parse(xhr.responseText);
      } catch (e) {
        console.error('Error parsing full member data:', e);
      }
    }
  };
  xhr.send();
}

/**
 * Load and process JSON member content
 * This function follows the specification requirements:
 * 1. Creates an XMLHttpRequest object
 * 2. Checks readystate changes and server status
 * 3. Gets JSON data using responseText
 * 4. Creates a variable for new HTML
 * 5. Loops through objects and adds content with HTML markup
 * 6. Updates the page with the new HTML
 */
function loadJSONMembers() {
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  
  // Set up readystatechange event handler
  xhr.onreadystatechange = function() {
    // Check if request is complete (4) and successful (200)
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        // Get JSON data from the server using responseText
        const data = JSON.parse(xhr.responseText);
        
        // Create a variable to hold the new HTML
        let htmlContent = '<div class="members-row">';
        
        // Loop through the objects and add content with HTML markup
        data.members.forEach(member => {
          htmlContent += `
            <div class="member-card">
              <img src="${member.photo}" alt="${member.name}" class="member-image">
              <h3>${member.name}</h3>
              <button class="btn btn-success view-bio-btn" data-member="${member.name}">View Bio</button>
            </div>
          `;
        });
        
        // Close the container div
        htmlContent += '</div>';
        
        // Update the page with the new HTML
        document.getElementById('json-members-container').innerHTML = htmlContent;
        
        // Add event listeners to the new buttons
        attachBioViewListeners();
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }
  };
  
  // Configure the request
  xhr.open('GET', '/data/members-json.json', true);
  
  // Send the request
  xhr.send();
}

/**
 * Attach event listeners to all bio view buttons
 */
function attachBioViewListeners() {
  const bioButtons = document.querySelectorAll('#json-members-container .view-bio-btn');
  
  bioButtons.forEach(button => {
    button.addEventListener('click', function() {
      const memberName = this.getAttribute('data-member');
      showMemberBio(memberName);
    });
  });
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

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load the full member data for bio modals
  loadFullMemberData();
  
  // Add event listener to the load button
  document.getElementById('load-json-members').addEventListener('click', loadJSONMembers);
});