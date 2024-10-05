<?php
function motaphoto_enqueue_styles() {
    wp_enqueue_style('main-style', get_stylesheet_uri());
    wp_enqueue_script('main-script', get_template_directory_uri() . '/js/scripts.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_styles');
