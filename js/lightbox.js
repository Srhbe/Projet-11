'use strict';

document.addEventListener('DOMContentLoaded', () => {
    attachLightboxEvents();
    // L'écouteur d'événements pour le chargement de nouvelles images ne devrait pas être ici,
    // car on ne veut pas réinitialiser les événements chaque fois qu'une image est chargée.
});

// Liste globale d'images
const images = [];

const attachLightboxEvents = () => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxRef = lightbox.querySelector('.lightbox__infos--Ref');
    const lightboxCategorie = lightbox.querySelector('.lightbox__infos--Categorie');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__arrows--previous');
    const nextBtn = lightbox.querySelector('.lightbox__arrows--next');

    // Capture des images déjà présentes
    document.querySelectorAll('.fullscreen-icon').forEach((trigger, index) => {
        const fullImage = trigger.closest('.photo-item').querySelector('img').src;
        const ref = trigger.closest('.photo-item').querySelector('.overlay-title').innerText;
        const categorie = trigger.closest('.photo-item').querySelector('.overlay-category').innerText;

        images.push({ fullImage, ref, categorie });

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    let currentIndex = 0;

    const openLightbox = (index) => {
        if (index < 0 || index >= images.length) {
            console.error(`Invalid index: ${index}`);
            return;
        }

        currentIndex = index;
        const image = images[currentIndex];

        if (!image) {
            console.error(`Image not found at index: ${currentIndex}`);
            return;
        }

        lightboxImage.src = image.fullImage;
        lightboxRef.innerText = image.ref;
        lightboxCategorie.innerText = image.categorie;
        lightbox.style.display = 'flex';
        document.addEventListener('keydown', handleKeydown);
    };

    const changeImage = (direction) => {
        const newIndex = (currentIndex + direction + images.length) % images.length;
        openLightbox(newIndex);
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.removeEventListener('keydown', handleKeydown);
    };

    const handleKeydown = (e) => {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    };

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
};

// Fonction pour ajouter de nouvelles images
const addImages = (newImages) => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxRef = lightbox.querySelector('.lightbox__infos--Ref');
    const lightboxCategorie = lightbox.querySelector('.lightbox__infos--Categorie');

    newImages.forEach((image, index) => {
        images.push(image);
        const trigger = document.createElement('div');
        trigger.classList.add('fullscreen-icon');
        trigger.innerHTML = `<img src="${image.fullImage}" alt="Image" />`;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(images.length - 1); // Ouvrir la dernière image ajoutée
        });

        // Ajoutez ce trigger à votre grille d'images, par exemple :
        document.querySelector('.photo-grid').appendChild(trigger);
    });
    console.log(trigger)
};
