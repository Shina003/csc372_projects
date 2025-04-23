<?php
// Include validation functions
require_once 'validation_functions.php';

// Start session for visitor tracking
session_start();

// Initialize arrays for form data and error messages
$formData = [
    'name' => '',
    'email' => '',
    'phone' => '',
    'contactType' => 'general', // Default value
    'message' => ''
];

$errors = [
    'name' => '',
    'email' => '',
    'phone' => '',
    'contactType' => '',
    'message' => ''
];

// Message to display after form submission
$responseMessage = '';

// Define allowed contact types
$allowedContactTypes = ['general', 'support', 'event', 'membership', 'donation'];

// Handle theme preference cookie
$theme = 'light'; // Default theme
if (isset($_COOKIE['preferred_theme'])) {
    $theme = htmlspecialchars($_COOKIE['preferred_theme'], ENT_QUOTES, 'UTF-8');
}

// If theme was changed via form submission
if (isset($_POST['set_theme']) && in_array($_POST['set_theme'], ['light', 'dark'])) {
    $theme = $_POST['set_theme'];
    // Set cookie with 30-day expiration
    setcookie('preferred_theme', $theme, time() + (86400 * 30), '/');
}

// Set or update visitor session data
if (!isset($_SESSION['visit_count'])) {
    $_SESSION['visit_count'] = 1;
    $_SESSION['first_visit'] = date('Y-m-d H:i:s');
} else {
    $_SESSION['visit_count']++;
    $_SESSION['last_visit'] = date('Y-m-d H:i:s');
}

// Handle session termination
if (isset($_GET['end_session']) && $_GET['end_session'] === 'true') {
    // Destroy the session
    session_unset();
    session_destroy();

    // Redirect to the same page without the query parameter
    header('Location: process_contact.php');
    exit;
}

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['name'])) {

    // Collect data from POST and update formData array
    $formData['name'] = isset($_POST['name']) ? trim($_POST['name']) : '';
    $formData['email'] = isset($_POST['email']) ? trim($_POST['email']) : '';
    $formData['phone'] = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $formData['contactType'] = $_POST['contactType'] ?? 'general'; // Using null coalescing operator
    $formData['message'] = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Store last contact attempt in session
    $_SESSION['last_contact_attempt'] = [
        'date' => date('Y-m-d H:i:s'),
        'email' => $formData['email'],
        'contactType' => $formData['contactType']
    ];

    // Validate name
    if (empty($formData['name'])) {
        $errors['name'] = 'Name is required.';
    } elseif (!validateTextLength($formData['name'], 2, 50)) {
        $errors['name'] = 'Name must be between 2 and 50 characters.';
    }

    // Validate email
    if (empty($formData['email'])) {
        $errors['email'] = 'Email address is required.';
    } elseif (!validateEmail($formData['email'])) {
        $errors['email'] = 'Please enter a valid email address.';
    }

    // Validate phone (optional)
    if (!validatePhone($formData['phone'])) {
        $errors['phone'] = 'Please enter a valid phone number.';
    }

    // Validate contact type
    if (empty($formData['contactType'])) {
        $errors['contactType'] = 'Please select a reason for contact.';
    } elseif (!validateOption($formData['contactType'], $allowedContactTypes)) {
        $errors['contactType'] = 'Please select a valid contact reason.';
    }

    // Validate message
    if (empty($formData['message'])) {
        $errors['message'] = 'Message is required.';
    } elseif (!validateTextLength($formData['message'], 10, 1000)) {
        $errors['message'] = 'Message must be between 10 and 1000 characters.';
    }

    // Combine all error messages
    $errorString = implode('', array_filter($errors));

    // Determine if the form is valid
    if (empty($errorString)) {
        // Form is valid - Process the data

        // Sanitize all data for safe usage
        $safeName = htmlspecialchars($formData['name'], ENT_QUOTES, 'UTF-8');
        $safeEmail = htmlspecialchars($formData['email'], ENT_QUOTES, 'UTF-8');
        $safePhone = htmlspecialchars($formData['phone'], ENT_QUOTES, 'UTF-8');
        $safeContactType = htmlspecialchars($formData['contactType'], ENT_QUOTES, 'UTF-8');
        $safeMessage = htmlspecialchars($formData['message'], ENT_QUOTES, 'UTF-8');

        // Remember email in a cookie for returning visitors
        if (!isset($_COOKIE['visitor_email'])) {
            setcookie('visitor_email', $safeEmail, time() + (86400 * 30), '/'); // 30 days
        }

        // Update the session with successful contact submission
        $_SESSION['last_successful_contact'] = date('Y-m-d H:i:s');
        $_SESSION['contact_submissions'] = ($_SESSION['contact_submissions'] ?? 0) + 1;

        // Here you would typically store in database or send an email
        // For demonstration, we'll just set a success message
        $responseMessage = "Thank you for your message! We'll get back to you soon.";

        // Reset form data after successful submission
        $formData = [
            'name' => '',
            'email' => '',
            'phone' => '',
            'contactType' => 'general',
            'message' => ''
        ];
    } else {
        // Form has errors
        $responseMessage = "Please correct the errors in the form.";

        // Update session with failed submission info
        $_SESSION['last_failed_contact'] = date('Y-m-d H:i:s');
        $_SESSION['contact_errors'] = ($_SESSION['contact_errors'] ?? 0) + 1;
    }
}

