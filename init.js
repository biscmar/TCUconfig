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

		case 'init-game-btn':
			initGame($('#input-game-id').val());
			break;

		case 'preview-game-settings':
			downloadGameSettings('preview');
			break;

		case 'download-game-settings':
			downloadGameSettings('download');
			break;

		case 'close-download-page':
			$('#show-download-url').hide();
			break;

		default:
			console.log('Footer-Button "' + $(this).attr('id') + '" ausgewählt.')
	}

});

// Globaler Click-EventHandler auf alle "Actions" registrieren
$('body').on('click', '.action', function() {
	switch($(this).data('action')) {
		case 'addToStartingSix':
			showRosterActionOverlay($(this).closest('.roster-tr').attr('data-player-id'));
			break;
			
		case 'startingSixSymbolOne':
			if ($(this).parent().hasClass('roster-td')) {
				showRosterActionOverlay($(this).closest('.roster-tr').attr('data-player-id'));
			} else {
				changeStartingSixPosition('startingSixSymbolOne', $(this).parent().prev().attr('data-player-id'));
			}
			break;
			
		case 'startingSixSymbolTwo':
			if ($(this).parent().hasClass('roster-td')) {
				showRosterActionOverlay($(this).closest('.roster-tr').attr('data-player-id'));
			} else {
				changeStartingSixPosition('startingSixSymbolTwo', $(this).parent().prev().attr('data-player-id'));
			}
			break;
			
		case 'startingSixSymbolThree':
			if ($(this).parent().hasClass('roster-td')) {
				showRosterActionOverlay($(this).closest('.roster-tr').attr('data-player-id'));
			} else {
				changeStartingSixPosition('startingSixSymbolThree', $(this).parent().prev().attr('data-player-id'));
			}
			break;
			
		case 'startingSixSymbolFour':
			if ($(this).parent().hasClass('roster-td')) {
				showRosterActionOverlay($(this).closest('.roster-tr').attr('data-player-id'));
			} else {
				changeStartingSixPosition('startingSixSymbolFour', $(this).parent().prev().attr('data-player-id'));
			}
			break;
			
		case 'startingSixSymbolFive':
			if ($(this).parent().hasClass('roster-td')) {
				showRosterActionOverlay($(this).closest('.roster-tr').attr('data-player-id'));
			} else {
				changeStartingSixPosition('startingSixSymbolFive', $(this).parent().prev().attr('data-player-id'));
			}
			break;

		case 'startingSixSymbolSix':
			if ($(this).parent().hasClass('roster-td')) {
				showRosterActionOverlay($(this).closest('.roster-tr').attr('data-player-id'));
			} else {
				changeStartingSixPosition('startingSixSymbolSix', $(this).parent().prev().attr('data-player-id'));
			}
			break;

		case 'removeFromStartingSix':
			changeStartingSixPosition('addToStartingSix', $(this).parent().prev().attr('data-player-id'));
			break;

		default:
			console.log('Action triggered.');
	}
});