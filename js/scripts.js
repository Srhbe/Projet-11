// test ajax

let reload = true;

function loadMorePhoto() {
    const loadMoreButton = document.getElementById("load-more-btn");
    
    loadMoreButton.addEventListener("click", function () {
        reload = false;
        loadFiltrePhoto();
    });
}

document.addEventListener("DOMContentLoaded", loadMorePhoto);

//Gestion des filtres

//init variables
let valeurFiltreCategorie = '';
let valeurFiltreFormat = '';
let valeurFiltreTrier = 'DESC';

let titreCategorie = document.querySelector('.filtreCategorie .btnFiltre');
let titreFormat = document.querySelector('.filtreFormat .btnFiltre');
let titreTrier = document.querySelector('.filtreTrier .btnFiltre');

//fonction pour gerer le'effet menu déroulant
const btnFiltres = document.querySelectorAll('.btnFiltre');

// Pour chaque élément avec la classe "btnFiltre"
btnFiltres.forEach(function(btnFiltre) {
    // Ajout d'un écouteur d'événements pour le clic
    btnFiltre.addEventListener('click', function() {
        btnFiltre.classList.toggle('active');
        // Sélection de l'élément parent (filtreCategorie)
        let parent = this.parentElement;
        // Toggle la classe "active" sur l'élément avec la classe "chevron"
        parent.querySelector('.chevron').classList.toggle('active');
        // Toggle la classe "active" sur l'élément avec la classe "filtreItems"
        parent.querySelector('.filtreItems').classList.toggle('active');
    });
});

