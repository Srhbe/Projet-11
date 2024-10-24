<?php
// single-photo.php

get_header(); // Inclusion de l'en-tête du site

// Vérification s'il y a des posts à afficher
if( have_posts() ) : while( have_posts() ) : the_post(); ?>
    
    <section class="photo_detail">
        <!-- Inclusion du template pour afficher les détails de la photo -->
        <?php get_template_part( 'templates-part/photo-detail'); ?>
        
        <!-- Section de contact pour la photo -->
        <div class="photo__contact flexrow">
            <p>Cette photo vous intéresse ?  
                <!-- Bouton de contact avec une référence photo dynamique -->
                <button class="btn" type="button">
                    <a href="#" class="contact" data-reference="<?php echo esc_attr(get_field('reference')); ?>">
                        Contact
                    </a>
                </button>
            </p>

            <!-- Navigation entre les photos (Précédente/Suivante) -->
            <div class="site__navigation flexrow">
                
                <!-- Lien vers la photo précédente -->
                <div class="site__navigation__prev">
                    <?php
                    $prev_post = get_previous_post(); // Obtenir la photo précédente
                    if($prev_post) {
                        $prev_title = strip_tags(str_replace('"', '', $prev_post->post_title));
                        $prev_post_id = $prev_post->ID;
                        
                        echo '<a rel="prev" href="' . get_permalink($prev_post_id) . '" title="' . $prev_title . '" class="previous_post">';
                        
                        // Affichage de la miniature de la photo précédente si disponible
                        if (has_post_thumbnail($prev_post_id)) {
                            echo '<div>' . get_the_post_thumbnail($prev_post_id, array(77, 60)) . '</div>';
                        } else {
                            // Image par défaut si aucune miniature n'est disponible
                            echo '<img src="'. get_stylesheet_directory_uri() .'/assets/no-image.jpeg" alt="Pas de photo" width="77px"><br>';
                        }

                        // Icône pour la navigation vers la photo précédente
                        echo '<img src="'. get_stylesheet_directory_uri() .'/assets/precedent.png" alt="Photo précédente"></a>';
                    }
                    ?>
                </div>

                <!-- Lien vers la photo suivante -->
                <div class="site__navigation__next">
                    <?php
                    $next_post = get_next_post(); // Obtenir la photo suivante
                    if($next_post) {
                        $next_title = strip_tags(str_replace('"', '', $next_post->post_title));
                        $next_post_id = $next_post->ID;

                        echo '<a rel="next" href="' . get_permalink($next_post_id) . '" title="' . $next_title . '" class="next_post">';

                        // Affichage de la miniature de la photo suivante si disponible
                        if (has_post_thumbnail($next_post_id)) {
                            echo '<div>' . get_the_post_thumbnail($next_post_id, array(77, 60)) . '</div>';
                        } else {
                            // Image par défaut si aucune miniature n'est disponible
                            echo '<img src="'. get_stylesheet_directory_uri() .'/assets/no-image.jpeg" alt="Pas de photo" width="77px"><br>';
                        }

                        // Icône pour la navigation vers la photo suivante
                        echo '<img src="'. get_stylesheet_directory_uri() .'/assets/suivant.png" alt="Photo suivante"></a>';
                    }
                    ?>
                </div>
            </div>
        </div>

        <!-- Section d'affichage des autres photos similaires -->
        <div class="photo__others flexcolumn">
            <h2>Vous aimerez aussi</h2>
            <div class="photo__others--images flexrow">
                <!-- Inclusion du template pour les photos communes -->
                <?php get_template_part('templates-part/photo-common'); ?>
            </div>
            
            <!-- Bouton pour accéder à toutes les photos -->
            <button class="btn btn-all-photos" type="button">
                <a href="<?php echo home_url('/'); ?>" aria-label="Page d'accueil de Nathalie Mota">Toutes les photos</a>
            </button>
        </div>
    </section>

<?php endwhile; endif; // Fin de la boucle des posts ?>

<?php get_footer(); // Inclusion du pied de page du site ?>
