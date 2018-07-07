function initGame(gameId) {
    console.log("Spiel " + gameId + " wird geladen.");
    $.ajax({
        url: Config.apiUrl + gameId + Config.apiParams,
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function(r) {
            console.log("Spiel geladen.");

            var game = r.object;
            var references = r.references;

            // Section "Game"
            $("#game-id").val(game.id);
            $("#game-title").val("Meisterschaft NLA | Runde X | Saison 2017/2018");

            var date = game.attrs.starts_at.split("T")[0].split("-");
            $("#game-date").val(date[2] + "." + date[1] + "." + date[0]);

            var time = game.attrs.starts_at.split("T")[1].split(":");
            $("#game-time").val(time[0] + ":" + time[1]);

            var gymReference = game.attrs.gym;
            var locationReference = references[gymReference].attrs.address;
            $("#game-location").val(
                references[gymReference].attrs.name + ", " + references[locationReference].attrs.location
            );

            $("#game-ref-1").val(
                references[game.attrs.referees[0]].attrs.first_name +
                    " " +
                    references[game.attrs.referees[0]].attrs.last_name
            );
            $("#game-ref-2").val(
                references[game.attrs.referees[1]].attrs.first_name +
                    " " +
                    references[game.attrs.referees[1]].attrs.last_name
            );

            $(".color-picker-item").each(function() {
                $(this).css("background-color", $(this).attr("id"));
            });

            // Section "Home"
            var home = references[game.attrs.home_team];
            $("#home-team-long").val(home.attrs.name);
            $("#home-team-short").val(home.attrs.streaming_name);
            parseRoster(game.attrs.lineups[0], references, "home");

            // Section "Away"
            var away = references[game.attrs.away_team];
            $("#away-team-long").val(away.attrs.name);
            $("#away-team-short").val(away.attrs.streaming_name);
            parseRoster(game.attrs.lineups[1], references, "away");
        }
    });
}

function parseRoster(lineUpList, references, team) {
    $("#topscorer-" + team).empty();
    $("#roster-" + team + ", #roster-" + team + "-tw")
        .find("select")
        .empty()
        .append(
            $("<option>", {
                value: 0
            }).text("-- Nicht gesetzt --")
        );
    $("#roster-" + team + ", #roster-" + team + "-tw")
        .find("input")
        .val("");

    $.each(lineUpList, function(index, value) {
        var position = references[value];
        var player = references[position.attrs.player];

        // Element für Topscorer-Auswahl
        var topscorerOption = $("<option>", {
            value: player.attrs.name
        }).text(position.attrs.number + " - " + player.attrs.name);

        $("#topscorer-" + team).append(topscorerOption);

        // Element für Player Select
        var playerListOption = $("<option>", {
            value: position.attrs.number
        }).text(player.attrs.name);

        $("#roster-" + team + ", #roster-" + team + "-tw")
            .find("select")
            .append(playerListOption);
    });
}

