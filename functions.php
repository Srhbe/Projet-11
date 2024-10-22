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

function theme_enqueue_scripts() {
    // Charger le fichier JS de la lightbox
    wp_enqueue_script('lightbox-js', get_template_directory_uri() . '/js/lightbox.js', array('jquery'));
}

add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');


// Enregistrement du menu
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

// Setup du thème (ex. : support pour les tailles d'images)
function custom_theme_setup() {
    // Ajout d'une taille d'image personnalisée
    add_image_size('hero', 1920, 1080, true); // Ajuste les dimensions selon tes besoins
}
add_action('after_setup_theme', 'custom_theme_setup');

// Fonction pour charger plus de photos via AJAX
function load_more_photos() {
    $paged = isset($_POST['page']) ? intval($_POST['page']) : 1;
//var_dump($paged);
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
//    var_dump($photo_query->max_num_pages);

    if ($photo_query->have_posts()) {
        ob_start(); // Commence la mise en tampon de sortie
        while ($photo_query->have_posts()) {
            $photo_query->the_post(); ?>
            <?php get_template_part( 'templates-part/photo-item' ); ?>            
            <?php
        }
        $output = ob_get_clean(); // Récupère la sortie mise en tampon
        $response['data'] = $output;
        $response['max_num_pages'] = $photo_query->max_num_pages;
        echo json_encode($response); // Affiche le contenu des nouveaux éléments
    } else {
        echo ''; // Si aucune nouvelle publication trouvée
    }

    wp_reset_postdata();
    wp_die();
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');



// contact 
add_action('wp_ajax_send_contact_form', 'send_contact_form');
add_action('wp_ajax_nopriv_send_contact_form', 'send_contact_form');

function send_contact_form() {
    // Vérifie que le nom et l'email sont présents, mais pas la référence photo
    if ( isset($_POST['your_name']) && isset($_POST['your_email']) ) {
        // Récupération des données
        $name = sanitize_text_field($_POST['your_name']);
        $email = sanitize_email($_POST['your_email']);
        $message = isset($_POST['your_message']) ? sanitize_textarea_field($_POST['your_message']) : ''; // Gestion de message

        // Ici, tu peux traiter les données, par exemple, les envoyer par e-mail
        $to = get_option('admin_email'); // ou une autre adresse
        $subject = "Nouveau message de $name";
        $body = "Nom: $name\nEmail: $email\nMessage:\n$message";
        $headers = array('Content-Type: text/plain; charset=UTF-8');

        // Envoi de l'e-mail
        if ( wp_mail($to, $subject, $body, $headers) ) {
            wp_send_json(array('success' => true));
        } else {
            wp_send_json(array('success' => false, 'message' => 'Erreur d\'envoi de l\'email.'));
        }
    } else {
        wp_send_json(array('success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.'));
    }

    wp_die(); // Toujours appeler wp_die() à la fin de l'action AJAX
}

//filtres
function my_enqueue_scripts() {
    // Passer les données nécessaires à JavaScript via wp_localize_script
    wp_localize_script('custom-filter', 'wp_data', array(
        'ajax_url' => admin_url('admin-ajax.php'), // URL pour les requêtes AJAX
    ));
}
add_action('wp_enqueue_scripts', 'my_enqueue_scripts');

//capturer les filtres
function filter_photos() {
    // Vérification des paramètres envoyés
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $order = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'DESC'; // Trier par date descendante par défaut

    // Arguments de la requête WP_Query
    $args = array(
        'post_type' => 'photo', // Modifier selon ton type de publication
        'posts_per_page' => 8,
        'order' => $order,
        'orderby' => 'date',
        'tax_query' => array(
            'relation' => 'AND',
        ),
    );

    // Ajouter le filtre de catégorie s'il est défini
    if (!empty($category)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie', // Taxonomie pour la catégorie
            'field' => 'slug',
            'terms' => $category,
        );
    }

    // Ajouter le filtre de format s'il est défini
    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format', // Taxonomie pour le format
            'field' => 'slug',
            'terms' => $format,
        );
    }

    // Effectuer la requête WP_Query
    $query = new WP_Query($args);

    // Vérifier s'il y a des résultats
    if ($query->have_posts()) {
        ob_start();
        while ($query->have_posts()) : $query->the_post();
            // Ton HTML pour afficher les photos
            // Par exemple :
            ?>
            <?php get_template_part( 'templates-part/photo-item' ); ?>
            <?php
        endwhile;
        $data = ob_get_clean();

        // Envoyer la réponse en JSON
        wp_send_json_success($data);
    } else {
        // Si aucun résultat, renvoyer un message vide
        wp_send_json_error('Aucune photo trouvée.');
    }

    wp_die(); // Finir proprement la requête AJAX
}
add_action('wp_ajax_filter_photos', 'filter_photos');
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos');
 
// Fonction pour générer dynamiquement les catégories dans le filtre
function get_categories_for_filter() {
    // Obtenir les termes de la taxonomie 'category'
    $categories = get_terms([
        'taxonomy' => 'categorie',
        'hide_empty' => true, // Ne pas afficher les catégories vides
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
    // Obtenir les termes de la taxonomie 'format'
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


// Récupérer les catégories ACF
function get_acf_categories() {
    $categories = get_field('categorie', 'option'); // 'option' si les catégories sont des champs d'options
    return $categories;
}

// Pour passer les catégories à JavaScript
add_action('wp_enqueue_scripts', 'enqueue_my_scripts');
function enqueue_my_scripts() {
    wp_enqueue_script('my-script', get_template_directory_uri() . '/js/my-script.js', array('jquery'), '1.0', true);
    wp_localize_script('my-script', 'wp_data', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'categories' => get_acf_categories() // Passe les catégories à JavaScript
    ));
} 