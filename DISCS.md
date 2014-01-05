DISCS spec
==========

```json
{
    "interface": {
        "group": null,
        "title": "DemoTurtle",
        "alias": "demo",
        "hostname": "rpi-032113",
        "version": "testing",
        "logo": "https://my.flatturtle.com/uploads/demo/logo.png",
        "color": "#10db31",
        "lang": null,
        "location": "Pleinlaan 9 1050 Brussels",
        "latitude": "50.8206579",
        "longitude": "4.3923785",
        "wifi": "none",
        "hide_ft_logo": "0",
        "allow_whitelabel": "0",
        "disable_left": "0",
        "disable_right": "0"
    },
    "plugins": {
        "footer_type": "none",
        "footer": " ",
        "clock": "1",
        "power": "1",
        "masterpower": "0"
    },
    "turtles": {
        "317": {
            "order": "0",
            "name": "Map",
            "type": "map",
            "options": {
                "location": "",
                "zoom": "12"
            },
            "pane": "135"
        },
        "1012": {
            "order": "3",
            "name": "NMBS",
            "type": "nmbs",
            "options": {
                "location": "Etterbeek",
                "limit": "8",
                "destination": "Brussels South, ",
                "time_walk": "7.083333333333333"
            },
            "pane": "35"
        },
        "1067": {
            "order": "4",
            "name": "De Lijn",
            "type": "delijn",
            "options": {
                "location": "Elsene Etterbeek Station",
                "limit": "5",
                "time_walk": "2.8666666666667"
            },
            "pane": "35"
        },
        "1068": {
            "order": "2",
            "name": "De Lijn",
            "type": "delijn",
            "options": {
                "location": "Elsene Vub Gebouw M Inrit 11",
                "limit": "4",
                "time_walk": "2.4166666666667"
            },
            "pane": "35"
        },
        "1069": {
            "order": "1",
            "name": "Calendar",
            "type": "calendar",
            "options": {
                "url": "http://www.google.com/calendar/ical/smitresearch.be_2d31363433343139332d313639@resource.calendar.google.com/private-035cef7db9362557e6e53e08a9f0e3f6/basic.ics",
                "header": "Test calendar"
            },
            "pane": "504"
        },
        "1071": {
            "order": "1",
            "name": "Villo",
            "type": "villo",
            "options": {
                "name": "Gare D'Etterbeek",
                "location": "50.820500994345,4.3880593559265",
                "limit": "5",
                "time_walk": "8.633333333333333"
            },
            "pane": "35"
        },
        "1072": {
            "order": "0",
            "name": "Weather",
            "type": "weather",
            "options": {
                "location": ""
            },
            "pane": "505"
        },
        "1073": {
            "order": "1",
            "name": "RSS",
            "type": "rss",
            "options": {
                "feed": "",
                "limit": "6"
            },
            "pane": "505"
        },
        "1075": {
            "order": "0",
            "name": "Info",
            "type": "info",
            "options": {
                "data": "<h1><b>Welkom op iMinds Brussel</b></h1>azdazdzad<br><br>"
            },
            "pane": "507"
        },
        "1076": {
            "order": "0",
            "name": "Image",
            "type": "image",
            "options": {
                "urls": "[\"https://my.flatturtle.com/uploads/slideshow_images/demo/1076/1387463484_249-portrait.png\",\"https://my.flatturtle.com/uploads/slideshow_images/demo/1076/1387463570_6991-portrait.png\"]",
                "duration": "5000"
            },
            "pane": "508"
        }
    },
    "panes": {
        "35": {
            "type": "list",
            "colspan": "1",
            "duration": "15000",
            "title": null,
            "template": null,
            "order": "0"
        },
        "135": {
            "type": "widget",
            "colspan": "1",
            "duration": "15000",
            "title": "Live Traffic",
            "template": "traffic",
            "order": "1"
        },
        "504": {
            "type": "list",
            "colspan": "1",
            "duration": "15000",
            "title": null,
            "template": null,
            "order": "0"
        },
        "505": {
            "type": "widget",
            "colspan": "1",
            "duration": "15000",
            "title": "News",
            "template": "news",
            "order": "0"
        },
        "507": {
            "type": "widget",
            "colspan": "1",
            "duration": "15000",
            "title": "Information",
            "template": "info",
            "order": "0"
        },
        "508": {
            "type": "widget",
            "colspan": "1",
            "duration": "15000",
            "title": "Image",
            "template": "image",
            "order": "0"
        }
    }
}
```
