<div class="modal-overlay hidden">
	<div class="modal-contact">
		<div class="modal-title__container">
			<div class="modal-title"></div>
			<div class="modal-title"></div>
		</div>
		<div class="modal-detail">	
			<?php
				// On insère le formulaire de demandes de renseignements
				// get_field('reference')
				$refPhoto = "";
				if (get_field('reference')) {
					$refPhoto = get_field('reference');
				}; 
				echo do_shortcode('[contact-form-7 id="28a637b" title="contact"]');
			?>
		</div>	
	</div>
</div>