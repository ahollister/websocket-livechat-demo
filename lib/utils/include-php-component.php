<?php 
/**
 * Does an include of a PHP file in the components folder, and passes data
 * to the template. For use with more complex components that can't use TWIG templates. 
 * Example:
 * include_template( 'content/carousel', [ 'hello' => 'world' ] );
 *
 * @param  string $template The component name
 * @param  array  $data     Data for the template.
 * @param  string $folder   The folder for the template part.
 * @return void
 */
function include_php_component( $component, $data = [], $folder = 'components' ) {
	// Strip out anything that may cause a directory traversal attack.
	$component = str_replace( '../', '', $component );
	$filename = trailingslashit( get_template_directory() ) . $folder . '/' . $component . '/acf.php';
	include $filename;
}