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
            <div class="photo-item">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('large'); ?>
                        <div class="overlay"> <!-- Overlay pour chaque photo -->
                            <div class="overlay-title"><?php the_title(); ?></div>
                            <div class="overlay-category">
                                <?php
                                    $categories = get_the_category();
                                    if (!empty($categories)) {
                                        // Récupère le nom de la première catégorie
                                        echo esc_html($categories[0]->name);
                                    } else {
                                        echo 'Sans catégorie'; // Affiche un message si aucune catégorie n'est assignée
                                    }
                                    ?>
                            </div>
                            <div class="fullscreen-background">
                                <div class="fullscreen-icon">
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/fullscreen.png" alt="Plein écran" />
                                    </div>
                                </div>
                                <a href="<?php the_permalink(); ?>">
                                    <div class="eye-icon">
                                        <img src="<?php echo get_template_directory_uri(); ?>/assets/eye.png" alt="Voir" />
                                    </div>
                                </a>
                                </div>
                        </div>
                <?php endif; ?>
            </div>
            
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

