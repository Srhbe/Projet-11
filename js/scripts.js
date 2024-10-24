// Bouton charger plus & filtres
let nbrPhotoAffiche = 8; // Initialiser le nombre de photos à afficher
let reload = true; // Indique si le container doit être vidé avant de charger de nouvelles photos

jQuery(document).ready(function ($) {
    // Lorsque l'utilisateur modifie un filtre
    $('#category-filter, #format-filter, #sort-filter').on('change', function () {
        nbrPhotoAffiche = 8; // Réinitialiser le nombre de photos à afficher
        reload = true; // Activer le rechargement du container
        loadFiltrePhoto(); // Appeler la fonction pour charger les photos avec les filtres appliqués
    });

    // Fonction AJAX pour charger les photos en fonction des filtres sélectionnés
    function loadFiltrePhoto() {
        var category = $('#category-filter').val();
        var format = $('#format-filter').val();
        var order = $('#sort-filter').val(); 

        // Débogage
        console.log('Filtre catégorie:', category); 
        console.log('Filtre format:', format); 
        console.log('Tri:', order); 

        // Envoi de la requête AJAX
        $.ajax({
            type: 'POST',
            url: wp_data.ajax_url, // URL AJAX fournie via wp_localize_script dans WordPress
            data: {
                action: 'filter_photos', // Action définie côté serveur (PHP)
                category: category, 
                format: format,
                order: order, 
                nbrPhotoAffiche: nbrPhotoAffiche
            },
            success: function (response) {
                console.log(response); // Débogage : voir la réponse du serveur
                if (response.success) {
                    // Si le flag "reload" est vrai, vider la grille avant d'ajouter les nouvelles photos
                    if (reload) {
                        $('.photo-grid').html(''); // Vider la galerie de photos
                        reload = false; // Désactiver le rechargement après avoir vidé la grille
                    }
                    // Ajouter les nouvelles photos dans la grille
                    $('.photo-grid').append(response.data);

                    // Réattacher les événements Lightbox aux nouvelles images
                    attachLightboxEvents();

                    // Si des photos supplémentaires sont disponibles, montrer le bouton "Charger plus"
                    if (response.has_more_posts) {
                        $('#load-more').show(); 
                    } else {
                        $('#load-more').text('Fin de publication').show();
                    }
                } else {
                    // Si aucune photo n'a été trouvée
                    $('.photo-grid').html('<p>Aucune photo trouvée.</p>');
                    $('#load-more').hide(); 
                }
            },
            error: function (xhr, status, error) {
                console.error('Erreur lors du chargement des photos :', error); // En cas d'erreur AJAX
            }
        });
    }

    // Gestion du bouton "Charger plus" pour la pagination
    $('#load-more').on('click', function () {
        nbrPhotoAffiche += 8; // Augmente le nombre de photos à afficher de 8
        loadFiltrePhoto(); // Recharge les photos avec les nouveaux paramètres
    });

    // Gérer l'apparition/disparition des labels lors du focus/blur des filtres
    $('.filter-group select').on('focus', function () {
        $(this).siblings('label').css('opacity', '0'); // Cache le label lorsque le select est focus
    });

    $('.filter-group select').on('blur', function () {
        if ($(this).val() === "") {
            $(this).siblings('label').css('opacity', '1'); // Montre le label si aucune option n'est sélectionnée
        }
    });

    // Cache le label si une valeur est sélectionnée, sinon le montre
    $('.filter-group select').on('change', function () {
        if ($(this).val() !== "") {
            $(this).siblings('label').css('opacity', '0'); // Cache le label si une option est sélectionnée
        } else {
            $(this).siblings('label').css('opacity', '1'); // Montre le label si aucune option
        }
    });
});