// Écouteur d'événements pour les clics sur le document
document.addEventListener('click', function(event) {
    // Vérifier si le clic n'est pas sur un élément avec la classe "filtreCategorie" ou ses enfants
    if (!event.target.closest('.filtre')) {
        // Sélectionner tous les éléments avec la classe "filtreCategorie"
        let filtreCategories = document.querySelectorAll('.filtre');
        // Pour chaque élément, enlever la classe "active" des éléments enfants
        filtreCategories.forEach(function(filtreCategorie) {
            filtreCategorie.querySelector('.btnFiltre').classList.remove('active');
            filtreCategorie.querySelector('.chevron').classList.remove('active');
            filtreCategorie.querySelector('.filtreItems').classList.remove('active');
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {

    const filtreCategorie = document.querySelectorAll(".filtreCategorie .filtreItem");
    filtreCategorie.forEach(element => {
        element.addEventListener("click", function (event) {
            //test pour savoir si on a déja selectionner un filtre
            if (valeurFiltreCategorie != event.target.dataset.categorie) {
            // met la valeur du filtre dans valeur filtre categorie
            valeurFiltreCategorie = event.target.dataset.categorie
            // reset la valeur
            filtreCategorie.forEach(item => {
                item.classList.remove("selected")
            });
            // Ajoute la class selected
            event.target.classList.add("selected")
            // Ajoute la class selected
            titreCategorie.classList.add("selected")
            // change le titre
            titreCategorie.firstChild.nodeValue = event.target.textContent
            } else {
                //enleve la class selected
                filtreCategorie.forEach(item => {
                    item.classList.remove("selected")
                });
                // enleve la class selected
                titreCategorie.classList.remove("selected")
                //enleve la valeur de valeurFiltreCategorie
                valeurFiltreCategorie = '';
                //remet le titre d'origine.
                titreCategorie.firstChild.nodeValue = "Catégories"
            }         
            //charge les photos
            reload = true;
            nbrPhotoAffiche = 0
            loadFiltrePhoto()
        })
    });
    //idem mais pour filtre format
    const filtreFormat = document.querySelectorAll(".filtreFormat .filtreItem");
    filtreFormat.forEach(element => {
        element.addEventListener("click", function (event) {
            if (valeurFiltreFormat != event.target.dataset.format) {
            valeurFiltreFormat = event.target.dataset.format
            filtreFormat.forEach(item => {
                item.classList.remove("selected")
            });
            event.target.classList.add("selected")
            titreFormat.classList.add("selected")
            titreFormat.firstChild.nodeValue = event.target.textContent;
        } else {
            filtreFormat.forEach(item => {
                item.classList.remove("selected")
            });
            titreFormat.classList.remove("selected")
            valeurFiltreFormat = '';
            titreFormat.firstChild.nodeValue = "Formats"
        }
            reload = true;
            nbrPhotoAffiche = 0
            loadFiltrePhoto()
        })
    });
    //idem mais pour filtre trier
    const filtreTrier = document.querySelectorAll(".filtreTrier .filtreItem");
    filtreTrier.forEach(element => {
        element.addEventListener("click", function (event) {
            if (valeurFiltreTrier != event.target.dataset.trier) {
            valeurFiltreTrier = event.target.dataset.trier
            filtreTrier.forEach(item => {
                item.classList.remove("selected")
            });
            event.target.classList.add("selected")
            titreTrier.classList.add("selected")
            titreTrier.firstChild.nodeValue = event.target.textContent
        } else {
            filtreTrier.forEach(item => {
                item.classList.remove("selected")
            });
            titreTrier.classList.remove("selected")
            valeurFiltreTrier = '';
            titreTrier.firstChild.nodeValue = "Trier par"
        }
            reload = true;
            nbrPhotoAffiche = 0
            loadFiltrePhoto()
        })
    });
});



// fonction pour charger les photos en fonction des filtres.

let nbrPhotoAffiche = 8; // nombre de photo affiché par défaut.

function loadFiltrePhoto() {
    
    const loadMoreButton = document.getElementById("load-more-btn");
    const container = document.getElementById("posts-container");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", MYSCRIPT.ajaxurl, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (this.status == 200) {
            let response = JSON.parse(this.responseText);    
            if (response.posts.length > 0) {
                nbrPhotoAffiche += parseInt(response.nbrPhoto) 
                          
                //test pour savoir si on vide le container
                if (reload) {
                    container.innerHTML = '';
                    } 
                //on ajoute les nouvelles photos
                response.posts.forEach(function (post) {
                    container.innerHTML += post;
                });
                // Test pour afficher le bouton load more
                if (response.has_more_posts) {
                    loadMoreButton.style.display = 'unset'; // Masquer le bouton s'il n'y a plus de posts à charger
                } else {
                    loadMoreButton.style.display = 'none'; // Affiche le bouton s'il n'y a plus de posts à charger
                }
                
                lightboxAdd() //ajoute l'event listener sur les boutons lightbox
            }
        }
    };
    xhr.send(
        "action=load_filtre_photos&valeurFiltreCategorie=" + valeurFiltreCategorie +
        "&valeurFiltreFormat=" + valeurFiltreFormat +
        "&valeurFiltreTrier=" + valeurFiltreTrier +
        "&nonce=" + MYSCRIPT.ajaxNonce +
        "&nbrPhotoAffiche=" + nbrPhotoAffiche
    );

};
 // bouton


jQuery(document).ready(function ($) {
    // Quand l'utilisateur change un filtre
    $('#category-filter, #format-filter, #sort-filter').on('change', function () {
        var category = $('#category-filter').val();
        var format = $('#format-filter').val();
        var order = $('#sort-filter').val();

        // Appeler l'AJAX pour filtrer les photos
        $.ajax({
            type: 'POST',
            url: wp_data.ajax_url,
            data: {
                action: 'filter_photos',
                category: category,
                format: format,
                order: order,
            },
            success: function (response) {
                if (response.success) {
                    // Remplacer le contenu de la grille de photos avec les nouveaux résultats
                    $('.photo-grid').html(response.data);
                } else {
                    // Si aucune photo trouvée
                    $('.photo-grid').html('<p>Aucune photo trouvée.</p>');
                }
            },
            error: function (xhr, status, error) {
                console.error('Erreur lors du chargement des photos :', error);
            }
        });
    });
});

jQuery(document).ready(function ($) {
    $('.filter-group select').on('focus', function () {
        $(this).siblings('label').css('opacity', '0'); // Cache le label lorsque le select est focus
    });

    $('.filter-group select').on('blur', function () {
        if ($(this).val() === "") {
            $(this).siblings('label').css('opacity', '1'); // Montre le label si rien n'est sélectionné
        }
    });

    // Pour maintenir le label caché si une valeur est sélectionnée
    $('.filter-group select').on('change', function () {
        if ($(this).val() !== "") {
            $(this).siblings('label').css('opacity', '0'); // Cache le label
        } else {
            $(this).siblings('label').css('opacity', '1'); // Montre le label
        }
    });
});

