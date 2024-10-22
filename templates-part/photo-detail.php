<?php 
// Vérifier l'activation de ACF
if ( !function_exists('get_field')) return;
$post_id = get_the_ID(); // Récupère l'ID du post actuel

// Vérifier l'activation de ACF
if ( !function_exists('get_field')) return;

// Récupération des champs personnalisés via ACF
$categorie  = get_the_terms($post_id, 'categorie');  // Champ ACF pour la catégorie
//var_dump($categorie[0]->name);
$formats = get_field('format', $post_id);         // Champ ACF pour le format
$reference = get_field('reference', $post_id);       // Référence (champ ACF)
$type = get_field('type', $post_id);                 // Type (champ ACF)
$annee = get_field('date', $post_id);               // Année (champ ACF)

// Récupère les termes associés à la taxonomie 'format'
$formats_terms = get_the_terms($post_id, 'format');  
// Récupère les termes associés à la taxonomie 'categories'
$categorie_terms = get_the_terms($post_id, 'categorie');
//var_dump($categories_terms);

?>

<article class="container__photo flexcolumn">
    <div class="photo__info flexrow">
        <div class="photo__info--description flexcolumn">
            <h1><?php the_title(); ?></h1>
            <ul class="flexcolumn">
                <!-- Affiche les données ACF -->
                <li class="reference">Référence : 
                    <?php 
                        echo $reference ? esc_html($reference) : 'Inconnue';
                    ?>
                </li>
                <li>Catégorie :
                    <?php 
                        if($categorie) {
                            echo esc_html($categorie[0]->name); 
                        } else {
                            echo 'Inconnue';
                        }
                    ?>
                </li>
                <li>Format :             
                    <?php 
                        // Affiche les formats associés
                        if ($formats_terms && !is_wp_error($formats_terms)) {
                            foreach ($formats_terms as $format) {
                                echo esc_html($format->name) . '<br>'; // Affiche le nom de chaque format associé au post
                            }
                        } else {
                            echo 'Aucun format trouvé pour ce post.';
                        }
                    ?>
                </li>
                <li>Type :              
                    <?php 
                        echo $type ? esc_html($type) : 'Inconnu';
                    ?>
                </li>
                <li>Année : 
                    <?php 
                        echo $annee ? esc_html($annee) : 'Inconnue';
                    ?>
                </li>
            </ul>
        </div>
        <div class="photo__info--image flexcolumn">
            <div class="container--image brightness">
                <!-- Afficher l’image mise en avant -->
                <?php 
                    if ( has_post_thumbnail() ) {
                        the_post_thumbnail('medium_large'); 
                    } else {
                        echo '<img src="chemin/vers/image-par-defaut.jpg" alt="Image par défaut">'; // Optionnel: Image par défaut si pas de thumbnail
                    }
                ?>            
                <span class="openLightbox"></span>
            </div>                     
            <form>
                <input type="hidden" name="postid" class="postid" value="<?php echo esc_attr($post_id); ?>">
            </form>
        </div>         
    </div>
</article>
