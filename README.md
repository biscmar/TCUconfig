# TCUconfig
Einstellungen (config.js):
* __apiUrl__: URL zur REST-API von swiss unihockey. Beispiel: "https://api-staging.swissunihockey.ch/bo/games/"
* __apiParams__: Parameter, die bei der Abfrage des Spiels mitgegeben werden. Aktueller Wert: "?set=game-report"
* __outputDirectory__: Pfad zum output Verzeichnis. Standardmässig befindet sich der output Ordner im root-Verzeichnis des Webservers. Wird TCUconfig in einem Sub-Directory installiert, muss dies hier konfiguriert werden. Beispiel mit Sub-Directory: "TCUconfig/output"
* __gameTitleDefault__: Vorgabewert, welcher ins Titelfeld der Spielkonfiguration geschrieben wird. Beispiel: "Meisterschaft NLA | Runde X | Saison 2017/2018"