// Determine response format based on request
if (
    isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest'
) {
    // This is an AJAX request, return JSON
    header('Content-Type: application/json');
    echo json_encode([
        'success' => empty($errorString),
        'message' => $responseMessage,
        'errors' => $errors,
        'theme' => $theme,
        'sessionData' => [
            'visitCount' => $_SESSION['visit_count'] ?? 0,
            'firstVisit' => $_SESSION['first_visit'] ?? null,
            'lastVisit' => $_SESSION['last_visit'] ?? null,
            'contactSubmissions' => $_SESSION['contact_submissions'] ?? 0
        ]
    ]);
    exit;
}

// If not AJAX or if we want to enable non-JavaScript fallback,
// we would continue with the normal page render here
?>

<!DOCTYPE html>
<html lang="en" data-theme="<?php echo $theme; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Processing</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            transition: background-color 0.3s, color 0.3s;
        }

        /* Theme styles */
        [data-theme="light"] {
            background-color: #fff;
            color: #333;
        }

        [data-theme="dark"] {
            background-color: #333;
            color: #fff;
        }

        .success {
            color: green;
        }

        .error {
            color: red;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .session-info {
            margin-top: 30px;
            padding: 15px;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 5px;
        }

        .theme-toggle {
            margin: 20px 0;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 5px;
        }

        button,
        .btn {
            padding: 8px 15px;
            background-color: #008000;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Contact Form Processing</h1>

        <?php if (!empty($responseMessage)): ?>
            <div class="<?php echo empty($errorString) ? 'success' : 'error'; ?>">
                <?php echo $responseMessage; ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($errorString)): ?>
            <ul class="error">
                <?php foreach ($errors as $error): ?>
                    <?php if (!empty($error)): ?>
                        <li><?php echo $error; ?></li>
                    <?php endif; ?>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>

        <!-- Theme Toggle -->
        <div class="theme-toggle">
            <h3>Theme Preference</h3>
            <p>Current theme: <strong><?php echo ucfirst($theme); ?></strong></p>
            <form method="post" action="">
                <button type="submit" name="set_theme" value="<?php echo $theme === 'light' ? 'dark' : 'light'; ?>">
                    Switch to <?php echo $theme === 'light' ? 'Dark' : 'Light'; ?> Theme
                </button>
            </form>
            <p><small>Your theme preference is stored in a cookie for 30 days.</small></p>
        </div>

        <!-- Session Information -->
        <div class="session-info">
            <h3>Your Session Information</h3>
            <p>Visit count: <?php echo $_SESSION['visit_count'] ?? 0; ?></p>
            <?php if (isset($_SESSION['first_visit'])): ?>
                <p>First visit: <?php echo htmlspecialchars($_SESSION['first_visit']); ?></p>
            <?php endif; ?>
            <?php if (isset($_SESSION['last_visit'])): ?>
                <p>Last visit: <?php echo htmlspecialchars($_SESSION['last_visit']); ?></p>
            <?php endif; ?>
            <?php if (isset($_SESSION['contact_submissions'])): ?>
                <p>Contact forms submitted: <?php echo $_SESSION['contact_submissions']; ?></p>
            <?php endif; ?>
            <?php if (isset($_COOKIE['visitor_email'])): ?>
                <p>Saved email: <?php echo htmlspecialchars($_COOKIE['visitor_email']); ?></p>
            <?php endif; ?>

            <a href="?end_session=true" class="btn">End Session</a>
        </div>

        <!-- Link back to the contact form page -->
        <p><a href="/" class="btn">Return to Contact Form</a></p>
    </div>
</body>

</html>