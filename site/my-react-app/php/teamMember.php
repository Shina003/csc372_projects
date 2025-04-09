<?php
/**
 * TeamMember Class
 * 
 * This class represents a team member for the Fountain Brothers website.
 * It stores basic information about team members and provides methods
 * to view their profiles.
 */
class TeamMember {
    // Properties
    private $name;    // The full name of the team member
    private $bio;     // Short biography
    private $image;   // Image filename

    /**
     * Constructor
     * Creates a new TeamMember object with the given values
     */
    public function __construct($name, $bio, $image) {
        $this->name = $name;
        $this->bio = $bio;
        $this->image = $image;
    }

    /**
     * Get the team member's name
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Get the team member's biography
     */
    public function getBio() {
        return $this->bio;
    }

    /**
     * Get the team member's image filename
     */
    public function getImage() {
        return $this->image;
    }

    /**
     * View the team member's profile
     */
    public function viewProfile() {
        echo "<div class='team-member'>";
        echo "<img src='images/" . $this->getImage() . "' alt='" . $this->getName() . "'>";
        echo "<h3>" . $this->getName() . "</h3>";
        echo "<p>" . $this->getBio() . "</p>";
        echo "</div>";
    }
}

// Example usage - Create two team members
$kehinde = new TeamMember("Kehinde Adewumi", "Founder", "kehinde.png");
$michael = new TeamMember("Michael Johnson", "Former teacher", "michael.png");

// Display team members
echo "<div class='team-container'>";
$kehinde->viewProfile();
$michael->viewProfile();
echo "</div>";
?>