function getRosterList(team) {
    var rosterList = {
        startingSix: null,
        line1: null,
        line2: null,
        line3: null,
        line4: null,
        goal: null,
        roster: []
    };

    if ($("#roster-" + team + "-starting-six").find(".starting-six-option-selected").length == 1) {
        switch (
            $("#roster-" + team + "-starting-six")
                .find(".starting-six-option-selected")
                .first()
                .attr("id")
        ) {
            case team + "-starting-six-line-1":
                var lineList = getLine(team, "line-1");
                rosterList.startingSix = $("#" + team + "-roster-tw1").val();
                rosterList.startingSix += "," + lineList;
                break;

            case team + "-starting-six-line-2":
                var lineList = getLine(team, "line-2");
                rosterList.startingSix = $("#" + team + "-roster-tw1").val();
                rosterList.startingSix += "," + lineList;
                break;

            case team + "-starting-six-line-3":
                var lineList = getLine(team, "line-3");
                rosterList.startingSix = $("#" + team + "-roster-tw1").val();
                rosterList.startingSix += "," + lineList;
                break;

            case team + "-starting-six-line-4":
                var lineList = getLine(team, "line-4");
                rosterList.startingSix = $("#" + team + "-roster-tw1").val();
                rosterList.startingSix += "," + lineList;
                break;

            case team + "-starting-six-custom":
                rosterList.startingSix = $("#" + team + "-starting-six-tw").val();
                rosterList.startingSix += "," + $("#" + team + "-starting-six-dl").val();
                rosterList.startingSix += "," + $("#" + team + "-starting-six-dr").val();
                rosterList.startingSix += "," + $("#" + team + "-starting-six-c").val();
                rosterList.startingSix += "," + $("#" + team + "-starting-six-wl").val();
                rosterList.startingSix += "," + $("#" + team + "-starting-six-wr").val();
                break;

            default:
                console.log("Ungültige Starting Six Option");
        }
    } else {
        console.log("Keine Starting Six Option ausgewählt");
    }

    rosterList.line1 = getLine(team, "line-1");
    rosterList.line2 = getLine(team, "line-2");
    rosterList.line3 = getLine(team, "line-3");
    rosterList.line4 = getLine(team, "line-4");

    rosterList.goal = $("#" + team + "-roster-tw1").val();
    rosterList.goal += "," + $("#" + team + "-roster-tw2").val();

    $("#roster-" + team + ", #roster-" + team + "-tw")
        .find(".roster-player")
        .each(function() {
            var number = $(this)
                .find(".roster-player-number")
                .first()
                .val();

            var name = $(this)
                .find(".roster-player-name")
                .find("option:selected")
                .text();

            if (number != 0 || number != "") {
                rosterList.roster[number] = name;
            }
        });

    rosterList.roster["00"] = $("#topscorer-" + team).val();

    return rosterList;
}

function getLine(team, line) {
    var lineList = null;
    lineList = $("#" + team + "-roster-" + line + "-dl").val();
    lineList += "," + $("#" + team + "-roster-" + line + "-dr").val();
    lineList += "," + $("#" + team + "-roster-" + line + "-c").val();
    lineList += "," + $("#" + team + "-roster-" + line + "-wl").val();
    lineList += "," + $("#" + team + "-roster-" + line + "-wr").val();

    return lineList;
}

function downloadGameSettings(mode) {
    var homeTeamData = {
        HomeTeamLong: $("#home-team-long").val(),
        HomeTeamShort: $("#home-team-short").val(),
        HomeHeadcoach: $("#home-coach").val(),
        HomeColor: $('#color-home').find('.selected').attr('id'),
        HomeTeamLineup: getRosterList("home")
    };
    
    var awayTeamData = {
        AwayTeamLong: $("#away-team-long").val(),
        AwayTeamShort: $("#away-team-short").val(),
        AwayHeadcoach: $("#away-coach").val(),
        AwayColor: $('#color-away').find('.selected').attr('id'),
        AwayTeamLineup: getRosterList("away")
    };
    console.log(awayTeamData);

    $.ajax({
        type: "POST",
        url: "../file-handler/GameSettings.php",
        data: {
            GameNr: $("#game-id").val(),
            Title: $("#game-title").val(),
            Date: $("#game-date").val(),
            Time: $("#game-time").val(),
            Location: $("#game-location").val(),
            Referee1: $("#game-ref-1").val(),
            Referee2: $("#game-ref-2").val(),
            Commentator1: $("#game-com-1").val(),
            Commentator2: $("#game-com-2").val(),
            HomeTeamData: homeTeamData,
            AwayTeamData: awayTeamData
        },
        success: function(r) {
            var outputFile = JSON.parse(r);

            switch (mode) {
                case "preview":
                    window.open("../file-handler/SettingsPreview.php?file=" + outputFile.file, "_blank");
                    break;

                case "download":
                    $("#game-settings-download-link").attr(
                        "href",
                        outputFile.protocol + outputFile.path + outputFile.file
                    );
                    $("#game-settings-download-link").text(outputFile.file);
                    $("#show-download-url").show();
                    break;
            }
        }
    });
}
