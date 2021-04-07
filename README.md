# WP Tailwind Twig starter theme

This theme is a pared down starting point for new non-gutenberg WordPress projects with a simple template architecture using ACF flexible content fields and twig templates.

## Installation

1. `cd` into your sites wp-content/themes directory
2. Clone this repo
3. Run `composer install && npm install && cp browserSyncConfigExample.json browserSyncConfig.json && npm run build` to install theme dependancies with Composer and NPM
4. If you want to use browsersync, edit the values in browserSyncConfig.json to match your environment
5. In your site, select the theme

## SCSS and JS management

Currently the theme includes a Gulp task runner for managing SCSS and JS compilation/transpilation/compression. However I am intending to update this to a webpack configuration soon.

To run a gulp task that watches for file changes, use `npm run dev`
To run a gulp task that builds out the assets for production, use `npm run build`

## Removing Tailwind CSS

This theme includes Tailwind by default, if you want to remove it follow these steps:

1. Run `npm uninstall tailwindcss` in the theme directory
2. Delete `assets/styles/_tailwind.scss`
3. Delete the tailwind import statement in `assets/styles/style.scss`
4. Delete this line in gulpfile.js: `const tailwindcss = require("tailwindcss");`
5. Delete this line in gulpfile.js: `tailwindcss(), // Tailwind CSS`

## Twig component architecture

The theme is designed to be used in conjunction with ACF and Flexible content fields. With ACF installed, go to `Custom Fields` in the admin dashboard, there you should see a `Page Builder` field group. This is where you can add the fields for new UI components.

The fields created here are only available by default on the Page Builder template.

An example component already exists in the theme by default, so you can create a page with the Page Builder template, add an 'example' component to it, and fill out the fields.

Now the template-page-builder.php file will call the acf.php file in components/example/, which is where all data gathering/processing for this component can be done, then passed onto our twig template in the same directory where the variables will be available to twig for templating.

This is designed for ease of use by the CMS user, (they can go to a page, pick a component from the list and fill out the fields), as well as for maintenance and developer experience, as it enforces a strict separation of concerns between data gathering and processing, and the actual UI template code.

## Creating new components

The method for creating new components is as follows:

1. In the Custom Fields admin page, go to Page Builder > Layout and hover over the Layout field to the left of the 'example' component. A set of options will appear, click 'Add New'.
2. Give your component a label, ACF will automatically create a 'Name' for it. You can change this value if you want. Set up the ACF fields for the component and hit 'Update' to save the fields.
3. Create a new folder in the components directory with the Name of the component. Add two files in here, acf.php and template.twig.
4. Write your data processing code in the acf.php file and pass it to the template with `Timber::render()` (see example component for an example).
5. Write your template for the component in the template.twig file, the variables you have for the template are the key names in the array you passed to the template in acf.php
6. Go to a page with the Page Builder template enabled and add your component to the page. Fill out the fields, save and view the page. You should see your new component with the data you just added!

## Source control

If you are using source control in your project, make sure that you always commit the contents of the acf-json/ directory with your new components, the JSON files in this directory are ACF's reference to the current state of the content fields.