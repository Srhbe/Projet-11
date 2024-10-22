// bouton charger plus & filtres
let nbrPhotoAffiche = 8; 
let reload = true; // Flag pour savoir s'il faut vider le container avant d'afficher les nouvelles photos

jQuery(document).ready(function ($) {
    // Quand l'utilisateur change un filtre
    $('#category-filter, #format-filter, #sort-filter').on('change', function () {
        // Réinitialiser les paramètres de pagination et de reload
        nbrPhotoAffiche = 8; 
        reload = true; 
        
        // Appeler la fonction pour charger les photos avec les filtres
        loadFiltrePhoto();
    });

    // Fonction AJAX pour charger les photos en fonction des filtres
    function loadFiltrePhoto() {
        var category = $('#category-filter').val(); // Filtre de catégorie
        var format = $('#format-filter').val(); // Filtre de format
        var order = $('#sort-filter').val(); // Filtre de tri (ordre)
        

        // Log pour débogage
        console.log('Filtre catégorie:', category);
        console.log('Filtre format:', format);
        console.log('Tri:', order);

        $.ajax({
            type: 'POST',
            url: wp_data.ajax_url, // URL AJAX passé via wp_localize_script
            data: {
                action: 'filter_photos', // Action définie dans le PHP
                category: category,
                format: format,
                order: order,
                nbrPhotoAffiche: nbrPhotoAffiche // Nombre de photos à afficher (gestion de la pagination)
            },
            success: function (response) {
                console.log(response); // Vérifie la réponse renvoyée par le serveur
                if (response.success) {
                    // Si "reload" est vrai, on vide la grille avant d'ajouter les nouvelles photos
                    if (reload) {
                        $('.photo-grid').html(''); // Vider le container avant de charger les nouvelles photos
                        reload = false; // Désactiver le flag de reload après le premier chargement
                    }
                    // Ajouter les nouvelles photos à la grille
                    $('.photo-grid').append(response.data);
            
                    // Attacher les événements Lightbox aux nouvelles images
                    attachLightboxEvents();
            
                    // Vérifie s'il y a plus de photos à charger et ajuste le bouton "Charger plus"
                    if (response.has_more_posts) {
                        $('#load-more').show(); // Affiche le bouton si plus de photos sont disponibles
                    } else {
                        $('#load-more').text('Fin de publication').show(); // Change le texte en "Fin de publication"
                    }
                } else {
                    // Si aucune photo n'a été trouvée
                    $('.photo-grid').html('<p>Aucune photo trouvée.</p>');
                    $('#load-more').hide(); // Cache le bouton "Charger plus" si aucun résultat
                }
            },
            
            error: function (xhr, status, error) {
                console.error('Erreur lors du chargement des photos :', error);
            }
        });
    }

    // Gestion du bouton "Charger plus" (pagination)
    $('#load-more').on('click', function () {
        nbrPhotoAffiche += 8; // Incrémente le nombre de photos à afficher par 8
        loadFiltrePhoto(); // Recharge avec plus de photos
    });

    // Gestion des labels au focus/blur des filtres
    $('.filter-group select').on('focus', function () {
        $(this).siblings('label').css('opacity', '0'); // Cache le label lorsque le select est focus
    });

    $('.filter-group select').on('blur', function () {
        if ($(this).val() === "") {
            $(this).siblings('label').css('opacity', '1'); // Montre le label si rien n'est sélectionné
        }
    });

    // Maintenir le label caché si une valeur est sélectionnée
    $('.filter-group select').on('change', function () {
        if ($(this).val() !== "") {
            $(this).siblings('label').css('opacity', '0'); // Cache le label si une option est sélectionnée
        } else {
            $(this).siblings('label').css('opacity', '1'); // Montre le label si rien n'est sélectionné
        }
    });
});

//burger
document.addEventListener('DOMContentLoaded', function () {
    const burgerIcon = document.getElementById('burger-icon');
    const navMenu = document.querySelector('.nav-menu');

    // Activer/désactiver le menu en cliquant sur l'icône burger
    burgerIcon.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        burgerIcon.classList.toggle('active'); // Active l'animation en croix
    });
    document.getElementById('burger-icon').addEventListener('click', function () {
        this.classList.toggle('open');
        document.querySelector('.main-menu').classList.toggle('open');
        document.body.classList.toggle('header-open'); // Ajoute une classe au body pour garder le header blanc
    });
});