<?php
/**
 * The ACF data file
 * This file gets data from CMS fields and passes it to a UI component
 * @package wp-tailwind-twig
 */
Timber::render( 'template.twig', [
	'title' => get_sub_field( 'title' ),
	'cta'   => get_sub_field( 'call_to_action' ),
] );