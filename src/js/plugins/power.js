/*
 * FlatTurtle
 * Wrapper Qt Browser application object
 *
 * @author: Jens Segers (jens@irail.be)
 * @author: Michiel Vancoillie (michiel@irail.be)
 * @license: AGPLv3
 */

var Power = {
    cronJob : null,

    enable : function() {
        log.info("PLUGIN - POWER - Enable");
        if (typeof application == "object")
            application.enableScreen(true);
    },

    disable : function() {

        var playerObject = $("#playerobject");
	    if(typeof playerObject !== "undefined"
            && playerObject.length > 0){
            $("#playerobject").get(0).stop();
        }

        log.info("PLUGIN - POWER - Disable");

        // MyTurtleSleep page will turn it off after 3s
        //document.location.href = '../sleep';
        if (typeof application == "object")
            application.loadURL(document.location.href + '../sleep');
        else
            document.location.href = '../sleep';
    },

    destroy : function() {}

};
