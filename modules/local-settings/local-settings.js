function loadLocalSettings() {
    $("#load-local-settings").simpleUpload("./LoadLocalSettings.php", {
        limit: 1,

        success: function(data) {
            //upload successful
            //$('#progress').html("Success!<br>Data: " + JSON.stringify(data));
            var importedLocalSettings = JSON.parse(data);

            if (importedLocalSettings.success == true) {
                parseImportedLocalSettings(importedLocalSettings.ini_array);
            } else {
                console.error("Failure: " + importedLocalSettings.error);
            }
        },

        error: function(error) {
            //upload failed
            //$('#progress').html("Failure!<br>" + error.name + ": " + error.message);
            console.error("Failure!<br>" + error.name + ": " + error.message);
        }
    });
}

function parseImportedLocalSettings(importedLocalSettings) {
    $("#general-ip").val(importedLocalSettings.General.DefaultIPAddress);
    $("#general-team-logo-path").val(importedLocalSettings.General.TeamLogoPath);
    
    $("#personal-sponsor-home-path").val(importedLocalSettings.PersonalSponsor.PersonalSponsorHomePath);
    $("#personal-sponsor-away-path").val(importedLocalSettings.PersonalSponsor.PersonalSponsorAwayPath);
    $("#show-personal-sponsor-on-goal").val(importedLocalSettings.PersonalSponsor.ShowPersonalSponsorOnGoal);
    $("#show-personal-sponsor-on-penalty").val(importedLocalSettings.PersonalSponsor.ShowPersonalSponsorOnPenalty);
    $("#show-personal-sponsor-on-name").val(importedLocalSettings.PersonalSponsor.ShowPersonalSponsorOnName);
    $("#show-personal-sponsor-on-best-player").val(importedLocalSettings.PersonalSponsor.ShowPersonalSponsorOnBestPlayer);

    $("#stop-time-on-goal").val(importedLocalSettings.Scoreboard.StopTimeOnGoal);
    $("#hide-scoreboard-on-goal").val(importedLocalSettings.Scoreboard.HideScoreboardOnGoal);

    $("#shortcut-01-line1").val(importedLocalSettings.Shortcut01.Text);
    $("#shortcut-02-line1").val(importedLocalSettings.Shortcut02.Text);
    $("#shortcut-03-line1").val(importedLocalSettings.Shortcut03.Text);
    $("#shortcut-04-line1").val(importedLocalSettings.Shortcut04.Text);
    $("#shortcut-05-line1").val(importedLocalSettings.Shortcut05.Text);
    $("#shortcut-06-line1").val(importedLocalSettings.Shortcut06.Text);
    $("#shortcut-07-line1").val(importedLocalSettings.Shortcut07.Text);
    $("#shortcut-08-line1").val(importedLocalSettings.Shortcut08.Text);
    $("#shortcut-09-line1").val(importedLocalSettings.Shortcut09.Text);

    $("#card-01-line1").val(importedLocalSettings.Card01.ButtonLabel);
    $("#card-01-line2").val(importedLocalSettings.Card01.TitleName);

    $("#card-02-line1").val(importedLocalSettings.Card02.ButtonLabel);
    $("#card-02-line2").val(importedLocalSettings.Card02.TitleName);

    $("#card-03-line1").val(importedLocalSettings.Card03.ButtonLabel);
    $("#card-03-line2").val(importedLocalSettings.Card03.TitleName);

    $("#card-04-line1").val(importedLocalSettings.Card04.ButtonLabel);
    $("#card-04-line2").val(importedLocalSettings.Card04.TitleName);

    $("#card-05-line1").val(importedLocalSettings.Card05.ButtonLabel);
    $("#card-05-line2").val(importedLocalSettings.Card05.TitleName);

    $("#card-06-line1").val(importedLocalSettings.Card06.ButtonLabel);
    $("#card-06-line2").val(importedLocalSettings.Card06.TitleName);

    $("#card-07-line1").val(importedLocalSettings.Card07.ButtonLabel);
    $("#card-07-line2").val(importedLocalSettings.Card07.TitleName);

    $("#card-08-line1").val(importedLocalSettings.Card08.ButtonLabel);
    $("#card-08-line2").val(importedLocalSettings.Card08.TitleName);

    $("#sponsor-01-line1").val(importedLocalSettings.Sponsor01.ButtonLabel);
    $("#sponsor-01-line2").val(importedLocalSettings.Sponsor01.Title);
    $("#sponsor-01-line3").val(importedLocalSettings.Sponsor01.PicturePath);

    $("#sponsor-02-line1").val(importedLocalSettings.Sponsor02.ButtonLabel);
    $("#sponsor-02-line2").val(importedLocalSettings.Sponsor02.Title);
    $("#sponsor-02-line3").val(importedLocalSettings.Sponsor02.PicturePath);

    $("#sponsor-03-line1").val(importedLocalSettings.Sponsor03.ButtonLabel);
    $("#sponsor-03-line2").val(importedLocalSettings.Sponsor03.Title);
    $("#sponsor-03-line3").val(importedLocalSettings.Sponsor03.PicturePath);

    $("#sponsor-04-line1").val(importedLocalSettings.Sponsor04.ButtonLabel);
    $("#sponsor-04-line2").val(importedLocalSettings.Sponsor04.Title);
    $("#sponsor-04-line3").val(importedLocalSettings.Sponsor04.PicturePath);

    $("#sponsor-05-line1").val(importedLocalSettings.Sponsor05.ButtonLabel);
    $("#sponsor-05-line2").val(importedLocalSettings.Sponsor05.Title);
    $("#sponsor-05-line3").val(importedLocalSettings.Sponsor05.PicturePath);

    $("#sponsor-06-line1").val(importedLocalSettings.Sponsor06.ButtonLabel);
    $("#sponsor-06-line2").val(importedLocalSettings.Sponsor06.Title);
    $("#sponsor-06-line3").val(importedLocalSettings.Sponsor06.PicturePath);

    $("#sponsor-07-line1").val(importedLocalSettings.Sponsor07.ButtonLabel);
    $("#sponsor-07-line2").val(importedLocalSettings.Sponsor07.Title);
    $("#sponsor-07-line3").val(importedLocalSettings.Sponsor07.PicturePath);

    $("#sponsor-08-line1").val(importedLocalSettings.Sponsor08.ButtonLabel);
    $("#sponsor-08-line2").val(importedLocalSettings.Sponsor08.Title);
    $("#sponsor-08-line3").val(importedLocalSettings.Sponsor08.PicturePath);

    $("#sponsor-autosettings-line1").val(importedLocalSettings.SponsorAuto.Order);
    $("#sponsor-autosettings-line2").val(importedLocalSettings.SponsorAuto.DurationPause);
    $("#sponsor-autosettings-line3").val(importedLocalSettings.SponsorAuto.DurationShow);
}

