console.log('Le script infinite-pagination.js est chargé');
console.log('Le test.js est chargé');


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



// modal contact
document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne le bouton d'ouverture du formulaire de contact
    const contactBtn = document.querySelector(".contact"); // Bouton ou lien pour ouvrir la modal
    const modalOverlay = document.querySelector(".modal-overlay"); // L'overlay de la modal
  
    // Sélectionne la modal qui contient le formulaire de contact
    const modalContact = document.querySelector(".modal-contact"); 
  
    // Au démarrage, la modal est cachée
    modalContact.style.display = "none"; // Masque la modal
    modalContact.classList.add("modal-hidden"); // Ajoute une classe pour gérer les transitions de style
  
    // Ouverture de la modal au clic sur le lien "Contact"
    contactBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Empêche l'action par défaut du lien
      toggleModal(); // Appelle la fonction pour afficher ou masquer la modal
    });
  
    // Fonction pour afficher ou cacher la modal
    function toggleModal() {
      if (modalContact.classList.contains("open")) {
        // Si la modal est ouverte, on la ferme
        modalContact.classList.remove("open");
        modalContact.classList.add("modal-hidden");
  
        // Après un délai correspondant à la durée de l'animation, on cache complètement la modal
        setTimeout(() => {
          modalContact.style.display = "none";
        }, 500); // Temps correspondant à la durée de l'animation
      } else {
        // Si la modal est fermée, on l'ouvre
        modalContact.style.display = "block"; // Affiche la modal
  
        // Après un court délai, on ajoute les classes nécessaires pour l'animation
        setTimeout(() => {
          modalContact.classList.add("open");
          modalContact.classList.remove("modal-hidden");
        }, 10); // Court délai pour permettre aux animations de se déclencher
      }
    }
  });
  
