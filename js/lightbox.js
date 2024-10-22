// lightbox.js
'use strict';

let images = []; // Liste globale des images
let currentIndex = 0; // Index de l'image actuelle

document.addEventListener('DOMContentLoaded', () => {
    attachLightboxEvents(); // Attache les événements à la lightbox au chargement de la page
});

// Fonction pour attacher les événements de la lightbox
const attachLightboxEvents = () => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxRef = lightbox.querySelector('.lightbox__infos--Ref');
    const lightboxCategorie = lightbox.querySelector('.lightbox__infos--Categorie');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__arrows--previous');
    const nextBtn = lightbox.querySelector('.lightbox__arrows--next');

    // Écouteurs pour les boutons de navigation
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));

    // Écouteur pour fermer la lightbox quand on clique en dehors de l'image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
};

// Fonction pour ouvrir la lightbox
const openLightbox = (index) => {
    if (index < 0 || index >= images.length) {
        console.error(`Invalid index: ${index}`);
        return;
    }

    const image = images[index];
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxRef = lightbox.querySelector('.lightbox__infos--Ref');
    const lightboxCategorie = lightbox.querySelector('.lightbox__infos--Categorie');

    currentIndex = index; // Met à jour l'index courant

    lightboxImage.src = image.fullImage;
    lightboxRef.innerText = image.ref;
    lightboxCategorie.innerText = image.categorie;
    lightbox.style.display = 'flex';
    document.addEventListener('keydown', handleKeydown);
};

// Fonction pour changer d'image
const changeImage = (direction) => {
    const newIndex = (currentIndex + direction + images.length) % images.length;
    openLightbox(newIndex);
};

// Fonction pour fermer la lightbox
const closeLightbox = () => {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.removeEventListener('keydown', handleKeydown);
};

// Gérer les touches du clavier
const handleKeydown = (e) => {
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
};

// Fonction pour ajouter de nouvelles images à la lightbox
const addImagesToLightbox = (newImages) => {
    images = [...images, ...newImages]; // Ajouter les nouvelles images à la liste globale
    attachLightboxEventsToNewImages(newImages); // Attacher les événements à ces nouvelles images
};

// Attacher les événements à chaque nouvelle image
const attachLightboxEventsToNewImages = (newImages) => {
    const photoGrid = document.querySelector('.photo-grid');
    
    newImages.forEach((image, index) => {
        const trigger = document.createElement('div');
        trigger.classList.add('fullscreen-icon');
        trigger.innerHTML = `<img src="${image.fullImage}" alt="Image" />`;

        // Ajout d'écouteur d'événement pour chaque nouvelle image
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(images.length - newImages.length + index); // Ouvre l'image nouvellement ajoutée
        });

        // Ajoute le trigger à la grille d'images
        photoGrid.appendChild(trigger);
    });
};

// Exposer la fonction d'ajout d'images à d'autres modules
window.addImagesToLightbox = addImagesToLightbox;


