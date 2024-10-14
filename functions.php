<?php
// Enqueue des styles et scripts
function motaphoto_enqueue_assets() {
    // Enqueue du fichier CSS principal
    wp_enqueue_style('main-style', get_stylesheet_uri());

    wp_enqueue_script('jquery');

    // Enqueue du script JS principal
    wp_enqueue_script('main-script', get_template_directory_uri() . '/js/scripts.js');

    // Enqueue du script pour la pagination infinie
    wp_enqueue_script('infinite-pagination', get_template_directory_uri() . '/js/infinite-pagination.js');

    // Localisation du script pour passer l'URL AJAX
    wp_localize_script('infinite-pagination', 'wp_data', array(
        'ajax_url' => admin_url('admin-ajax.php'), // URL pour AJAX
    ));
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_assets');

// Enregistrement du menu
function motaphoto_register_menus() {
    register_nav_menus(array(
        'main-menu' => __('Main Menu', 'motaphoto'),
    ));
}
add_action('init', 'motaphoto_register_menus');

// Ajout des termes à la taxonomie "format"
function ajouter_terms_format() {
    wp_insert_term('Paysage', 'format');
    wp_insert_term('Portrait', 'format');
}
add_action('init', 'ajouter_terms_format');

// Setup du thème (ex. : support pour les tailles d'images)
function custom_theme_setup() {
    // Ajout d'une taille d'image personnalisée
    add_image_size('hero', 1920, 1080, true); // Ajuste les dimensions selon tes besoins
}
add_action('after_setup_theme', 'custom_theme_setup');

// Fonction pour charger plus de photos via AJAX
function load_more_photos() {
    $paged = isset($_POST['page']) ? intval($_POST['page']) : 1;

    // Si la page n'est pas valide
    if (!$paged || $paged <= 1) {
        echo ''; 
        wp_die();
    }

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
        'paged' => $paged
    );

    $photo_query = new WP_Query($args);

    if ($photo_query->have_posts()) {
        ob_start(); // Commence la mise en tampon de sortie
        while ($photo_query->have_posts()) {
            $photo_query->the_post();
            ?>
            <div class="photo-item">
                <?php if (has_post_thumbnail()) : ?>
                    <a href="<?php the_permalink(); ?>">
                        <?php the_post_thumbnail('large'); ?>
                    </a>
                <?php endif; ?>
            </div>
            <?php
        }
        $output = ob_get_clean(); // Récupère la sortie mise en tampon
        echo $output; // Affiche le contenu des nouveaux éléments
    } else {
        echo ''; // Si aucune nouvelle publication trouvée
    }

    wp_reset_postdata();
    wp_die();
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');
