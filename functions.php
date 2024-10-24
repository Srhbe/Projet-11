<?php
// Enqueue des styles et scripts
function motaphoto_enqueue_assets() {
    // Enqueue du fichier CSS principal
    wp_enqueue_style('main-style', get_stylesheet_uri());

    // Enqueue jQuery
    wp_enqueue_script('jquery');

    // Enqueue du script JS principal
    wp_enqueue_script('main-script', get_template_directory_uri() . '/js/scripts.js', array('jquery'));

    // Enqueue du script pour la pagination infinie
    wp_enqueue_script('infinite-pagination', get_template_directory_uri() . '/js/infinite-pagination.js', array('jquery'));

    // Localisation du script pour passer l'URL AJAX
    wp_localize_script('infinite-pagination', 'wp_data', array(
        'ajax_url' => admin_url('admin-ajax.php'),
    ));

    // Enqueue du script pour la modal contact
    wp_enqueue_script('modal-contact', get_template_directory_uri() . '/js/modal-contact.js', array('jquery'));

    // Enqueue du script pour le menu burger
    wp_enqueue_script('burger', get_template_directory_uri() . '/js/burger.js', array('jquery'));
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_assets');

function theme_enqueue_scripts() {
    // Enqueue du fichier JS pour la lightbox
    wp_enqueue_script('lightbox-js', get_template_directory_uri() . '/js/lightbox.js', array('jquery'));
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

// Enregistrement des menus
function motaphoto_register_menus() {
    register_nav_menus(array(
        'main-menu' => __('Main Menu', 'motaphoto'),
    ));
}
add_action('init', 'motaphoto_register_menus');

// Ajout des termes à la taxonomie "format"
function ajouter_terms_format() {
    wp_insert_term('Paysage', 'formats');
    wp_insert_term('Portrait', 'formats');
}
add_action('init', 'ajouter_terms_format');

// Setup du thème (ajout des tailles d'images)
function custom_theme_setup() {
    add_image_size('hero', 1920, 1080, true); // Taille personnalisée pour les images
}
add_action('after_setup_theme', 'custom_theme_setup');

// Chargement de plus de photos via AJAX
function load_more_photos() {
    $paged = isset($_POST['page']) ? intval($_POST['page']) : 1;

    if (!$paged || $paged <= 1) {
        echo '';
        wp_die();
    }

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
        'paged' => $paged,
    );

    $photo_query = new WP_Query($args);

    if ($photo_query->have_posts()) {
        ob_start();
        while ($photo_query->have_posts()) {
            $photo_query->the_post();
            get_template_part('templates-part/photo-item');
        }
        $output = ob_get_clean();
        $response = array(
            'data' => $output,
            'max_num_pages' => $photo_query->max_num_pages,
        );
        echo json_encode($response);
    } else {
        echo '';
    }

    wp_reset_postdata();
    wp_die();
}
add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');

// Envoi du formulaire de contact via AJAX
add_action('wp_ajax_send_contact_form', 'send_contact_form');
add_action('wp_ajax_nopriv_send_contact_form', 'send_contact_form');

function send_contact_form() {
    if (isset($_POST['your_name']) && isset($_POST['your_email'])) {
        $name = sanitize_text_field($_POST['your_name']);
        $email = sanitize_email($_POST['your_email']);
        $message = isset($_POST['your_message']) ? sanitize_textarea_field($_POST['your_message']) : '';

        $to = get_option('admin_email');
        $subject = "Nouveau message de $name";
        $body = "Nom: $name\nEmail: $email\nMessage:\n$message";
        $headers = array('Content-Type: text/plain; charset=UTF-8');

        if (wp_mail($to, $subject, $body, $headers)) {
            wp_send_json(array('success' => true));
        } else {
            wp_send_json(array('success' => false, 'message' => 'Erreur d\'envoi de l\'email.'));
        }
    } else {
        wp_send_json(array('success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.'));
    }

    wp_die();
}

// Enqueue des scripts pour les filtres
function my_enqueue_scripts() {
    wp_localize_script('custom-filter', 'wp_data', array(
        'ajax_url' => admin_url('admin-ajax.php'),
    ));
}
add_action('wp_enqueue_scripts', 'my_enqueue_scripts');

// Filtrer les photos via AJAX
function filter_photos() {
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $order = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'DESC';

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
        'order' => $order,
        'orderby' => 'date',
        'tax_query' => array(
            'relation' => 'AND',
        ),
    );

    if (!empty($category)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $category,
        );
    }

    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        ob_start();
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('templates-part/photo-item');
        }
        $data = ob_get_clean();
        wp_send_json_success($data);
    } else {
        wp_send_json_error('Aucune photo trouvée.');
    }

    wp_die();
}
add_action('wp_ajax_filter_photos', 'filter_photos');
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos');

// Générer dynamiquement les catégories dans le filtre
function get_categories_for_filter() {
    $categories = get_terms([
        'taxonomy' => 'categorie',
        'hide_empty' => true,
    ]);

    if (!empty($categories) && !is_wp_error($categories)) {
        foreach ($categories as $category) {
            echo '<option value="' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</option>';
        }
    } else {
        echo '<option value="">Aucune catégorie disponible</option>';
    }
}

function get_formats_for_filter() {
    $formats = get_terms([
        'taxonomy' => 'format',
        'hide_empty' => true,
    ]);

    if (!empty($formats) && !is_wp_error($formats)) {
        foreach ($formats as $format) {
            echo '<option value="' . esc_attr($format->slug) . '">' . esc_html($format->name) . '</option>';
        }
    } else {
        echo '<option value="">Aucun format disponible</option>';
    }
}

// Récupérer les catégories ACF et les passer à JavaScript
function get_acf_categories() {
    return get_field('categorie', 'option');
}

function enqueue_my_scripts() {
    wp_enqueue_script('my-script', get_template_directory_uri() . '/js/my-script.js', array('jquery'), '1.0', true);
    wp_localize_script('my-script', 'wp_data', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'categories' => get_acf_categories(),
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_my_scripts');