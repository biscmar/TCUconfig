function initGame(gameId) {
    $.ajax({
        type: "POST",
        url: "./LoadGameSettings.php",
        data: {
            GameNr: gameId,
            ApiUrl: Config.apiUrl,
            ApiParams: Config.apiParams
        },
        success: function(r) {
            var apiResponse = JSON.parse(r);

            if (apiResponse.statuscode == 200) {
                clearAllFields();

                var gameSettings = JSON.parse(apiResponse.response);

                var game = gameSettings.object;
                var references = gameSettings.references;

                // Section "Game"
                $("#game-id").val(game.id);

                $("#game-title").val("Meisterschaft NLA | Runde X | Saison 2017/2018");

                if (game.attrs.hasOwnProperty("starts_at")) {
                    var date = game.attrs.starts_at.split("T")[0].split("-");
                    $("#game-date").val(date[2] + "." + date[1] + "." + date[0]);

                    var time = game.attrs.starts_at.split("T")[1].split(":");
                    $("#game-time").val(time[0] + ":" + time[1]);
                }

                if (game.attrs.hasOwnProperty("gym")) {
                    var gymReference = game.attrs.gym;
                    var locationReference = references[gymReference].attrs.address;
                    $("#game-location").val(
                        references[gymReference].attrs.name + ", " + references[locationReference].attrs.location
                    );
                }

                if (game.attrs.referees[0] !== undefined) {
                    $("#game-ref-1").val(
                        references[game.attrs.referees[0]].attrs.first_name +
                            " " +
                            references[game.attrs.referees[0]].attrs.last_name
                    );
                }

                if (game.attrs.referees[1] !== undefined) {
                    $("#game-ref-2").val(
                        references[game.attrs.referees[1]].attrs.first_name +
                            " " +
                            references[game.attrs.referees[1]].attrs.last_name
                    );
                }

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
            } else {
                console.error(apiResponse.statuscode);
                console.error(apiResponse.response);
                var errMsgList = ["Die Spieldaten konnten nicht geladen werden. Weitere Infos in der Browser-Konsole."];
                displayError(errMsgList);
            }
        }
    });
}

function clearAllFields() {
    $("#section-game")
        .find("input")
        .val("");

    $("#home-team-long").val("");
    $("#home-team-short").val("");
    $("#home-coach").val("");
    $("#color-home")
        .find("div.selected")
        .removeClass("selected");
    $("#roster-home-starting-six")
        .find("div.starting-six-option-selected")
        .removeClass("starting-six-option-selected");
    $("#roster-home-starting-six-custom")
        .hide()
        .find("input")
        .val("");

    $("#away-team-long").val("");
    $("#away-team-short").val("");
    $("#away-coach").val("");
    $("#color-away")
        .find("div.selected")
        .removeClass("selected");
    $("#roster-away-starting-six")
        .find("div.starting-six-option-selected")
        .removeClass("starting-six-option-selected");
    $("#roster-away-starting-six-custom")
        .hide()
        .find("input")
        .val("");
}

function parseRoster(lineUpList, references, team) {
    $("#topscorer-" + team)
        .empty()
        .append(
            $("<option>", {
                value: "nicht_gesetzt"
            }).text("-- Nicht gesetzt --")
        );

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
        ts: null,
        roster: {}
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
    }

    rosterList.line1 = getLine(team, "line-1");
    rosterList.line2 = getLine(team, "line-2");
    rosterList.line3 = getLine(team, "line-3");
    rosterList.line4 = getLine(team, "line-4");
    rosterList.goal = $("#" + team + "-roster-tw1").val();
    rosterList.goal += "," + $("#" + team + "-roster-tw2").val();

    var ts = $("#topscorer-" + team).val() == "nicht_gesetzt" ? null : $("#topscorer-" + team).val();
    rosterList.ts = ts;

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

