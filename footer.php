<footer>
    <div class="footer-content">
        <!-- Lien vers la page "Mentions légales" -->
        <a href="<?php echo esc_url( get_permalink( get_page_by_title( 'Mentions légales' ) ) ); ?>">Mentions légales</a>

        <!-- Lien vers la page "Vie privée" de WordPress -->
        <a href="<?php echo esc_url( get_privacy_policy_url() ); ?>">Vie privée</a>

        <!-- Mention "Tous droits réservés" -->
        <p> Tous droits réservés </p>
    </div>
</footer>
<!-- modal contact -->
<?php 
        get_template_part ( 'templates-part/modal-contact'); 		
        get_template_part ( 'templates-part/lightbox'); 	?>
</body>
</html>