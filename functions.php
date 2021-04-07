<?php
/**
 * Functions
 *
 * Calls in files that include individual pieces of functionality and theme setup
 *
 * Should read like a contents page of theme functionality
 *
 * @package wp-tailwind-twig
 * @link https://developer.wordpress.org/themes/basics/theme-functions/#what-is-functions-php
 */


/**
 * Theme version
 */

// Replace the version number of the theme on each release.
if ( ! defined( 'WP_TAILWIND_TWIG_VERSION' ) ) {
	define( 'WP_TAILWIND_TWIG_VERSION', '1.0.0' );
}


/**
 * Setting up theme
 */

// Theme defaults and registers support for various WordPress features
require_once get_template_directory() . '/lib/theme-setup.php';
// Register styles and scripts
require_once get_template_directory() . '/lib/enqueues.php';


/**
 * Twig setup and including components
 */

// Timber setup
require_once get_template_directory() . '/lib/timber-setup.php';
// Include Twig Component
require_once get_template_directory() . '/lib/utils/include-twig-component.php';
// Include PHP Component
require_once get_template_directory() . '/lib/utils/include-php-component.php';
// Include Twig filters
require_once get_template_directory() . '/lib/utils/include-twig-filters.php';