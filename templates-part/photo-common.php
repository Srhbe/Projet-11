<?php
// Récupération de la catégorie de la photo courante
$categorie_terms = get_the_terms(get_the_ID(), 'categorie'); // Utilisez 'categorie' comme slug de la taxonomie

// Vérifiez si des termes sont retournés
if ($categorie_terms && !is_wp_error($categorie_terms)) {
    // Récupérer l'ID du premier terme (si plusieurs termes sont associés, choisissez celui qui vous intéresse)
    $categorie_id = $categorie_terms[0]->term_id; // Ou utilisez un autre indice si vous avez besoin d'un terme spécifique

    // Arguments de la requête pour récupérer les photos de la même catégorie
    $custom_args = array(
        'post_type' => 'photo', // Assurez-vous que c'est le bon post type
        'posts_per_page' => 2,
        'post__not_in' => array(get_the_ID()), // Exclut la photo courante
        'tax_query' => array(
            array(
                'taxonomy' => 'categorie', // Nom de la taxonomy
                'field'    => 'term_id',   // Utilisez 'term_id' pour faire correspondre avec l'ID
                'terms'    => array($categorie_id), // Utiliser un tableau pour le terme
            )
        ),
    );

    // Exécution de la requête
    $query = new WP_Query($custom_args);

    // Vérification si des photos sont trouvées
    if ($query->have_posts()) : ?>
        <div class="related-photos container-common flexrow">
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <div class="photo-item brightness">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="thumbnail">
                            <h3 class="overlay-title"><?php the_title(); ?></h3>
                            <p class="overlay-category"><?php echo esc_html(get_the_terms(get_the_ID(), 'categorie')[0]->name); ?></p> <!-- Affichage de la catégorie -->

                            <!-- Image de la photo -->
                            <?php the_post_thumbnail('desktop-home'); ?>

                            <!-- Icônes au survol -->
                            <div class="overlay">
                                <!-- Icône œil pour accéder à la page individuelle -->
                                <a href="<?php the_permalink(); ?>" class="eye-icon" title="Voir les infos">
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/eye.png" alt="Voir les infos">
                                </a>

                                <!-- Icône plein écran pour la lightbox -->
                                <div class="fullscreen-icon" title="Voir en plein écran">
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/fullscreen.png" alt="Plein écran">
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endwhile; ?>
        </div>
    <?php else : ?>
        <p>Aucune photo trouvée.</p>  <!-- Affiche le message si aucune photo n'est trouvée -->
    <?php endif;

    // Réinitialisation de la requête
    wp_reset_postdata();
} else {
    echo '<p>Aucune catégorie trouvée pour la photo actuelle.</p>'; // Message si aucune catégorie n'est trouvée
}
?>
