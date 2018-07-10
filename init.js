// Globaler Click-EventHandler für die Navigation registrieren
$("body").on("click", ".subnav li", function() {
    $("section").hide();
    $("#" + $(this).attr("data-section-id")).show();
    $("li").removeClass("active");
    $(this).addClass("active");
});

// Globaler Click-EventHandler für die Buttons registrieren
$("body").on("click", 'input[type="button"]', function() {
    switch ($(this).attr("id")) {
        case "return-to-menu":
            document.location.href = "../../index.html";
            break;

        case "show-game-settings-page":
            document.location.href = "modules/game-settings/game-settings.html";
            break;

        case "show-local-settings-page":
            document.location.href = "modules/local-settings/local-settings.html";
            break;

        case "init-game-btn":
            initGame($("#input-game-id").val());
            break;

        case "preview-game-settings":
            downloadGameSettings("preview");
            break;

        case "download-game-settings":
            downloadGameSettings("download");
            break;

        case "preview-local-settings":
            downloadLocalSettings("preview");
            break;

        case "download-local-settings":
            downloadLocalSettings("download");
            break;

        case "load-local-settings-template":
            loadLocalSettingsTemplate();
            break;

        case "close-download-page":
            $("#show-download-url").hide();
            break;

        case "load-local-settings-btn":
            loadLocalSettings();
            break;

        case "close-error-page":
            $("#show-error").hide();
            break;

        default:
            console.log('Button "' + $(this).attr("id") + '" ausgewählt.');
    }
});

// Globaler Click-EventHandler auf Starting Six Options registrieren
$("body").on("click", ".roster-starting-six-option", function() {
    switch (
        $(this)
            .parent()
            .attr("id")
    ) {
        case "roster-home-starting-six":
            $("#roster-home-starting-six-custom").hide();
            $("#roster-home-starting-six")
                .children()
                .removeClass("starting-six-option-selected");

            $(this).addClass("starting-six-option-selected");

            if ($(this).attr("id") == "home-starting-six-custom") {
                $("#roster-home-starting-six-custom")
                    .show()
                    .css("display", "grid");
            }
            break;

        case "roster-away-starting-six":
            $("#roster-away-starting-six-custom").hide();
            $("#roster-away-starting-six")
                .children()
                .removeClass("starting-six-option-selected");

            $(this).addClass("starting-six-option-selected");

            if ($(this).attr("id") == "away-starting-six-custom") {
                $("#roster-away-starting-six-custom")
                    .show()
                    .css("display", "grid");
            }
            break;

        default:
            console.log("Unbekante roster-starting-six-option");
    }
});

// Globaler Click-EventHandler auf Color Picker registrieren
$("body").on("click", ".color-picker-item", function() {
    $(this)
        .parent()
        .find(".color-picker-item")
        .removeClass("selected");

    $(this).addClass("selected");
});

// Globaler Focusout-EventHandler auf Roster Player Number registrieren
$("body").on("focusout", ".roster-player-number", function() {
    if ($(this).val() === "") {
        $(this)
            .parent()
            .find("select")
            .val(0)
            .change();
    } else {
        $(this)
            .parent()
            .find("select")
            .val($(this).val())
            .change();
    }
});

// Globaler Focusout-EventHandler auf Roster Player Name registrieren
$("body").on("change", ".roster-player-name", function() {
    if ($(this).val() == 0) {
        $(this)
            .parent()
            .find("input")
            .val("")
            .change();
    } else {
        $(this)
            .parent()
            .find("input")
            .val($(this).val())
            .change();
    }
});

// Ausgabe von Fehlermeldungen
function displayError(errMsgList) {
    errMsgList.forEach(errMsg => {
        $("#error-list").append("<li>" + errMsg + "</li>");
    });

    $("#show-error").show();
    console.log(errMsgList);
}
