//burger
document.addEventListener('DOMContentLoaded', function () {
    const burgerIcon = document.getElementById('burger-icon');
    const navMenu = document.querySelector('.nav-menu');

    // Activer/désactiver le menu en cliquant sur l'icône burger
    burgerIcon.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        burgerIcon.classList.toggle('active'); // Active l'animation en croix
    });
    document.getElementById('burger-icon').addEventListener('click', function () {
        this.classList.toggle('open');
        document.querySelector('.main-menu').classList.toggle('open');
        document.body.classList.toggle('header-open'); // Ajoute une classe au body pour garder le header blanc
    });
});