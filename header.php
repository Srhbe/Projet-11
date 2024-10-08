<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header>
    <div class="container">
        <!-- Logo -->
        <div class="logo">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.png" alt="Logo du site">
            </a>
        </div>

        <!-- Menu -->
        <nav class="main-menu">
            <?php
                wp_nav_menu(array(
                    'theme_location' => 'main-menu',
                    'container' => 'ul', // Supprime le conteneur div par défaut
                    'menu_class' => 'nav-menu' // Classe personnalisée pour le menu
                ));
            ?>
        </nav>
    </div>
</header>