function getShortcutData(shortcutNr) {
    var shortcutList = new Object();
    shortcutList.Text = $("#shortcut-" + shortcutNr + "-line1").val();
    return shortcutList;
}

function getCardData(cardNr) {
    var cardList = new Object();
    cardList.ButtonLabel = $("#card-" + cardNr + "-line1").val();
    cardList.TitleName = $("#card-" + cardNr + "-line2").val();
    return cardList;
}

function getSponsorData(sponsorNr) {
    var sponsorList = new Object();
    sponsorList.ButtonLabel = $("#sponsor-" + sponsorNr + "-line1").val();
    sponsorList.Title = $("#sponsor-" + sponsorNr + "-line2").val();
    sponsorList.PicturePath = $("#sponsor-" + sponsorNr + "-line3").val();
    return sponsorList;
}

function downloadLocalSettings(mode) {
    if (validateLocalSettingsData()) {
        var generalData = {
            DefaultIPAddress: $("#general-ip").val(),
            TeamLogoPath: $("#general-team-logo-path").val()
        };
        
        var personalSponsor = {
            PersonalSponsorHomePath: $("#personal-sponsor-home-path").val(),
            PersonalSponsorAwayPath: $("#personal-sponsor-away-path").val(),
            ShowPersonalSponsorOnGoal: $("#show-personal-sponsor-on-goal").val(),
            ShowPersonalSponsorOnPenalty: $("#show-personal-sponsor-on-penalty").val(),
            ShowPersonalSponsorOnName: $("#show-personal-sponsor-on-name").val(),
            ShowPersonalSponsorOnBestPlayer: $("#show-personal-sponsor-on-best-player").val()
        };

        var scoreboard = {
            StopTimeOnGoal: $("#stop-time-on-goal").val(),
            HideScoreboardOnGoal: $("#hide-scoreboard-on-goal").val()
        };

        var shortcutData = {
            Shortcut01: getShortcutData("01"),
            Shortcut02: getShortcutData("02"),
            Shortcut03: getShortcutData("03"),
            Shortcut04: getShortcutData("04"),
            Shortcut05: getShortcutData("05"),
            Shortcut06: getShortcutData("06"),
            Shortcut07: getShortcutData("07"),
            Shortcut08: getShortcutData("08"),
            Shortcut09: getShortcutData("09"),
        };

        var cardData = {
            Card01: getCardData("01"),
            Card02: getCardData("02"),
            Card03: getCardData("03"),
            Card04: getCardData("04"),
            Card05: getCardData("05"),
            Card06: getCardData("06"),
            Card07: getCardData("07"),
            Card08: getCardData("08")
        };

        var sponsorAuto = new Object();
        sponsorAuto.Order = $("#sponsor-autosettings-line1").val();
        sponsorAuto.DurationPause = $("#sponsor-autosettings-line2").val();
        sponsorAuto.DurationShow = $("#sponsor-autosettings-line3").val();

        var sponsorData = {
            Sponsor01: getSponsorData("01"),
            Sponsor02: getSponsorData("02"),
            Sponsor03: getSponsorData("03"),
            Sponsor04: getSponsorData("04"),
            Sponsor05: getSponsorData("05"),
            Sponsor06: getSponsorData("06"),
            Sponsor07: getSponsorData("07"),
            Sponsor08: getSponsorData("08"),
            SponsorAuto: sponsorAuto
        };

        $.ajax({
            type: "POST",
            url: "../file-handler/LocalSettings.php",
            data: {
                GeneralData: generalData,
                PersonalSponsor: personalSponsor,
                Scoreboard: scoreboard,
                ShortcutData: shortcutData,
                CardData: cardData,
                SponsorData: sponsorData,
                OutputDirectory: Config.outputDirectory
            },
            success: function(r) {
                var outputFile = JSON.parse(r);

                switch (mode) {
                    case "preview":
                        window.open("../file-handler/SettingsPreview.php?file=" + outputFile.file, "_blank");
                        break;

                    case "download":
                        $("#local-settings-download-link").attr(
                            "href",
                            outputFile.protocol + outputFile.path + outputFile.file
                        );
                        $("#local-settings-download-link").text(outputFile.file);
                        $("#show-download-url").show();
                        break;
                }
            }
        });
    }
}

function loadLocalSettingsTemplate() {
    $.ajax({
        type: "POST",
        url: "../file-handler/LoadLocalSettingsTemplate.php",
        success: function(r) {
            var importedLocalSettings = JSON.parse(r);

            if (importedLocalSettings.success == true) {
                parseImportedLocalSettings(importedLocalSettings.ini_array);
            } else {
                console.error("Failure: Template konnte nicht geladen werden");
            }
        }
    });
}

function validateLocalSettingsData() {
    return true;
}