async function downloadGameSettings(mode) {
    var res = await validateGameSettingsData();
    if (res) {
        var homeTeamData = {
            HomeTeamLong: $("#home-team-long").val(),
            HomeTeamShort: $("#home-team-short").val(),
            HomeHeadcoach: $("#home-coach").val(),
            HomeColor: $("#color-home")
                .find(".selected")
                .attr("id"),
            HomeTeamLineup: getRosterList("home")
        };
        if (homeTeamData.HomeColor === undefined) {
            homeTeamData.HomeColor = null;
        }

        var awayTeamData = {
            AwayTeamLong: $("#away-team-long").val(),
            AwayTeamShort: $("#away-team-short").val(),
            AwayHeadcoach: $("#away-coach").val(),
            AwayColor: $("#color-away")
                .find(".selected")
                .attr("id"),
            AwayTeamLineup: getRosterList("away")
        };
        if (awayTeamData.AwayColor === undefined) {
            awayTeamData.AwayColor = null;
        }

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
                AwayTeamData: awayTeamData,
                OutputDirectory: Config.outputDirectory
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
}

function validateGameSettingsData() {
    return new Promise((resolve, reject) => {
        var errMsgList = [];
        var warnMsgList = [];

        // Trikot-Farbe
        if (
            $("#color-home")
                .find(".selected")
                .attr("id") == null
        ) {
            warnMsgList.push("Heimteam: Keine Trikot-Farbe ausgewählt");
        }

        if (
            $("#color-away")
                .find(".selected")
                .attr("id") == null
        ) {
            warnMsgList.push("Auswärtsteam: Keine Trikot-Farbe ausgewählt");
        }

        if (
            $("#color-away")
                .find(".selected")
                .attr("id") ==
                $("#color-home")
                    .find(".selected")
                    .attr("id") &&
            $("#color-home")
                .find(".selected")
                .attr("id") != null &&
            $("#color-away")
                .find(".selected")
                .attr("id") != null
        ) {
            warnMsgList.push("Heimteam und Auswärtsteam haben die gleiche Trikot-Farbe");
        }

        // Starting Six Option
        if ($("#roster-home-starting-six").find(".starting-six-option-selected").length == 0) {
            warnMsgList.push("Heimteam: Keine Starting Six Option ausgewählt");
        }

        if ($("#roster-away-starting-six").find(".starting-six-option-selected").length == 0) {
            warnMsgList.push("Auswärtsteam: Keine Starting Six Option ausgewählt");
        }

        // Starting Six Custom Values überprüfen
        if (
            $("#roster-home-starting-six")
                .find(".starting-six-option-selected")
                .attr("id") == "home-starting-six-custom"
        ) {
            var homeCustomStartingSix = {
                tw: $("#home-starting-six-tw").val(),
                dl: $("#home-starting-six-dl").val(),
                dr: $("#home-starting-six-dr").val(),
                c: $("#home-starting-six-c").val(),
                wl: $("#home-starting-six-wl").val(),
                wr: $("#home-starting-six-wr").val()
            };
            Object.keys(homeCustomStartingSix).forEach(key => {
                var position = $("label[for='home-starting-six-" + key + "']").text();

                if (homeCustomStartingSix[key] == "") {
                    errMsgList.push("Heimteam: Starting Six " + position + " ist nicht gesetzt");
                } else if (getRosterList("home").roster[homeCustomStartingSix[key]] === undefined) {
                    errMsgList.push("Heimteam: Starting Six " + position + " ist nicht in der Aufstellung");
                }
            });
        }

        if (
            $("#roster-away-starting-six")
                .find(".starting-six-option-selected")
                .attr("id") == "away-starting-six-custom"
        ) {
            var awayCustomStartingSix = {
                tw: $("#away-starting-six-tw").val(),
                dl: $("#away-starting-six-dl").val(),
                dr: $("#away-starting-six-dr").val(),
                c: $("#away-starting-six-c").val(),
                wl: $("#away-starting-six-wl").val(),
                wr: $("#away-starting-six-wr").val()
            };
            Object.keys(awayCustomStartingSix).forEach(key => {
                var position = $("label[for='away-starting-six-" + key + "']").text();

                if (awayCustomStartingSix[key] == "") {
                    errMsgList.push("Auswärtsteam: Starting Six " + position + " ist nicht gesetzt");
                } else if (getRosterList("away").roster[awayCustomStartingSix[key]] === undefined) {
                    errMsgList.push("Auswärtsteam: Starting Six " + position + " ist nicht in der Aufstellung");
                }
            });
        }

        // Topskorer
        if ($("#topscorer-home").val() == "nicht_gesetzt") {
            warnMsgList.push("Heimteam: Kein Topskorer ausgewählt");
        }

        if ($("#topscorer-away").val() == "nicht_gesetzt") {
            warnMsgList.push("Auswärtsteam: Kein Topskorer ausgewählt");
        }

        // Aufstellung
        if (Object.keys(getRosterList("home").roster).length === 0) {
            errMsgList.push("Heimteam: Keine Spieler in der Aufstellung");
        }

        if (Object.keys(getRosterList("away").roster).length === 0) {
            errMsgList.push("Auswärtsteam: Keine Spieler in der Aufstellung");
        }

        if (errMsgList.length != 0 || warnMsgList.length != 0) {
            displayError(errMsgList, warnMsgList).then(res => {
                resolve(res);
            });
        } else {
            resolve(true);
        }
    });
}
