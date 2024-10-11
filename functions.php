<?php
function motaphoto_enqueue_styles() {
    wp_enqueue_style('main-style', get_stylesheet_uri());
    wp_enqueue_script('main-script', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_styles');

function motaphoto_register_menus() {
    register_nav_menus(array(
        'main-menu' => __('Main Menu', 'motaphoto'),
    ));
}
add_action('init', 'motaphoto_register_menus');

// Ajoute des termes à la taxonomie "format"
function ajouter_terms_format() {
    wp_insert_term('Paysage', 'format');
    wp_insert_term('Portrait', 'format');
}
add_action('init', 'ajouter_terms_format');
 
// Gallerie photo
function custom_theme_setup() {
    // Ajout d'une taille d'image personnalisée
    add_image_size('hero', 1920, 1080, true); // Modifie les dimensions selon tes besoins
}
add_action('after_setup_theme', 'custom_theme_setup');

// pagination infinie
function enqueue_ajax_script() {
    wp_enqueue_script('ajax-load', get_template_directory_uri() . '/js/ajax-load.js', array('jquery'), null, true);
    wp_localize_script('ajax-load', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
}
add_action('wp_enqueue_scripts', 'enqueue_ajax_script');

function load_more_photos() {
    // Vérifiez la sécurité avec le nonce
    check_ajax_referer('nathalie_nonce', 'nonce');

    $offset = $_POST['offset'];
    $limit = $_POST['limit'];

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => $limit,
        'offset' => $offset,
    );

    $query = new WP_Query($args);

    if($query->have_posts()) {
        while($query->have_posts()) {
            $query->the_post();
            ?>
            <div class="photo-item">
                <?php if (has_post_thumbnail()) : ?>
                    <a href="<?php the_permalink(); ?>">
                        <?php the_post_thumbnail('medium'); ?>
                    </a>
                <?php endif; ?>
            </div>
            <?php
        }
    } else {
        echo ''; // Aucune photo trouvée
    }

    wp_reset_postdata();
    wp_die(); // Toujours appeler wp_die() à la fin de l'action AJAX
}