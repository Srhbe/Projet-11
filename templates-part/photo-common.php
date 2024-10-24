<?php
// Récupération de la catégorie de la photo courante
$categorie_terms = get_the_terms(get_the_ID(), 'categorie'); 

// Vérification si des termes sont retournés
if ($categorie_terms && !is_wp_error($categorie_terms)) {
    // Récupérer l'ID du premier terme
    $categorie_id = $categorie_terms[0]->term_id; 

    // Arguments de la requête pour récupérer les photos de la même catégorie
    $custom_args = array(
        'post_type' => 'photo', 
        'posts_per_page' => 2,
        'post__not_in' => array(get_the_ID()), // Exclut la photo courante
        'tax_query' => array(
            array(
                'taxonomy' => 'categorie',
                'field'    => 'term_id',   
                'terms'    => array($categorie_id), //tableau pour le terme
            )
        ),
    );

    // Exécution de la requête
    $query = new WP_Query($custom_args);

    // Vérification si des photos sont trouvées
    if ($query->have_posts()) : ?>
        <div class="related-photos container-common flexrow">
            <?php while ($query->have_posts()) : $query->the_post(); ?>
            <?php get_template_part( 'templates-part/photo-item' ); ?>
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
