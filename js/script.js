document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("contactModal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close")[0];

    // Ouvrir la modale lorsqu'on clique sur le lien
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Fermer la modale lorsqu'on clique sur le bouton de fermeture
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Fermer la modale si on clique en dehors de la modale
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

