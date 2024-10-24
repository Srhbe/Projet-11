jQuery(document).ready(function ($) {
    console.log('Le script infinite-pagination.js est chargé.');

    var page = 2; // Numéro de la page à charger
    var loading = false; // Empêche de lancer plusieurs requêtes en même temps
    var $loadMoreButton = $('#load-more'); 

    // Gestion du clic sur le bouton "Charger plus"
    $loadMoreButton.on('click', function () {
        if (!loading) {
            loading = true; // Empêche un autre clic tant que la requête est en cours
            $loadMoreButton.text('Chargement en cours...');

            // Requête AJAX pour récupérer les nouvelles photos
            $.ajax({
                type: 'POST',
                url: wp_data.ajax_url, // URL définie dans functions.php pour l'appel AJAX
                dataType: 'json', 
                data: {
                    action: 'load_more_photos', 
                    page: page,
                },
                success: function (response) {
                    // Si des données sont renvoyées et qu'il reste des pages à charger
                    if (response.data && page <= response.max_num_pages) {
                        $('.photo-grid').append(response.data); // Ajoute les nouvelles photos à la grille existante
                        $loadMoreButton.text('Charger plus'); 

                        // Si la dernière page est atteinte
                        if (page == response.max_num_pages) {
                            $loadMoreButton.text('Fin des publications').prop("disabled", true); 
                        } else {
                            page++; // Incrémente la page pour la prochaine requête
                        }

                        // Réattache les événements de la lightbox pour les nouvelles images
                        attachLightboxEvents();

                    } else {
                        // Si plus aucune page n'est disponible ou si les données sont vides
                        $loadMoreButton.text('Fin des publications').prop("disabled", true);
                    }
                    loading = false; // Libère la variable pour autoriser un autre clic
                },
                error: function () {
                    console.error('Erreur AJAX'); // Logue en cas d'échec
                    $loadMoreButton.text('Erreur de chargement'); 
                    loading = false; // Libère la variable pour autoriser un autre clic
                }
            });
        }
    });

    // Initialisation des événements de la lightbox au chargement de la page
    attachLightboxEvents();
});