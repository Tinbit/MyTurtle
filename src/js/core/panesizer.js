/*
 * FlatTurtle
 * The PaneSizer object will handle screen sizing,
 * it needs to be notified when a turtle is added and when it is deleted to function properly
 *
 * @author: Nik Torfs (nik@flatturtle.com)
 * @license: AGPLv3
 */

window.PaneSizer = (function(){

    // amount of widget turtles
    var widgetTurtles = 0;

    // amount of list turtles
    var listTurtles = 0;

    // A turtle is added, increment the count of that type
    function addTurtle(paneType){
        if(paneType == "widget"){
            widgetTurtles++;
        }else if(paneType == "list"){
            listTurtles++;
        }
        updatePaneSize();
    }

    // A turtle is removed, reduce the count of that type
    function removeTurtle(paneType){
        if(paneType == "widget"){
            widgetTurtles--;
        }else if(paneType == "list"){
            listTurtles--;
        }
        updatePaneSize();
    }

    // Check if any of the panes is empty, if so make the other one go fullscreen
    function updatePaneSize(){
        var listPane = $(".group.list");
        var groupPane = $(".group.widget");

        // If one (and only one) of the panes is empty let the other one go fullScreen
        if(listTurtles == 0 && widgetTurtles != 0){

            //fullscreen for left pane
            listPane.css('display','none');
            groupPane.css('width','100%');

        }else if(widgetTurtles == 0 && listTurtles != 0){

            // fullscreen for right pane
            groupPane.css('display','none');
            listPane.css('width','100%');

        }else{
            // remove added inline css
            listPane.css("display", "");
            listPane.css("width", "");
            groupPane.css("display", "");
            groupPane.css("width", "")
        }
    }

    return {
        addTurtle : addTurtle,
        removeTurtle : removeTurtle
    }

}());

