// contact menu
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

//contact avec réference
document.addEventListener("DOMContentLoaded", function () {
    const contactBtns = document.querySelectorAll(".contact"); // Sélectionne tous les boutons de contact
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalContact = document.querySelector(".modal-contact");

    // Ajout d'écouteurs pour chaque bouton de contact
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
                modalOverlay.classList.remove("hidden"); // Affiche l'overlay
                modalContact.classList.add("open");
                modalContact.classList.remove("modal-hidden");
            } else {
                console.error("Aucune référence trouvée !");
            }
        });
    });

    // Fermeture de la modal au clic en dehors du formulaire
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add("hidden"); // Cache l'overlay
            modalContact.classList.remove("open");
            modalContact.classList.add("modal-hidden"); // Cache la modal
        }
    });
});

