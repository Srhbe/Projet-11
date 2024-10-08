document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("contactModal"); // Sélectionne la modale
    var btn = document.querySelector('.open-modal'); // Sélectionne le bouton

    // Vérifie si le bouton est trouvé
    if (btn) {
        btn.onclick = function(event) {
            event.preventDefault(); // Évite le comportement par défaut du bouton
            modal.style.display = "block"; // Montre la modale
            console.log("Bouton cliqué !"); // Pour voir si le clic est détecté
        };
    }

    // Sélectionne le bouton de fermeture
    var span = document.getElementsByClassName("close-modal")[0];

    if (span) {
        span.onclick = function() {
            modal.style.display = "none"; // Cache la modale quand on clique sur X
        };
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("contactModal");
    var btn = document.querySelector('.open-modal');
    var span = document.getElementsByClassName("close-modal")[0];

    console.log("Script chargé avec succès !"); // Vérification que le script est chargé

    // Ouvre la modale
    if (btn) {
        btn.onclick = function(event) {
            event.preventDefault();
            modal.style.display = "block"; // Affiche la modale
            console.log("Bouton cliqué !"); // Vérification du clic
        };
    }

    // Ferme la modale quand on clique sur "x"
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        };
    }

    // Ferme la modale quand on clique à l'extérieur
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});