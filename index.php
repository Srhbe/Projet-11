<?php get_header(); // Inclut le header ?>

<div id="content">
    <?php
    if ( have_posts() ) : 
        // Si des articles ou pages existent, boucle pour les afficher
        while ( have_posts() ) : the_post(); ?>
            <h2><?php the_title(); // Affiche le titre de la page ou de l'article ?></h2>
            <div class="content">
                <?php the_content(); // Affiche le contenu principal de la page ou de l'article ?>
            </div>
        <?php endwhile;
    else :
        // Si aucun contenu trouvé, affiche un message
        echo '<p>Aucun contenu trouvé.</p>';
    endif;
    ?>
</div>

<?php get_footer(); // Inclut le footer ?>