const de = {
    auth: {
        signIn: {
            title: 'Willkommen',
            email: {
                placeholder: 'Email Adresse',
                required: 'Dieses Feld ist erforderlich',
                matches: 'Ungültige Email Adresse'
            },
            password: {
                placeholder: 'Passwort',
                required: 'Dieses Feld ist erforderlich',
                min: 'Passwort muss mindestens 8 Zeichen lang sein',
                matchLowerCase: 'Passwort muss einen Kleinbuchstaben enthalten',
                matchUpperCase: 'Passwort muss einen Großbuchstaben enthalten',
                matchNumber: 'Passwort muss eine Zahl enthalten',
                matchSpecial: 'Passwort muss ein Sonderzeichen enthalten'
            },
            submit: 'Anmelden',
            tos: 'AGB',
            policy: 'Datenschutzterklärung',
            signUp: 'Registrieren',
            agree: 'Mit der Anmeldung stimmst du den {tos} und der {policy} zu',
            switch: 'Du hast kein Konto? {signUp}.'
        },
        signUp: {
            title: 'Account erstellen',
            name: {
                placeholder: 'Username',
                required: 'Dieses Feld ist erforderlich',
                min: 'Username muss mindestens 3 Zeichen lang sein',
                max: 'Maximale Länge ist 30 Zeichen',
                matches: 'Username enthält unerlaubte Zeichen'
            },
            email: {
                placeholder: 'Email Adresse',
                required: 'Dieses Feld ist erforderlich',
                matches: 'Ungültige Email Adresse'
            },
            password: {
                placeholder: 'Passwort',
                required: 'Dieses Feld ist erforderlich',
                match: 'Passwörter stimmen nicht überein',
                min: 'Passwort muss mindestens 8 Zeichen lang sein',
                matchLowerCase: 'Passwort muss einen Kleinbuchstaben enthalten',
                matchUpperCase: 'Passwort muss einen Großbuchstaben enthalten',
                matchNumber: 'Passwort muss eine Zahl enthalten',
                matchSpecial: 'Passwort muss ein Sonderzeichen enthalten'
            },
            submit: 'Registrieren',
            tos: 'AGB',
            policy: 'Datenschutzterklärung',
            signIn: 'Anmelden',
            agree: 'Mit der Registrierung stimmst du den {tos} und der {policy} zu',
            switch: 'Du hast bereits ein Konto? {signIn}.'
        }
    },
    sidebar: {
        logo: 'MoonBot',
        select: 'Coin auswählen...',
        home: 'Dashboard',
        strategy: 'Strategie',
        offers: 'Angebote',
        earnings: 'Einnahmen',
        settings: 'Einstellungen',
        tour: 'Einführung',
        theme: {
            light: 'Light mode',
            dark: 'Dark mode'
        },
        language: 'Sprache',
        logout: 'Abmelden'
    },
    tour: {
        begin: 'Willkommen bei Moonbot',
        count: 'Schritt {step} von {total}',
        steps: [
            // first
            {
                description: 'Wollen Sie eine kleine Tour machen?',
                buttons: {
                    cancel: 'Vielleicht später',
                    start: 'Start'
                }
            },
            // settings
            // api
            {
                description: 'Füge API Key und Secret hinzu, um dich mit der Börse zu verbinden.',
                buttons: {
                    cancel: 'Abbrechen',
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // select
            {
                description: 'Sobald die Verbindung hergestellt wurde, wähle eine Coin aus deiner Wallet.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // strategy
            // select
            {
                description: 'Wähle eine Strategie Vorlage für den Bot aus.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // infos
            {
                description: 'Überprüfe den aktuellen Mindestbetrag eines Angebots.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // manage
            {
                description: 'Konfiguriere deine Strategie anhand von verschiedenen Metriken.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // activate
            {
                description: 'Wenn du mit deinen Einstellungen zufrieden bist, aktiviere deine Strategie.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // offers
            // open
            {
                description: 'Schaue dir die offenen Angebote an und lösche sie gegebenfalls.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // active
            {
                description: 'Beobachte deine aktiven Angebote und geschätzte Einnahmen.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // earnings
            // watch
            {
                description:
                    'Beobachte deine EinnahmenHier erhältst du einen Überblick über deine Einnahmen, mit der Möglichkeit diese zu exportieren.',
                buttons: {
                    back: 'Zurück',
                    next: 'Weiter'
                }
            },
            // last
            {
                description: 'Wenn du noch Fragen hast, kannst du dich gerne an uns wenden.',
                buttons: {
                    close: 'Schließen'
                }
            }
        ],
        end: 'Danke!'
    },
    modal: {
        title: 'Sprache wechseln',
        description: [
            'Wähle eine Sprache aus der Liste unten.',
            'Möglicherweise werden in Zukunft weitere Sprachen verfügbar sein.'
        ],
        cancel: 'Abbrechen'
    },
    cards: {
        active: {
            amount: 'Aktiver Betrag',
            estFees: 'Geschätzte Gebühren (15%)'
        },
        rates: {
            best: 'Bester Kurs',
            average: 'Durchschnittlicher Kurs',
            lowest: 'Niedrigster Kurs'
        },
        estimate: {
            earnings: 'Geschätzte Einnahmen',
            tomorrow: 'Geschätzt morgen',
            avgPeriod: 'Durchschnittliche Dauer'
        },
        open: {
            available: 'Verfügbarer Betrag',
            open: 'Offener Betrag'
        },
        earnings: {
            total: {
                earnings: 'Gesamte Einnahmen',
                fees: 'Gesamte Gebühren (15%)',
                time: 'Gesamte Dauer'
            },
            avgPerDay: 'Durchschnitt/Tag'
        },
        home: {
            totalAmount: 'Gesamtbetrag'
        }
    },
    home: {
        title: 'Übersicht',
        sections: {
            active: 'Aktive Angebote',
            open: 'Offene Angebote',
            earnings: 'Einnahmen'
        }
    },
    strategy: {
        title: 'Strategie',
        select: {
            placeholder: 'Strategie auswählen...',
            list: {
                simple: {
                    label: 'Einfaches Angebot (Anfänger)',
                    icon: 'i-[tabler-repeat-once]'
                },
                equal: {
                    label: 'Gleichmäßig teilen (Fortgeschritten)',
                    icon: 'i-[tabler-arrows-split-2]'
                },
                pyramid: {
                    label: 'Umgekehrte Pyramide (Experte)',
                    icon: 'i-[vaadin-pyramid-chart] rotate-180'
                }
            }
        },
        active: 'Aktiv',
        inactive: 'Inaktiv',
        info: {
            note: 'Mindestbetrag zum leihen',
            toggle: {
                text: 'Vergangenheit {toggle}',
                show: 'anzeigen',
                hide: 'verstecken'
            },
            tooltip: {
                fundingProvided: 'Angebote (Verfügung)',
                fundingUsed: 'Angebote (Aktiv)',
                averagePeriod: 'Durchschn. Zeitraum',
                frr: 'Flash-Rücklaufquote'
            }
        },
        simple: {
            title: 'Einfaches Angebot',
            description: ['Diese Strategie erstellt ein Angebot mit dem gesamten Guthaben.', 'Du kannst Limits setzen.'],
            minAmount: {
                label: 'Mindestbetrag',
                info: 'Mindestbetrag zum leihen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Mindestbetrag zu niedrig'
            },
            minRate: {
                label: 'Mindestzinssatz',
                info: 'Mindestzinssatz zum leihen, Tagessatz (eg. 0.03% / 100)',
                required: 'Dieses Feld ist erforderlich',
                min: 'Mindestzinssatz zu niedrig'
            },
            minPeriod: {
                label: 'Mindestdauer',
                info: 'Mindestdauer zum verleihen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Mindestdauer zu niedrig',
                max: 'Mindestdauer zu hoch'
            },
            save: 'Änderungen speichern'
        },
        equal: {
            title: 'Gleichmäßig aufteilen',
            description: [
                'Diese Strategie teilt dein verfügbares Guthaben in gleiche Angebote auf.',
                'Du kannst Limits setzen und statische Zuordnungen definieren.'
            ],
            minAmount: {
                label: 'Mindestbetrag',
                info: 'Mindestbetrag zum leihen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Mindestbetrag zu niedrig'
            },
            splitAllIn: {
                label: 'Mindestguthaben',
                info: 'Unterhalb dieses Betrags wird dein Guthaben nicht aufgeteilt',
                required: 'Dieses Feld ist erforderlich',
                min: 'Mindestguthaben zu niedrig'
            },
            splitUnit: {
                label: 'Split Einheit',
                info: 'Dein Guthaben wird in gleiche Teile dieses Betrags geteilt',
                required: 'Dieses Feld ist erforderlich',
                min: 'Split Einheit zu niedrig'
            },
            overAmount: {
                label: 'Über Menge',
                info: 'Erhalte eine etwas höhere Rate, indem du einen gewissen Betrag im Auftragsbuch überspringen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Über Menge zu niedrig'
            },
            periodMap: {
                label: 'Mindestdauer Mapping',
                info: 'Definiere Ratenstufen und lege einen Zeitraum fest',
                add: 'Eintrag hinzufügen',
                remove: 'Eintrag löschen',
                sort: 'Die Liste wird vom Server automatisch sortiert.',
                columns: [
                    {
                        title: 'Mindestzinssatz',
                        info: 'Mindestzinssatz zum leihen, Tagessatz (eg. 0.03% / 100)'
                    },
                    {
                        title: 'Mindestdauer',
                        info: 'Mindestdauer zum leihen'
                    }
                ],
                required: 'Dieses Feld ist erforderlich',
                min: 'Betrag zu niedrig',
                max: 'Betrag zu hoch'
            },
            save: 'Änderungen speichern'
        },
        pyramid: {
            title: 'Umgekehrte Pyramide',
            description: [
                'Diese Strategie verteilt die Angebote in einem bestimmten Bereich, und die Angebote wachsen mit der Rate.',
                'Du kannst Limits setzen, statische Mappings und dynamische Einstellungen definieren.'
            ],
            minAmount: {
                label: 'Mindestbetrag',
                info: 'Mindestbetrag zum leihen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Mindestbetrag zu niedrig'
            },
            minRate: {
                label: 'Mindestzinssatz',
                info: 'Mindestzinssatz zum leihen, Tagessatz (eg. 0.03% / 100)',
                required: 'Dieses Feld ist erforderlich',
                min: 'Mindestzinssatz zu niedrig'
            },
            lowBoundRate: {
                label: 'Unteres Kurslimit',
                info: 'Minimaler Kreditzins',
                required: 'Dieses Feld ist erforderlich',
                min: 'Unteres Kurslimit zu niedrig'
            },
            upBoundRate: {
                label: 'Oberes Kurslimit',
                info: 'Maximaler Kreditzins',
                required: 'Dieses Feld ist erforderlich',
                min: 'Oberes Kurslimit zu niedrig'
            },
            growExponential: {
                label: 'Exponentieller Betrag',
                info: 'Betrag wächst mit höheren Raten und längeren Zeiträumen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Exponentieller Betrag zu niedrig'
            },
            overAmount: {
                label: 'Über Menge',
                info: 'Erhalte eine etwas höhere Rate, indem du einen gewissen Betrag im Auftragsbuch überspringen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Über Menge zu niedrig'
            },
            skipRemaining: {
                label: 'Verbleibende überspringen',
                info: 'Erhalte einen etwas höheren Kurs, indem du Kurse im Auftragsbuch überspringen',
                required: 'Dieses Feld ist erforderlich',
                min: 'Verbleibende überspringen zu niedrig'
            },
            rapMap: {
                label: 'Angebot Mapping',
                info: 'Definiere Ratenstufen, weisen einen Mindestbetrag zu und lege einen Zeitraum fest',
                add: 'Eintrag hinzufügen',
                remove: 'Eintrag löschen',
                sort: 'Die Liste wird vom Server automatisch sortiert.',
                columns: [
                    {
                        title: 'Mindestzinssatz',
                        info: 'Mindestzinssatz zum leihen, Tagessatz (eg. 0.03% / 100)'
                    },
                    {
                        title: 'Mindestdauer',
                        info: 'Mindestbetrag zum leihen'
                    },
                    {
                        title: 'Dauer',
                        info: 'Mindestdauer zum verleihen'
                    }
                ],
                required: 'Dieses Feld ist erforderlich',
                min: 'Betrag zu niedrig',
                max: 'Betrag zu hoch'
            },
            save: 'Änderungen speichern'
        }
    },
    offers: {
        active: {
            title: 'Aktive Angebote',
            table: {
                loading: 'Lade...',
                empty: 'Keine aktiven Angebote',
                columns: ['Betrag', 'Kurs', 'APY', 'Gebühren', 'Ertrag', 'Geschätzt', 'Läuft ab'],
                exclude: [],
                noMobile: ['APY', 'Gebühren', 'Ertrag']
            }
        },
        open: {
            title: 'Offene Angebote',
            table: {
                loading: 'Lade...',
                empty: 'Keine offenen Angebote',
                columns: ['Betrag', 'Kurs', 'Dauer', 'Gebühren', 'Geschätzt', 'Erstellt', 'Abbrechen'],
                exclude: ['Anfang', 'Status', 'Typ', 'Aktualisiert'],
                noMobile: ['Anfang', 'Gebühren'],
                period: 'Tage',
                cancelOne: 'Abbrechen',
                cancelAll: 'Alle Angebote abbrechen'
            }
        }
    },
    earnings: {
        title: 'Einnahmen',
        info: 'Einnahmen werden alle 4 Stunden aktualisiert.',
        chart: {
            title: 'Letzte 30 Tage',
            tooltip: { label: 'Profit' }
        },
        table: {
            title: 'Gesamte Liste',
            settings: {
                export: 'Exportiere',
                entries: 'Einträge'
            },
            loading: 'Lade...',
            empty: 'Keine Einnahmen vorhanden',
            end: 'Keine weiteren Einträge gefunden',
            columns: ['Datum', 'Betrag'],
            exclude: [],
            noMobile: []
        }
    },
    settings: {
        title: 'Einstellungen',
        lightbox: {
            title: 'Bitfinex API Key Berechtigungen',
            description: 'Dies sind die Berechtigungen, die erforderlich sind, damit der Bot ordnungsgemäß funktioniert.'
        },
        info: {
            connectApi: {
                label: 'Wie erstellt man einen {link}',
                link: 'Bitfinex API Key'
            },
            permissions: {
                label: 'Was sind die {link}',
                link: 'erforderliche Berechtigungen'
            },
            enterData: 'Gib das API Key und Secret ein'
        },
        details: {
            title: 'User Details',
            name: {
                label: 'Username',
                placeholder: 'Username',
                required: 'Dieses Feld ist erforderlich',
                min: 'Username muss mindestens 3 Zeichen lang sein',
                max: 'Maximale Länge ist 30 Zeichen',
                matches: 'Username enthält unerlaubte Zeichen'
            },
            email: {
                label: 'Email Adresse',
                placeholder: 'Email Adresse',
                required: 'Dieses Feld ist erforderlich',
                matches: 'Ungültige Email Adresse'
            }
        },
        api: {
            title: 'Bitfinex API',
            key: {
                label: 'API Key',
                required: 'Dieses Feld ist erforderlich'
            },
            secret: {
                label: 'API Secret',
                required: 'Dieses Feld ist erforderlich'
            }
        },
        password: {
            title: 'Passwort',
            current: {
                label: 'Aktuelles Passwort',
                required: 'Dieses Feld ist erforderlich',
                min: 'Passwort muss mindestens 8 Zeichen lang sein',
                matchLowerCase: 'Passwort muss einen Kleinbuchstaben enthalten',
                matchUpperCase: 'Passwort muss einen Großbuchstaben enthalten',
                matchNumber: 'Passwort muss eine Zahl enthalten',
                matchSpecial: 'Passwort muss ein Sonderzeichen enthalten'
            },
            new: {
                label: 'Neues Passwort',
                required: 'Dieses Feld ist erforderlich',
                empty: 'Bitte gib ein neues Passwort ein',
                same: 'Du kannst nicht das gleiche Passwort verwenden',
                match: 'Passwörter stimmen nicht überein',
                min: 'Passwort muss mindestens 8 Zeichen lang sein',
                matchLowerCase: 'Passwort muss einen Kleinbuchstaben enthalten',
                matchUpperCase: 'Passwort muss einen Großbuchstaben enthalten',
                matchNumber: 'Passwort muss eine Zahl enthalten',
                matchSpecial: 'Passwort muss ein Sonderzeichen enthalten'
            },
            confirm: {
                label: 'Passwort bestätigen',
                required: 'Dieses Feld ist erforderlich',
                empty: 'Bitte gib ein neues Passwort ein',
                same: 'Du kannst nicht das gleiche Passwort verwenden',
                match: 'Passwörter stimmen nicht überein',
                min: 'Passwort muss mindestens 8 Zeichen lang sein',
                matchLowerCase: 'Passwort muss einen Kleinbuchstaben enthalten',
                matchUpperCase: 'Passwort muss einen Großbuchstaben enthalten',
                matchNumber: 'Passwort muss eine Zahl enthalten',
                matchSpecial: 'Passwort muss ein Sonderzeichen enthalten'
            }
        },
        save: 'Save Changes'
    },
    terms: {
        title: 'Allgemeine Geschäftsbedingungen',
        tagline: 'Letztes Update: 2023/02/01',
        list: [
            {
                title: 'Einleitung',
                text: [
                    'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung des Kryptowährungsleihbots (der "Bot"), der von MoonByte (das "Unternehmen") bereitgestellt wird. Durch die Nutzung des Bots erklären Sie sich mit diesen AGB einverstanden. Wenn Sie diesen AGB nicht zustimmen, dürfen Sie den Bot nicht nutzen.'
                ]
            },
            {
                title: 'Beschreibung des Bots',
                text: [
                    'Der Bot ist ein automatisiertes System, das das Verleihen von Kryptowährung auf Bitfinex erleichtert. Das Unternehmen befürwortet oder garantiert keine bestimmten Kredittransaktionen, die über den Bot durchgeführt werden können.'
                ]
            },
            {
                title: 'Benutzerkonten',
                text: [
                    'Um den Bot zu verwenden, müssen Sie ein Konto erstellen und genaue und vollständige Informationen angeben, wie im Registrierungsformular verlangt. Sie sind dafür verantwortlich, die Vertraulichkeit Ihres Kontos und Passworts zu wahren und den Zugriff auf Ihren Computer einzuschränken. Sie stimmen zu, die Verantwortung für alle Aktivitäten zu übernehmen, die unter Ihrem Konto oder Passwort stattfinden.'
                ]
            },
            {
                title: 'Verwendung des Bots',
                text: [
                    'Sie dürfen den Bot nur für rechtmäßige Zwecke verwenden. Sie dürfen den Bot nicht für illegale oder nicht autorisierte Zwecke verwenden, einschließlich, aber nicht beschränkt auf Geldwäsche oder Terrorismusfinanzierung.'
                ]
            },
            {
                title: 'Keine Garantie',
                text: [
                    'Der Bot wird "wie besehe" und "wie verfügbar" bereitgestellt. Das Unternehmen gibt keinerlei ausdrückliche oder stillschweigende Zusicherungen oder Gewährleistungen in Bezug auf den Betrieb des Bot oder die im Bot enthaltenen Informationen, Inhalte, Materialien oder Produkte ab. Das Unternehmen garantiert nicht, dass der Bot ununterbrochen oder fehlerfrei ist, und das Unternehmen haftet nicht für Unterbrechungen oder Fehler.'
                ]
            },
            {
                title: 'Haftungsbeschränkung',
                text: [
                    'Das Unternehmen haftet nicht für Schäden jeglicher Art, die sich aus der Nutzung des Bots ergeben, einschließlich, aber nicht beschränkt auf, direkte, indirekte, zufällige, Straf- und Folgeschäden.'
                ]
            },
            {
                title: 'Entschädigung',
                text: [
                    'Sie erklären sich damit einverstanden, das Unternehmen und seine verbundenen Unternehmen, leitenden Angestellten, Vertreter und Mitarbeiter von allen Ansprüchen oder Forderungen, einschließlich angemessener Anwaltsgebühren, freizustellen und schadlos zu halten, die von Dritten aufgrund oder aufgrund Ihrer Nutzung des Bots, Ihrer Verletzung von erhoben werden dieser AGB oder Ihre Verletzung von Rechten eines anderen.'
                ]
            },
            {
                title: 'Geltendes Recht',
                text: [
                    'Diese AGB unterliegen den Gesetzen Österreichs und werden in Übereinstimmung mit diesen ausgelegt, ohne dass die Grundsätze des Kollisionsrechts wirksam werden.'
                ]
            },
            {
                title: 'Ganze Vereinbarung',
                text: [
                    'Diese AGB stellen die gesamte Vereinbarung zwischen Ihnen und dem Unternehmen in Bezug auf die Nutzung des Bots dar. Sollte sich herausstellen, dass eine Bestimmung dieser AGB ungültig oder nicht durchsetzbar ist, bleiben die übrigen Bestimmungen in vollem Umfang in Kraft.'
                ]
            },
            {
                title: 'Änderungen der AGB',
                text: [
                    'Das Unternehmen behält sich das Recht vor, diese AGB jederzeit ohne Vorankündigung zu ändern. Ihre fortgesetzte Nutzung des Bots nach Änderungen dieser AGB gilt als Ihre Zustimmung zu diesen Änderungen.'
                ]
            }
        ]
    },
    privacy: {
        title: 'Datenschutzerklärung',
        tagline: 'Letztes Update: 2023/02/01',
        list: [
            {
                title: 'Einleitung',
                text: [
                    'Diese Datenschutzrichtlinie erläutert, wie MoonByte (das "Unternehmen") alle personenbezogenen Daten sammelt, verwendet und schützt, die Sie uns zur Verfügung stellen, wenn Sie unseren Kryptowährungs-Verleih-Bot (der "Bot") verwenden. Das Unternehmen verpflichtet sich sicherzustellen, dass Ihre Privatsphäre geschützt ist. Sollten wir Sie bitten, bestimmte Informationen anzugeben, anhand derer Sie bei der Verwendung des Bots identifiziert werden können, können Sie sicher sein, dass diese nur in Übereinstimmung mit dieser Datenschutzrichtlinie verwendet werden.'
                ]
            },
            {
                title: 'Erfassung und Verwendung von Informationen',
                text: [
                    'Das Unternehmen erhebt und verwendet personenbezogene Daten wie Ihre E-Mail-Adresse und IP-Adresse, wenn Sie ein Konto erstellen oder den Bot verwenden. Wir verwenden diese Informationen, um den Bot bereitzustellen und zu verbessern, mit Ihnen zu kommunizieren und gesetzliche und regulatorische Anforderungen zu erfüllen.'
                ]
            },
            {
                title: 'Cookies',
                text: [
                    'Der Bot verwendet Cookies, um Ihre Erfahrung bei der Verwendung des Bots zu verbessern. Cookies sind kleine Textdateien, die vom Bot auf Ihrem Gerät abgelegt werden und die bestimmte Informationen über Ihre Nutzung des Bots speichern. Sie können Cookies akzeptieren oder ablehnen. Die meisten Webbrowser akzeptieren Cookies automatisch, aber Sie können Ihre Browsereinstellungen normalerweise ändern, um Cookies abzulehnen, wenn Sie dies bevorzugen.'
                ]
            },
            {
                title: 'Sicherheit',
                text: [
                    'Das Unternehmen verpflichtet sich sicherzustellen, dass Ihre personenbezogenen Daten sicher sind. Um unbefugten Zugriff oder Offenlegung zu verhindern, haben wir geeignete physische, elektronische und verwaltungstechnische Verfahren eingerichtet, um die von uns erfassten Informationen zu schützen und zu sichern.'
                ]
            },
            {
                title: 'Websites von Drittanbietern',
                text: [
                    'Der Bot kann Links zu anderen Websites enthalten. Das Unternehmen ist nicht verantwortlich für die Datenschutzpraktiken dieser anderen Websites. Sie sollten Vorsicht walten lassen und die für die betreffende Website geltende Datenschutzerklärung lesen.'
                ]
            },
            {
                title: 'Änderungen an dieser Datenschutzrichtlinie',
                text: [
                    'Das Unternehmen behält sich das Recht vor, diese Datenschutzrichtlinie jederzeit ohne Vorankündigung zu ändern. Ihre fortgesetzte Nutzung des Bots nach Änderungen dieser Datenschutzrichtlinie gilt als Ihre Zustimmung zu diesen Änderungen.'
                ]
            },
            {
                title: 'Kontaktiere uns',
                text: [
                    'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter support@moonbot.org.'
                ]
            }
        ]
    },
    legal: {
        title: 'Legal Disclaimer',
        tagline: 'Last update: 2023/02/01',
        list: [
            {
                title: '',
                text: [
                    'Die auf dieser Website enthaltenen Informationen dienen nur allgemeinen Informationszwecken. Die Informationen werden von MoonByte bereitgestellt, und obwohl wir uns bemühen, die Informationen auf dem neuesten Stand und korrekt zu halten, geben wir keinerlei ausdrückliche oder stillschweigende Zusicherungen oder Gewährleistungen hinsichtlich der Vollständigkeit, Genauigkeit, Zuverlässigkeit, Eignung oder Verfügbarkeit in Bezug auf die Website ab oder die Informationen, Produkte, Dienstleistungen oder zugehörigen Grafiken, die auf der Website enthalten sind, für irgendeinen Zweck. Jegliches Vertrauen, das Sie auf solche Informationen setzen, erfolgt daher ausschließlich auf Ihr eigenes Risiko.',
                    'In keinem Fall haften wir für Verluste oder Schäden, einschließlich, aber nicht beschränkt auf, indirekte oder Folgeschäden oder Verluste oder Verluste oder Schäden, die sich aus dem Verlust von Daten oder Gewinnen ergeben, die sich aus oder im Zusammenhang mit der Nutzung dieser Website ergeben .',
                    'Über diese Website können Sie auf andere Websites verlinken, die nicht unter der Kontrolle von MoonByte stehen. Wir haben keine Kontrolle über Art, Inhalt und Verfügbarkeit dieser Seiten. Die Aufnahme von Links impliziert nicht unbedingt eine Empfehlung oder Billigung der darin zum Ausdruck gebrachten Ansichten.',
                    'Es werden alle Anstrengungen unternommen, um die Website reibungslos am Laufen zu halten. MoonByte übernimmt jedoch keine Verantwortung und haftet nicht dafür, dass die Website aufgrund technischer Probleme, die außerhalb unserer Kontrolle liegen, vorübergehend nicht verfügbar ist.'
                ]
            },
            {
                title: 'Copyright Notice',
                text: [
                    'Diese Website und ihr Inhalt sind urheberrechtlich geschützt von MoonByte - © MoonByte 2023. Alle Rechte vorbehalten.',
                    'Jede Weiterverbreitung oder Vervielfältigung eines Teils oder des gesamten Inhalts in irgendeiner anderen Form als der folgenden ist untersagt:',
                    'Sie dürfen den Inhalt für den persönlichen Gebrauch an einzelne Dritte kopieren, jedoch nur, wenn Sie die Website als Quelle des Materials angeben.',
                    'Sie dürfen den Inhalt nur mit unserer ausdrücklichen schriftlichen Genehmigung verbreiten oder kommerziell nutzen. Sie dürfen sie auch nicht übertragen oder auf einer anderen Website oder einem anderen elektronischen Abrufsystem speichern.'
                ]
            }
        ]
    },
    error: {
        title: '404',
        tagline: 'Seite nicht gefunden',
        button: 'Home'
    },
    toasts: {
        unknown: 'Interner Fehler',
        forbidden: '403 Verboten',
        successfulAuth: 'Authentifizierung erfolgreich',
        apiClientError: 'Verbindung zur API fehlgeschlagen',
        dbError: 'Verbindung zur Datenbank fehlgeschlagen',
        failedBackend: 'Backend nicht erreichbar',
        invalidCharsUsername: 'Username enthält unerlaubte Zeichen',
        minCharsUsername: 'Username muss mindestens 3 Zeichen lang sein',
        maxCharsUsername: 'Maximale Länge ist 30 Zeichen',
        invalidEmail: 'Ungültige Email Adresse',
        requiredPwCurrent: 'Aktuelles Passwort ist erforderlich',
        invalidPwCurrent: 'Aktuelles Passwort ist falsch',
        emptyPassword: 'Bitte gib ein neues Passwort ein',
        samePassword: 'Du kannst nicht das gleiche Passwort verwenden',
        noMatchPassword: 'Passwörter stimmen nicht überein',
        minCharsPwCurrent: 'Current Passwort muss mindestens 8 Zeichen lang sein',
        lowerCasePwCurrent: 'Current Passwort muss einen Kleinbuchstaben enthalten',
        upperCasePwCurrent: 'Current Passwort muss einen Großbuchstaben enthalten',
        numberPwCurrent: 'Current Passwort muss eine Zahl enthalten',
        specialCharPwCurrent: 'Current Passwort muss ein Sonderzeichen enthalten',
        minCharsNewPassword: 'New Passwort muss mindestens 8 Zeichen lang sein',
        lowerCaseNewPassword: 'New Passwort muss einen Kleinbuchstaben enthalten',
        upperCaseNewPassword: 'New Passwort muss einen Großbuchstaben enthalten',
        numberNewPassword: 'New Passwort muss eine Zahl enthalten',
        specialCharNewPassword: 'New Passwort muss ein Sonderzeichen enthalten',
        wrongEmailPassword: 'Falsche Email Adresse oder Passwort',
        invalidApiKeySecret: 'Key oder Secret ungültig',
        invalidApiKeyPermissions: 'Fehlende Key Berechtigungen',
        notAvailableCoin: 'Coin nicht verfügbar',
        notAvailableUser: 'User nicht verfügbar',
        savedChanges: 'Änderungen gespeichert',
        noChanges: 'Keine Änderungen',
        lowMinAmount: 'Mindestbetrag zu niedrig',
        lowMinRate: 'Mindestzinssatz zu niedrig',
        lowMinPeriod: 'Mindestdauer zu niedrig',
        lowSplitAllIn: 'Mindestguthaben zu niedrig',
        lowSplitUnit: 'Split Einheit zu niedrig',
        lowOverAmount: 'Über Menge zu niedrig',
        lowLowBoundRate: 'Unteres Kurslimit zu niedrig',
        lowUpBoundRate: 'Oberes Kurslimit zu niedrig',
        lowGrowExponential: 'Exponentieller Betrag zu niedrig',
        lowSkipRemaining: 'Verbleibende überspringen zu niedrig',
        maxOfferMap: 'Maximal 10 Einträge im Angebot Mapping',
        lowOfferMapRate: 'Angebot Mapping Kurs zu niedrig',
        lowOfferMapAmount: 'Angebot Mapping Betrag zu niedrig',
        lowOfferMapPeriod: 'Angebot Mapping Periode zu niedrig',
        highOfferMapPeriod: 'Angebot Mapping Periode zu hoch',
        successCancelAllOffers: 'Alle Angebote wurden abgebrochen',
        errorCancelAllOffers: 'Fehler beim Abbrechen der Angebote',
        successCancelOneOffer: 'Das Angebot wurde abgebrochen',
        errorCancelOneOffer: 'Fehler beim Abbrechen des Angebots'
    }
};

export default de;
