/*
 * FlatTurtle
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

(function($){

    var view = Backbone.View.extend({

        initialize : function() {
            var self = this;

            // prevents loss of "this" inside methods
            _.bindAll(this, "refresh");

            this.on("refresh", this.refresh);
            this.on("reconfigure", this.render);

            // render immediately
            this.render();
        },
        refresh : function() {
            // refresh iframe
            var iframe = this.$el.find('iframe')[0];
            iframe.src = iframe.src;
        },
        render : function() {
            var self = this;

            // set height and remove padding
            self.$el.height("100%");
            self.$el.addClass("nopadding");

            $.get("turtles/map/views/widget.html", function(template) {
                var data = {
                    alias : Interface.config.alias,
                    zoom: self.options.zoom,
                };

                // render html
                self.$el.empty();
                self.$el.html(Mustache.render(template, data));
            });
        }
    });

    // register turtle
    Turtles.register("map", {
        view : view
    });

})(jQuery);
