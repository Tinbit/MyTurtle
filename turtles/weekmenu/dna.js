/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @author: Michiel Vancoillie (michiel@irail.be)
 * @license: AGPLv3
 */

 (function($){

    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            _.bindAll(this, "configure");

            this.on("born", this.configure);
            this.on("reconfigure", this.configure);
        },
        configure : function(){
            if(!this.options.data)
                return false;

            this.options.data = JSON.parse(this.options.data);
            this.trigger("render");
        }
    });

    var view = Backbone.View.extend({

        initialize : function() {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "render");

            // bind render to collection reset
            this.collection.on("render", this.render);
        },
        render : function() {
            var self = this;

            $.get("turtles/weekmenu/views/widget.html", function(template) {
                var data = {

                    data : self.options.data
                };

                // render html
                self.$el.empty();
                self.$el.html(Mustache.render(template, data));
            });
        }
    });

    // register turtle
    Turtles.register("weekmenu", {
        collection : collection,
        view : view
    });

})(jQuery);