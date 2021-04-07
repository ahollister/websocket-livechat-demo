(function () {
	// If component is not present on page load, do nothing ...
	if ( ! document.querySelector( '.js-component--chat' ) ) {
		return;
	}

	// Initialise chat component
	window.addEventListener( 'load', () => {
		init();
	} );

	/**
	 * @summary Init: loads preexisting chat, opens websocket, adds socket and form event handlers
	 */
	function init() {
		// Load chat from sessionStorage if there are previous messages
		loadChat();

		// Get server address and decode it
		let server = document.querySelector( '.js-component--chat' ).getAttribute( 'data-server' );
		server = atob( server );

		// Open websocket connection
		window.socket = new WebSocket( `wss://${server}` );

		// Listeners for socket and form events
		handleEvents();
	}

	/**
	 * @summary Adds event handlers for chat form submit and socket 'open' and 'message' events
	 */
	function handleEvents() {
		// Post message to websocket on form submit
		document
			.querySelector( '.js-chat-form' )
			.addEventListener( 'submit', ( event ) => {
				// Prevent submit and page reload
				event.preventDefault();

				// Get message contents
				const message = event.target.querySelector( '.js-chat-message' ).value;

				// Submit to websocket server
				socket.send( JSON.stringify( message ) );
			} );

		// Socket connection successful, enable message fields
		socket.onopen = ( event ) => {
			document.querySelector( '.js-chat-message' ).removeAttribute( 'disabled' );
			document.querySelector( '.js-chat-submit' ).removeAttribute( 'disabled' );
		};

		// Socket message received
		socket.onmessage = ( event ) => {
			// Store the message
			saveChat( event.data );

			// Update the UI
			displayMessage( event.data );
		};
	}

	/**
	 * @summary Looks in sessionStorage for pre-existing chat, displays if present
	 */
	function loadChat() {
		// Get chat from sessionStorage
		const chat = JSON.parse( sessionStorage.getItem( 'livechat' ) );

		// If none available create default state, return early...
		if ( ! chat ) {
			sessionStorage.setItem( 'livechat', JSON.stringify( [] ) );
			return;
		}

		// If chat available, update the UI with messages
		chat.forEach( ( message ) => {
			displayMessage( message );
		} );
	}

	/**
	 * @summary Appends a message to an array of livechat messages and stores in sessionStorage
	 * @param {string} message The message string to be appended
	 */
	function saveChat( message ) {
		const chat = JSON.parse( sessionStorage.getItem( 'livechat' ) );
		chat.push( message );
		sessionStorage.setItem( 'livechat', JSON.stringify( chat ) );
	}

	/**
	 * @summary Takes a message and updates the UI with it
	 * @param {string} message The message string to be displayed
	 */
	function displayMessage( message ) {
		// Create a list item for the DOM and add the message
		const newMessage = document.createElement( 'LI' );
		newMessage.innerText = JSON.parse( message );

		// Append the LI to our message list UL
		const messageList = document.querySelector( '.js-chat-messagelist' );
		messageList.appendChild( newMessage );
	}
})();
