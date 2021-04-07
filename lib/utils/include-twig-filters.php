<?php

// This will automatically add the JS API parameter onto a youtube video,
// so we can stop it playing when modal windows are closed
add_filter('timber/twig', function($twig) {
    $twig->addExtension(new Twig_Extension_StringLoader());
 
    $twig->addFilter(
      new Twig_SimpleFilter(
        'youtube_enable_js_api',
         function($string) {

            // Check if there is no question mark in the URL
            preg_match("/src=\"[^?]*?\"/", $string, $matches);
            
            // If there is no question mark found in the URL, we can begin the querystring, if not we can append to it
            $separator = sizeof($matches) > 0 ? "?" : "&";

            // Append the JS API to the youtube video URL
            $string = preg_replace('/(src=".*?)"/', '\1' . $separator . 'enablejsapi=1"', $string);

            return $string;
        })
    );
 
    return $twig;
 });