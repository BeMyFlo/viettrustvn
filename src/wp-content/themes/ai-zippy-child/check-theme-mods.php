<?php
/**
 * Check theme mods.
 */
require_once __DIR__ . '/../../../wp-load.php';

echo "<h2>Theme Mods for " . get_stylesheet() . "</h2>";
$mods = get_theme_mods();
echo "<pre>" . print_r($mods, true) . "</pre>";
?>
