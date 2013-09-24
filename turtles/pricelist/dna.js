/*
 * FlatTurtle
 * @author: Nik Torfs (nik@flatturtle.com)
 * @license: AGPLv3
 */

(function($) {

    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            _.bindAll(this, "configure");

            this.on("born", this.configure);
            this.on("reconfigure", this.configure);
            this.on("refresh", this.configure)

        },
        configure : function() {

            /*
             * Set the url property (or function) on a collection to reference
             * its location on the server. This url is used by the fetch method.
             */

            // no data var found in options
            if(!this.options.data){
                return false;
            }

            this.options.data = JSON.parse(this.options.data);
            this.trigger("render");
        }
    });

    /*
     * Backbone views can be used with any JavaScript templating library. The
     * general idea is to organize your interface into logical views, backed by
     * models, each of which can be updated independently when the model
     * changes, without having to redraw the page. Instead of digging into a
     * JSON object, looking up an element in the DOM, and updating the HTML by
     * hand, you can bind your view's render function to the model's "change"
     * event � and now everywhere that model data is displayed in the UI, it is
     * always immediately up to date.
     */
    var view = Backbone.View.extend({
        initialize : function(options) {

            _.bindAll(this, "render");

            this.collection.on("render", this.render);

        },
        render : function() {

            /*
             * Render your view from the model data and update this.el with the
             * new generate HTML. You can access your whole collection in JSON
             * format through this.collection.toJSON().
             */
            var self = this;

            $.get("turtles/pricelist/views/widget.html", function(template) {
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
    Turtles.register("pricelist", {
        collection : collection,
        view : view
    });

})(jQuery);