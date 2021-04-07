<?php
// Template name: Page builder
get_header();

// Check that ACF Pro is enabled
if ( function_exists( 'have_rows' ) ) {
	$id = get_the_id();

	// Check for ACF rows, and loop through them
	if ( have_rows( 'layout', $id ) ) {
		while ( have_rows( 'layout', $id ) ) {
			the_row();

			// Get component ACF wrapper, which will set up our data and pass it to the twig template
			get_template_part( 'components/' . get_row_layout() . '/acf' );
		}
	}
} else if ( current_user_can( 'edit_posts' ) ) {
	echo '<h1>Warning: This template requires ACF to be enabled in order to work</h1>';
	echo '<p>Only logged in users can see this message</p>';
}

get_footer();
