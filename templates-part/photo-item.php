<div class="photo-item">
                <?php if (has_post_thumbnail()) : ?>
                        <?php the_post_thumbnail('large'); // Utiliser une taille d'image plus grande ?>
                        <div class="overlay">
                            <div class="overlay-title"><?php the_title(); ?></div>
                            <div class="overlay-category">
                            <?php
                                $categories = (get_the_terms(get_the_ID(), 'categorie'));
                                //var_dump($categories); // Cela affichera toutes les catégories associées à la publication
                                
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
                <?php endif; ?>
            </div>
