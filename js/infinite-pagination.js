console.log('Le script infinite-pagination.js est chargé');
// code pagination ne fonctionne pas
jQuery(document).ready(function ($) {
    console.log('Le script est chargé.'); // Vérifiez si le script s'exécute.

    var page = 2; // La page à charger
    var loading = false; 
    var $loadMoreButton = $('#load-more');

    $loadMoreButton.on('click', function () {
        if (!loading) {
            loading = true;
            $loadMoreButton.text('Chargement en cours...'); 

            $.ajax({
                type: 'POST',
                url: wp_data.ajax_url, // URL de l'AJAX définie dans functions.php
                data: {
                    action: 'load_more_photos', 
                    page: page // Passer la page
                },
                success: function (response) {
                    if (response) {
                        $('.photo-grid').append(response); // Ajouter les nouvelles photos
                        $loadMoreButton.text('Charger plus'); // Réinitialiser le texte
                        page++; // Incrémenter la page
                    } else {
                        $loadMoreButton.text('Fin des publications'); // Si plus de publications
                    }
                    loading = false; // Fin du chargement
                },
                error: function (xhr, status, error) {
                    console.error('Erreur AJAX:', error); // Afficher les erreurs dans la console
                    loading = false; // Fin du chargement même s'il y a une erreur
                }
            });
        }
    });
});

