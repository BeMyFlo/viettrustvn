<?php
/**
 * Helper script to list wp_navigation menus.
 */
require_once __DIR__ . '/../../../wp-load.php';

$navigations = get_posts([
    'post_type' => 'wp_navigation',
    'post_status' => 'any',
    'posts_per_page' => -1
]);

echo "<h2>Navigation Menus (wp_navigation)</h2>";
if (empty($navigations)) {
    echo "No navigation menus found.";
} else {
    foreach ($navigations as $nav) {
        echo "- ID: {$nav->ID} | Title: <strong>{$nav->post_title}</strong> | Status: {$nav->post_status}<br/>";
        echo "<pre>" . esc_html($nav->post_content) . "</pre><hr/>";
    }
}
?>
