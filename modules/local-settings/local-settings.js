function loadLocalSettings() {
	$('#load-local-settings').simpleUpload('../file-handler/LoadLocalSettings.php', {
		limit: 1,

		success: function(data){
				//upload successful
				//$('#progress').html("Success!<br>Data: " + JSON.stringify(data));
				var importedLocalSettings = JSON.parse(data);

				console.log(importedLocalSettings);
				if (importedLocalSettings.success == true) {
					parseImportedLocalSettings(importedLocalSettings.ini_array);
				} else {
					console.log("Failure: " + importedLocalSettings.error);
				}
			},

		error: function(error){
			//upload failed
			//$('#progress').html("Failure!<br>" + error.name + ": " + error.message);
			console.log("Failure!<br>" + error.name + ": " + error.message);
		}
	});
}

function parseImportedLocalSettings(importedLocalSettings) {
	$('#general-ip').val(importedLocalSettings.General.DefaultIPAddress);
	$('#general-club-pictures').val(importedLocalSettings.General.ClubPicturesRootPath);
	$('#general-scoreboard-penalty-color').val(importedLocalSettings.General.ScoreboardPenaltyColor);
	$('#general-scoreboard-penalty-shots-ok').val(importedLocalSettings.General.ScoreboardPenaltyShotsOK);
	$('#general-scoreboard-penalty-shots-nok').val(importedLocalSettings.General.ScoreboardPenaltyShotsNOK);

	$('#shortcut-01-line1').val(importedLocalSettings.Shortcut01.Line1);
	$('#shortcut-01-line2').val(importedLocalSettings.Shortcut01.Line2);
	$('#shortcut-01-line3').val(importedLocalSettings.Shortcut01.Line3);

	$('#shortcut-02-line1').val(importedLocalSettings.Shortcut02.Line1);
	$('#shortcut-02-line2').val(importedLocalSettings.Shortcut02.Line2);
	$('#shortcut-02-line3').val(importedLocalSettings.Shortcut02.Line3);

	$('#shortcut-03-line1').val(importedLocalSettings.Shortcut03.Line1);
	$('#shortcut-03-line2').val(importedLocalSettings.Shortcut03.Line2);
	$('#shortcut-03-line3').val(importedLocalSettings.Shortcut03.Line3);

	$('#shortcut-04-line1').val(importedLocalSettings.Shortcut04.Line1);
	$('#shortcut-04-line2').val(importedLocalSettings.Shortcut04.Line2);
	$('#shortcut-04-line3').val(importedLocalSettings.Shortcut04.Line3);

	$('#shortcut-05-line1').val(importedLocalSettings.Shortcut05.Line1);
	$('#shortcut-05-line2').val(importedLocalSettings.Shortcut05.Line2);
	$('#shortcut-05-line3').val(importedLocalSettings.Shortcut05.Line3);

	$('#shortcut-06-line1').val(importedLocalSettings.Shortcut06.Line1);
	$('#shortcut-06-line2').val(importedLocalSettings.Shortcut06.Line2);
	$('#shortcut-06-line3').val(importedLocalSettings.Shortcut06.Line3);

	$('#shortcut-07-line1').val(importedLocalSettings.Shortcut07.Line1);
	$('#shortcut-07-line2').val(importedLocalSettings.Shortcut07.Line2);
	$('#shortcut-07-line3').val(importedLocalSettings.Shortcut07.Line3);

	$('#shortcut-08-line1').val(importedLocalSettings.Shortcut08.Line1);
	$('#shortcut-08-line2').val(importedLocalSettings.Shortcut08.Line2);
	$('#shortcut-08-line3').val(importedLocalSettings.Shortcut08.Line3);

	$('#shortcut-09-line1').val(importedLocalSettings.Shortcut09.Line1);
	$('#shortcut-09-line2').val(importedLocalSettings.Shortcut09.Line2);
	$('#shortcut-09-line3').val(importedLocalSettings.Shortcut09.Line3);

	$('#shortcut-10-line1').val(importedLocalSettings.Shortcut10.Line1);
	$('#shortcut-10-line2').val(importedLocalSettings.Shortcut10.Line2);
	$('#shortcut-10-line3').val(importedLocalSettings.Shortcut10.Line3);

	$('#shortcut-11-line1').val(importedLocalSettings.Shortcut11.Line1);
	$('#shortcut-11-line2').val(importedLocalSettings.Shortcut11.Line2);
	$('#shortcut-11-line3').val(importedLocalSettings.Shortcut11.Line3);

	$('#shortcut-12-line1').val(importedLocalSettings.Shortcut12.Line1);
	$('#shortcut-12-line2').val(importedLocalSettings.Shortcut12.Line2);
	$('#shortcut-12-line3').val(importedLocalSettings.Shortcut12.Line3);

	$('#shortcut-13-line1').val(importedLocalSettings.Shortcut13.Line1);
	$('#shortcut-13-line2').val(importedLocalSettings.Shortcut13.Line2);
	$('#shortcut-13-line3').val(importedLocalSettings.Shortcut13.Line3);

	$('#card-01-line1').val(importedLocalSettings.Card01.ButtonLabel);
	$('#card-01-line2').val(importedLocalSettings.Card01.TitleName);

	$('#card-02-line1').val(importedLocalSettings.Card02.ButtonLabel);
	$('#card-02-line2').val(importedLocalSettings.Card02.TitleName);

	$('#card-03-line1').val(importedLocalSettings.Card03.ButtonLabel);
	$('#card-03-line2').val(importedLocalSettings.Card03.TitleName);

	$('#card-04-line1').val(importedLocalSettings.Card04.ButtonLabel);
	$('#card-04-line2').val(importedLocalSettings.Card04.TitleName);

	$('#sponsor-01-line1').val(importedLocalSettings.Sponsor01.ButtonLabel);
	$('#sponsor-01-line2').val(importedLocalSettings.Sponsor01.Title);
	$('#sponsor-01-line3').val(importedLocalSettings.Sponsor01.PicturePath);

	$('#sponsor-02-line1').val(importedLocalSettings.Sponsor02.ButtonLabel);
	$('#sponsor-02-line2').val(importedLocalSettings.Sponsor02.Title);
	$('#sponsor-02-line3').val(importedLocalSettings.Sponsor02.PicturePath);

	$('#sponsor-03-line1').val(importedLocalSettings.Sponsor03.ButtonLabel);
	$('#sponsor-03-line2').val(importedLocalSettings.Sponsor03.Title);
	$('#sponsor-03-line3').val(importedLocalSettings.Sponsor03.PicturePath);

	$('#sponsor-04-line1').val(importedLocalSettings.Sponsor04.ButtonLabel);
	$('#sponsor-04-line2').val(importedLocalSettings.Sponsor04.Title);
	$('#sponsor-04-line3').val(importedLocalSettings.Sponsor04.PicturePath);

	$('#sponsor-05-line1').val(importedLocalSettings.Sponsor05.ButtonLabel);
	$('#sponsor-05-line2').val(importedLocalSettings.Sponsor05.Title);
	$('#sponsor-05-line3').val(importedLocalSettings.Sponsor05.PicturePath);

	$('#sponsor-06-line1').val(importedLocalSettings.Sponsor06.ButtonLabel);
	$('#sponsor-06-line2').val(importedLocalSettings.Sponsor06.Title);
	$('#sponsor-06-line3').val(importedLocalSettings.Sponsor06.PicturePath);

	$('#sponsor-07-line1').val(importedLocalSettings.Sponsor07.ButtonLabel);
	$('#sponsor-07-line2').val(importedLocalSettings.Sponsor07.Title);
	$('#sponsor-07-line3').val(importedLocalSettings.Sponsor07.PicturePath);

	$('#sponsor-08-line1').val(importedLocalSettings.Sponsor08.ButtonLabel);
	$('#sponsor-08-line2').val(importedLocalSettings.Sponsor08.Title);
	$('#sponsor-08-line3').val(importedLocalSettings.Sponsor08.PicturePath);

	$('#sponsor-autosettings-line1').val(importedLocalSettings.SponsorAuto.Order);
	$('#sponsor-autosettings-line2').val(importedLocalSettings.SponsorAuto.DurationPause);
	$('#sponsor-autosettings-line3').val(importedLocalSettings.SponsorAuto.DurationShow);
}

