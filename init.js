// Config-Einstellungen
const API_BASE_URL = 'http://localhost/zustats/api';

// Globaler Click-EventHandler für die Navigation registrieren
$('body').on('click', 'li', function() {
	$('section').hide();
	$('#' +	$(this).attr('data-section-id')).show();
	$('li').removeClass('active');
	$(this).addClass('active');
});

// Globaler Click-EventHandler für die Buttons registrieren
$('body').on('click', 'input[type="button"]', function() {
	
	switch($(this).attr('id')) {
		case 'return-to-menu':
			document.location.href = 'index.html';
			break;

		case 'show-game-settings-page':
			document.location.href = 'game-settings.html';
			break;

		case 'show-local-settings-page':
			document.location.href = 'local-settings.html';
			break;

		default:
			console.log('Footer-Button "' + $(this).attr('id') + '" ausgewählt.')
	}

});

// Globaler Click-EventHandler auf alle "Actions" registrieren
$('body').on('click', '.action', function() {
	console.log('Action triggered.');
});