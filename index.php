<?php
/**
 * The main template file
 *
 * @package wp-tailwind-twig
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<?php
		if ( have_posts() ) {
			// Start loop
			while ( have_posts() ) {
				the_post();
				// Display content
				the_content();
			}
		}
		?>
	</main>
</div>

<?php
get_footer();