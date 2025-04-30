<?php
// includes/validation.php

// check string length
function validateLength(string $s, int $min, int $max): bool {
    $len = mb_strlen(trim($s));
    return ($len >= $min && $len <= $max);
}

// check number range
function validateNumber($n, int $min, int $max): bool {
    return is_numeric($n) && $n >= $min && $n <= $max;
}

// check option allowed
function validateOption(string $opt, array $allowed): bool {
    return in_array($opt, $allowed, true);
}
