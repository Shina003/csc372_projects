<?php
// public/contact.php
session_start();
require_once __DIR__ . '/../includes/validation.php';

class Visitor {
    public string $name;
    public int    $age;
    public string $favoriteColor;

    public function __construct(string $name, int $age, string $favoriteColor) {
        $this->name          = $name;
        $this->age           = $age;
        $this->favoriteColor = $favoriteColor;
    }

    public function greet(): string {
        return "Hello, {$this->name}! You are {$this->age} years old.";
    }
}

// instantiate two example Visitors
$alice = new Visitor("Alice", 30, "Blue");
$bob   = new Visitor("Bob",   25, "Green");

// Prepare error storage and default form values
$errors = [];
$name  = $age = $favoriteColor = '';

// Handle POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // grab raw inputs
    $name  = $_POST['name']  ?? '';
    $age   = $_POST['age']   ?? '';
    $favoriteColor = $_POST['favoriteColor'] ?? '';

    // validate
    if (! validateLength($name, 3, 50)) {
        $errors['name'] = "Name must be between 3 and 50 characters.";
    }
    if (! validateNumber($age, 1, 120)) {
        $errors['age'] = "Age must be a number between 1 and 120.";
    }
    $allowedColors = ['Red','Green','Blue','Yellow'];
    if (! validateOption($favoriteColor, $allowedColors)) {
        $errors['favoriteColor'] = "Please choose a valid color.";
    }

    // if no errors, store in session & cookie and show success
    if (empty($errors)) {
        $_SESSION['visitor'] = ['name'=>$name,'age'=>$age,'color'=>$favoriteColor];
        setcookie('lastVisitor', $name, time()+3600); // 1h
        $success = "Your data is valid!";
    }
}
?>
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Contact</title></head>
<body>

  <h1>Our Two Example Visitors</h1>
  <p><?= htmlspecialchars($alice->greet()) ?></p>
  <p><?= htmlspecialchars($bob->greet()) ?></p>

  <?php if (!empty($success)): ?>
    <p style="color:green"><?= htmlspecialchars($success) ?></p>
  <?php endif; ?>

  <form action="contact.php" method="post">
    <label>
      Name: <input type="text" name="name" value="<?= htmlspecialchars($name) ?>">
      <?php if (isset($errors['name'])): ?>
        <span style="color:red"><?= htmlspecialchars($errors['name']) ?></span>
      <?php endif; ?>
    </label><br>

    <label>
      Age: <input type="number" name="age" value="<?= htmlspecialchars($age) ?>">
      <?php if (isset($errors['age'])): ?>
        <span style="color:red"><?= htmlspecialchars($errors['age']) ?></span>
      <?php endif; ?>
    </label><br>

    <label>
      Favorite Color:
      <select name="favoriteColor">
        <option value="">--Select--</option>
        <?php foreach ($allowedColors as $c): ?>
          <option value="<?= $c ?>"
            <?= ($favoriteColor === $c) ? 'selected' : '' ?>>
            <?= $c ?>
          </option>
        <?php endforeach; ?>
      </select>
      <?php if (isset($errors['favoriteColor'])): ?>
        <span style="color:red"><?= htmlspecialchars($errors['favoriteColor']) ?></span>
      <?php endif; ?>
    </label><br>

    <button type="submit">Submit</button>
  </form>

  <?php if (!empty($_SESSION['visitor'])): ?>
    <h2>Session Data</h2>
    <pre><?= print_r($_SESSION['visitor'], true) ?></pre>
  <?php endif; ?>

  <?php if (isset($_COOKIE['lastVisitor'])): ?>
    <p>Your last visit was by <?= htmlspecialchars($_COOKIE['lastVisitor']) ?></p>
  <?php endif; ?>

</body>
</html>
