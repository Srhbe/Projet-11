<div class="photo-grid">
    <?php
    // Arguments pour la requête des photos
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8, // Afficher 8 photos par page
        'orderby' => 'date', // Tri par date
        'order' => 'DESC'
    );

    // La requête
    $photo_query = new WP_Query($args);

    // Boucle à travers les résultats
    if ($photo_query->have_posts()) :
        while ($photo_query->have_posts()) : $photo_query->the_post(); ?>
            <?php get_template_part( 'templates-part/photo-item' ); ?>
            <?php endwhile;
    else : ?>
        <p>Aucune photo trouvée.</p>
    <?php endif; ?>
    <?php wp_reset_postdata(); ?>
</div>
<button id="load-more" class="load-more">Charger plus</button>