function getShortcutData(shortcutNr) {
	var shortcutList = new Object();	
	shortcutList.Line1 = $('#shortcut-' + shortcutNr + '-line1').val();
	shortcutList.Line2 = $('#shortcut-' + shortcutNr + '-line2').val();
	shortcutList.Line3 = $('#shortcut-' + shortcutNr + '-line3').val();
	return shortcutList;
}

function getCardData(cardNr) {
	var cardList = new Object();	
	cardList.ButtonLabel = $('#card-' + cardNr + '-line1').val();
	cardList.TitleName = $('#card-' + cardNr + '-line2').val();
	return cardList;
}

function getSponsorData(sponsorNr) {
	var sponsorList = new Object();	
	sponsorList.ButtonLabel = $('#sponsor-' + sponsorNr + '-line1').val();
	sponsorList.Title = $('#sponsor-' + sponsorNr + '-line2').val();
	sponsorList.PicturePath = $('#sponsor-' + sponsorNr + '-line3').val();
	return sponsorList;
}

function downloadLocalSettings(mode) {
	var generalData = {
		DefaultIPAddress: $('#general-ip').val(),
		ClubPicturesRootPath: $('#general-club-pictures').val(),
		ScoreboardPenaltyColor: $('#general-scoreboard-penalty-color').val(),
		ScoreboardPenaltyShotsOK: $('#general-scoreboard-penalty-shots-ok').val(),
		ScoreboardPenaltyShotsNOK: $('#general-scoreboard-penalty-shots-nok').val()
	};

	var shortcutData = {
		Shortcut01: getShortcutData('01'),
		Shortcut02: getShortcutData('02'),
		Shortcut03: getShortcutData('03'),
		Shortcut04: getShortcutData('04'),
		Shortcut05: getShortcutData('05'),
		Shortcut06: getShortcutData('06'),
		Shortcut07: getShortcutData('07'),
		Shortcut08: getShortcutData('08'),
		Shortcut09: getShortcutData('09'),
		Shortcut10: getShortcutData('10'),
		Shortcut11: getShortcutData('11'),
		Shortcut12: getShortcutData('12'),
		Shortcut13: getShortcutData('13'),
	};

	var cardData = {
		Card01: getCardData('01'),
		Card02: getCardData('02'),
		Card03: getCardData('03'),
		Card04: getCardData('04'),
	};

	var sponsorAuto = new Object();
	sponsorAuto.Order = $('#sponsor-autosettings-line1').val();
	sponsorAuto.DurationPause = $('#sponsor-autosettings-line2').val();
	sponsorAuto.DurationShow = $('#sponsor-autosettings-line3').val();

	var sponsorData = {
		Sponsor01: getSponsorData('01'),
		Sponsor02: getSponsorData('02'),
		Sponsor03: getSponsorData('03'),
		Sponsor04: getSponsorData('04'),
		Sponsor05: getSponsorData('05'),
		Sponsor06: getSponsorData('06'),
		Sponsor07: getSponsorData('07'),
		Sponsor08: getSponsorData('08'),
		SponsorAuto: sponsorAuto
	};

	$.ajax({
		type: 'POST',
		url: '../file-handler/LocalSettings.php',
		data: {
			GeneralData: generalData,
			ShortcutData: shortcutData,
			CardData: cardData,
			SponsorData: sponsorData
		},
		success: function(r) {
			switch(mode) {
				case 'preview':
					window.open(r, '_blank');
					break;

				case 'download':
					$('#local-settings-download-link').attr('href', r);
					$('#local-settings-download-link').text(r);
					$('#show-download-url').show();
					break;
			}
		}
	});
}