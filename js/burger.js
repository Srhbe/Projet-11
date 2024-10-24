//Burger
document.addEventListener('DOMContentLoaded', function () {
    const burgerIcon = document.getElementById('burger-icon');
    const navMenu = document.querySelector('.nav-menu'); 

    // Activer/désactiver le menu lorsque l'utilisateur clique sur l'icône burger
    burgerIcon.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        burgerIcon.classList.toggle('active'); // Active l'animation de l'icône burger en croix
    });

    // Gestion de l'ouverture et de la fermeture du menu avec effets supplémentaires
    document.getElementById('burger-icon').addEventListener('click', function () {
        this.classList.toggle('open'); // Bascule entre les états ouvert/fermé de l'icône burger
        document.querySelector('.main-menu').classList.toggle('open'); // Active/désactive l'affichage du menu principal
        document.body.classList.toggle('header-open');
    });
});
