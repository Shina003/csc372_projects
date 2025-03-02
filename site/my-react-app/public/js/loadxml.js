
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
 * Load and process XML member content
 * This function follows the specification requirements:
 * 1. Creates an XMLHttpRequest object
 * 2. Checks if server status is okay
 * 3. Gets XML from the server
 * 4. Finds XML elements and loops through them
 * 5. Adds XML elements to the DOM tree using DOM manipulation
 */
function loadXMLMembers() {
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  
  // Set up event handler for when the request completes
  xhr.onload = function() {
    // Check if the server status was okay (200)
    if (xhr.status === 200) {
      // Get XML from the server
      const xmlDoc = xhr.responseXML;
      
      // Find XML elements
      const members = xmlDoc.getElementsByTagName('member');
      
      // Get the container to add elements to
      const container = document.getElementById('xml-members-container');
      
      // Clear previous content
      container.innerHTML = '';
      
      // Create a row div to hold the members
      const rowDiv = document.createElement('div');
      rowDiv.className = 'members-row';
      container.appendChild(rowDiv);
      
      // Loop through the XML elements
      for (let i = 0; i < members.length; i++) {
        // Get member data from XML
        const name = members[i].getElementsByTagName('name')[0].textContent;
        const photo = members[i].getElementsByTagName('photo')[0].textContent;
        const bio = members[i].getElementsByTagName('bio')[0].textContent;
        
        // Create a card div for the member
        const cardDiv = document.createElement('div');
        cardDiv.className = 'member-card';
        
        // Create an image element
        const imgElement = document.createElement('img');
        imgElement.src = photo;
        imgElement.alt = name;
        imgElement.className = 'member-image';
        
        // Create a heading for the name
        const nameHeading = document.createElement('h3');
        nameHeading.textContent = name;
        
        // Create a button to view bio
        const bioButton = document.createElement('button');
        bioButton.className = 'btn btn-success view-bio-btn';
        bioButton.setAttribute('data-member', name);
        bioButton.textContent = 'View Bio';
        
        // Add event listener to the button
        bioButton.addEventListener('click', function() {
          showMemberBio(name);
        });
        
        // Add all elements to the card
        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(nameHeading);
        cardDiv.appendChild(bioButton);
        
        // Add the card to the row
        rowDiv.appendChild(cardDiv);
      }
    } else {
      console.error('Failed to load XML members. Status:', xhr.status);
    }
  };
  
  // Configure the request
  xhr.open('GET', '/data/members-xml.xml', true);
  
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

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load the full member data for bio modals
  loadFullMemberData();
  
  // Add event listener to the load button
  document.getElementById('load-xml-members').addEventListener('click', loadXMLMembers);
});