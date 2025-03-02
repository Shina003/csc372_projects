

// Store reference to the global member data for bio information
let allMemberData = [];

// Function to load the full member data for bio modals
function loadFullMemberData() {
  $.getJSON('/data/members.json', function(data) {
    allMemberData = data;
  });
}

/**
 * Load HTML content using jQuery .load() method
 * Uses jQuery .load() method to specify URL
 * Adds HTML with transitions and movement effects
 */
function loadJQueryMembers() {
  // Check if jQuery is available
  if (typeof $ === 'undefined') {
    console.error('jQuery is not loaded');
    return;
  }
  
  // Select the element to load content into
  const $container = $('#jquery-members-container');
  
  // Use jQuery's .load() method to fetch and insert HTML
  $container.load('/data/members-jquery.html', function(response, status, xhr) {
    if (status === 'error') {
      console.error('Error loading content with jQuery:', xhr.statusText);
      return;
    }
    
    // Apply jQuery effects for transitions and movement
    $container.find('.member-card').hide().each(function(index) {
      // Staggered appearance with different effects
      $(this)
        .delay(200 * index) // Staggered delay
        .slideDown(400) // Slide down effect
        .animate({ 
          opacity: 1,
          marginTop: '0px' // Move from below
        }, 600);
    });
    
    // Add event handlers for bio buttons
    $container.find('.view-bio-btn').on('click', function() {
      const memberName = $(this).data('member');
      showMemberBio(memberName);
    });
  });
}

/**
 * Display a member's bio in a modal using jQuery
 * @param {string} memberName - The name of the member to display
 */
function showMemberBio(memberName) {
  // Find the member in our data
  const member = allMemberData.find(m => m.name === memberName);
  
  if (!member) {
    console.error('Member not found:', memberName);
    return;
  }
  
  // Update the modal content using jQuery
  $('#bioModalLabel').text(member.name);
  $('#bioModalImage').attr({
    'src': member.photo,
    'alt': member.name
  });
  $('#bioModalContent').text(member.bio);
  
  // Show the modal with a jQuery effect
  $('#bioModal').modal('show');
}

// Initialize when the document is ready (jQuery method)
$(document).ready(function() {
  // Load the full member data for bio modals
  loadFullMemberData();
  
  // Add event listener to the load button using jQuery
  $('#load-jquery-members').on('click', loadJQueryMembers);
  
  // Add some CSS for initial state of cards
  $('<style>')
    .text(`
      #jquery-members-container .member-card {
        opacity: 0;
        margin-top: 30px;
      }
    `)
    .appendTo('head');
});