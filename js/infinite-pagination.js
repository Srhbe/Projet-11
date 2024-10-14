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
                dataType: 'json',
                data: {
                    action: 'load_more_photos', 
                    page: page, // Passer la page
                },
                success: function (response) {
                    if (response.data && page <= response.max_num_pages) {
                        console.log(response.max_num_pages + '<=' + page)
                        $('.photo-grid').append(response.data); // Ajouter les nouvelles photos
                        $loadMoreButton.text('Charger plus'); // Réinitialiser le texte
                        if (page == response.max_num_pages) {
                            $loadMoreButton.text('Fin des publications'); // Si plus de publications 
                            $loadMoreButton.prop("disabled",true);
                        }
                        else {
                            page++; // Incrémenter la page
                        }
                    } else {
                        $loadMoreButton.text('Fin des publications'); // Si plus de publications
                        $loadMoreButton.prop("disabled",true);
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

// modal contact
document.addEventListener("DOMContentLoaded", function () {
    const contactBtn = document.querySelector(".contact");
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalContact = document.querySelector(".modal-contact");

    // Ouverture de la modal au clic sur le lien "Contact"
    contactBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Empêche l'action par défaut
        console.log("Bouton de contact cliqué");
        modalOverlay.classList.remove("hidden"); // Affiche l'overlay
        modalContact.classList.add("open"); // Ajoute la classe 'open' pour afficher la modal
        modalContact.classList.remove("modal-hidden"); // Enlève la classe qui cache la modal
    });

    // Fermeture de la modal au clic en dehors du formulaire
    modalOverlay.addEventListener("click", function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add("hidden"); // Cache l'overlay
            modalContact.classList.remove("open"); // Enlève la classe 'open'
            modalContact.classList.add("modal-hidden"); // Ajoute la classe pour cacher la modal
        }
    });
});
