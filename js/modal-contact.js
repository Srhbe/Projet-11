// Modal Contact du menu
jQuery(document).ready(function ($) {
    // Initialisation des événements de la lightbox
    attachLightboxEvents();

    // Gestion de la modal contact pour le menu
    $('.contact').on('click', function (e) {
        e.preventDefault(); // Empêche l'action par défaut (ex. redirection de lien)
        console.log("Bouton de contact cliqué");

        const modalOverlay = $('.modal-overlay');
        const modalContact = $('.modal-contact');

        modalOverlay.removeClass("hidden"); //enlève la classe "hidden"
        modalContact.addClass("open"); // affiche la modal
        modalContact.removeClass("modal-hidden");
    });

    // Fermeture de la modal si on clique en dehors du formulaire
    $('.modal-overlay').on('click', function (e) {
        if (e.target === this) { // Vérifie si le clic est bien sur l'overlay
            $(this).addClass("hidden"); // Cache l'overlay (ajoute la classe "hidden")
            $('.modal-contact').removeClass("open").addClass("modal-hidden"); // Cache la modal
        }
    });
});

// Modal Contact avec référence
document.addEventListener("DOMContentLoaded", function () {
    const contactBtns = document.querySelectorAll(".contact"); 
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalContact = document.querySelector(".modal-contact"); 

    // Ajout des événements pour chaque bouton de contact
    contactBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche le comportement par défaut (ex. redirection de lien)

            // Récupère la référence de la photo depuis l'attribut 'data-reference' du bouton
            const refPhoto = this.dataset.reference; 

            if (refPhoto) {
                // Si la référence existe, remplir le champ caché dans le formulaire
                document.getElementById("reference").value = refPhoto;

                // Ouvre la modal avec le formulaire
                modalOverlay.classList.remove("hidden"); // Affiche l'overlay
                modalContact.classList.add("open"); // Ajoute la classe 'open' pour afficher la modal
                modalContact.classList.remove("modal-hidden"); // Retire la classe 'modal-hidden'
            } else {
                console.error("Aucune référence trouvée !"); // Message d'erreur si aucune référence n'est trouvée
            }
        });
    });

    // Fermeture de la modal au clic en dehors du formulaire
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) { 
            modalOverlay.classList.add("hidden");
            modalContact.classList.remove("open").addClass("modal-hidden"); // Cache la modal
        }
    });
});
