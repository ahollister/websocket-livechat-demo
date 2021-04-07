<?php
/**
 * Does an include of a twig UI component, and passes data
 * to the template. Example:
 * include_twig_component( 'name-of-component-dir', [ 'hello' => 'world' ] );
 *
 * @param  string $component The component dir
 * @param  array  $data     Data for the template.
 * @param  string $folder   The outer folder for the component (/components by default).
 * @return void
 */

function include_twig_component( $component, $data = [], $folder = 'components' ) {
	// Strip out anything that may cause a directory traversal attack.
	$component = str_replace( '../', '', $component );
	// Get the file name of the template we want based on the component name
	$filename = get_theme_file_path( $folder . '/' . $component . '/template.twig' );
	// Render the Twig template
	Timber::render( $filename, $data );
}