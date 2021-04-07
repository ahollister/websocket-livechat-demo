# Livechat websocket demo

This repo contains a basic WP theme - [WP Tailwind Twig](https://github.com/ahollister/wp-tailwind-twig).

Within that theme is a new component, called Chat. This component contains a form and list, and if provided with the address of a websocket that broadcasts anything it receives too all connected clients (such as this [Simple socket](https://github.com/ahollister/simple-socket)), it allows for live chat messaging between any two people using the feature at the same time.

When a message is sent using the form, it is sent to the websocket which then broadcasts that message out to all connected clients, which will then receive it and write the new message to the DOM as part of a list, each receiving browser will then store the list of messages in sessionStorage to maintain the data across page reloads.

To test, follow the installation instructions for the theme [here](https://github.com/ahollister/wp-tailwind-twig/blob/master/README.md#installation) and setup the theme as part of a WordPress site. You will then need to create a page with the Page Builder template and add the component, which will require a websocket server address. You can use this [Simple socket](https://github.com/ahollister/) to create one on a service such as Heroku and use the provided address. Then on the front end of the page you should be able to send messages back and forth between different browser windows (or different devices if applicable, for example if you have put the site on a server and you can access it from multiple devices).