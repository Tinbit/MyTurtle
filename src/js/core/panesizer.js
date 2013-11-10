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
        var $listPane = $(".group.list");
        var $groupPane = $(".group.widget");

        // If one (and only one) of the panes is empty let the other one go full screen
        if(listTurtles == 0 && widgetTurtles != 0){

            //full screen for left pane
            $listPane.hide();
            $groupPane.addClass('full-screen');

        }else if(widgetTurtles == 0 && listTurtles != 0){

            // full screen for right pane
            $groupPane.hide();
            $listPane.addClass('full-screen');

        }else{
            // reset panes
            $listPane.show();
            $listPane.removeClass("full-screen");
            $groupPane.show();
            $groupPane.removeClass("full-screen");
        }
    }

    return {
        addTurtle : addTurtle,
        removeTurtle : removeTurtle
    }

}());

