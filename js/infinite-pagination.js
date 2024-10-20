jQuery(document).ready(function ($) {
    console.log('Le script infinite-pagination.js est chargé.');

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
                        console.log('Chargement page : ' + page + ' / ' + response.max_num_pages);
                        
                        // Ajouter les nouvelles photos à la grille
                        $('.photo-grid').append(response.data); 

                        // Réinitialiser le texte du bouton
                        $loadMoreButton.text('Charger plus'); 

                        // Si on a atteint la dernière page
                        if (page == response.max_num_pages) {
                            $loadMoreButton.text('Fin des publications');
                            $loadMoreButton.prop("disabled", true); // Désactiver le bouton
                        } else {
                            page++; // Incrémenter la page
                        }

                        // Réattacher les événements de la lightbox aux nouvelles photos
                        attachLightboxEvents();

                    } else {
                        // Si aucune nouvelle publication n'est trouvée ou toutes les pages sont chargées
                        $loadMoreButton.text('Fin des publications');
                        $loadMoreButton.prop("disabled", true);
                    }

                    loading = false; // Fin du chargement
                },
                error: function (xhr, status, error) {
                    console.error('Erreur AJAX:', error); // Afficher les erreurs dans la console
                    $loadMoreButton.text('Erreur de chargement');
                    loading = false; // Fin du chargement même s'il y a une erreur
                }
            });
        }
    });

    // Initialisation des événements de la lightbox
    attachLightboxEvents();
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

//modal contact photo
document.addEventListener("DOMContentLoaded", function () {
    const contactBtns = document.querySelectorAll(".contact"); // Sélectionne tous les boutons de contact

    contactBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche le comportement par défaut

            // Récupérer la référence de la photo depuis l'attribut data
            const refPhoto = this.dataset.reference; // Récupère la valeur de data-reference

            // Vérifiez si refPhoto contient un texte
            if (refPhoto) {
                // Remplir le champ caché avec la référence de la photo
                document.getElementById("reference").value = refPhoto;

                // Ouvrir la modal (si vous avez une modal pour le formulaire)
                const modalOverlay = document.querySelector(".modal-overlay");
                modalOverlay.classList.remove("hidden"); // Affiche l'overlay
                const modalContact = document.querySelector(".modal-contact");
                modalContact.classList.add("open");
                modalContact.classList.remove("modal-hidden");
            } else {
                console.error("Aucune référence trouvée !");
            }
        });
    });
});



// contact single photo
jQuery(document).ready(function ($) {
    // Initialisation des événements de la lightbox
    attachLightboxEvents();

    // Gestion de la modal contact
    $('.contact').on('click', function (e) {
        e.preventDefault(); // Empêche l'action par défaut
        console.log("Bouton de contact cliqué");

        const modalOverlay = $('.modal-overlay');
        const modalContact = $('.modal-contact');

        modalOverlay.removeClass("hidden"); // Affiche l'overlay
        modalContact.addClass("open"); // Ajoute la classe 'open' pour afficher la modal
        modalContact.removeClass("modal-hidden"); // Enlève la classe qui cache la modal
    });

    // Fermeture de la modal au clic en dehors du formulaire
    $('.modal-overlay').on('click', function (e) {
        if (e.target === this) {
            $(this).addClass("hidden"); // Cache l'overlay
            $('.modal-contact').removeClass("open").addClass("modal-hidden"); // Cache la modal
        }
    });
});


