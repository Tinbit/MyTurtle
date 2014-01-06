DISCS spec
==========

MyTurtle uses our DISCS (Digital InfoScreen Configuration Specification) json. This json contains all the info the screen needs to configure its data sources and plugins.

Sections
--------

1. Interface
   
    This part of the DISCS contains all the information about the infoscreen.
    ```json
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
        }
    ```
2. Plugins

    Our Infoscreens can make use of plugins. This way special behavior can be created and handled. The included plugins can be found in `/src/js/plugins/`. 
    
    ```json
    "plugins": {
        "footer_type": "none",
        "footer": " ",
        "clock": "1",
        "power": "1",
        "masterpower": "0"
    }
    ```
3. Turtles

    The turtles section is arguably the most important part of the DISCS. Here all the turtles that will be shown on the screen are defined together with their turtle specific options.
    
    There are `list` turtles and `widget` turtles. [TODO]
    
    ```json
    "turtles": {
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
        }
    }
    ```
4. Panes

    The panes are the containers for the turtles. Multiple turtles can reside in one pane. The order of the panes and the duration before they get switched out is defined for each pane.
    
    ```json
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
    ```

All together
------------

All these sections brought together gives:

```json
{
    "interface": { },
    "plugins": { },
    "turtles": { },
    "panes": { }
}
```
