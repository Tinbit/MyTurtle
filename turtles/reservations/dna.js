(function($) {

    /*
     * Collections are ordered sets of models. You can bind "change" events to
     * be notified when any model in the collection has been modified, listen
     * for "add" and "remove" events, fetch the collection from the server
     */
    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            _.bindAll(this, "configure");

            this.on("born", this.configure);
            this.on("reconfigure", this.configure);
        },
        configure : function(){


            this.trigger("render");
        }
    });

    var view = Backbone.View.extend({
        initialize : function(options) {

            // prevents loss of "this" inside methods
            _.bindAll(this, "render");

            // bind render to collection reset
            this.collection.on("reset", this.render);

            // pre-fetch template file and render when ready
            var self = this;
            if (this.template == null) {
                $.get("turtles/reservations/views/fullscreen.html", function(template) {
                    self.template = template;
                    self.render();
                });
            }

        },
        render : function() {

            // only render when template file is loaded
            if (this.template) {
                var data = {
                    now : {
                        "logo": "http://theadvancedapes.com/wp-content/uploads/2013/10/logo-google-astro-1.jpg",
                        "start": "13",
                        "end": "14",
                        "company": "Google",
                        "title": "Changing to kitkat",
                        "booker": "Larry Page",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris adipiscing ante nec varius lacinia. Mauris velit purus, commodo et malesuada sed, pellentesque non arcu. Nam id sollicitudin odio. Nullam feugiat elit eget rutrum aliquet. Sed venenatis gravida purus a tincidunt. Etiam semper erat ipsum, at pellentesque metus bibendum ut. Nullam porta faucibus pulvinar. Morbi non sagittis diam. Curabitur at arcu nec ante dignissim suscipit quis quis ipsum."
                    },
                    next: {
                        "logo": "http://theadvancedapes.com/wp-content/uploads/2013/10/logo-google-astro-1.jpg",
                        "start": "14",
                        "end": "15",
                        "company": "Google",
                        "title": "About that change to kitkat",
                        "booker": "Larry Page",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris adipiscing ante nec varius lacinia. Mauris velit purus, commodo et malesuada sed, pellentesque non arcu. Nam id sollicitudin odio. Nullam feugiat elit eget rutrum aliquet. Sed venenatis gravida purus a tincidunt. Etiam semper erat ipsum, at pellentesque metus bibendum ut. Nullam porta faucibus pulvinar. Morbi non sagittis diam. Curabitur at arcu nec ante dignissim suscipit quis quis ipsum."
                    }
                };

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));
            }

        }
    });

    // register turtle
    Turtles.register("reservations", {
        collection : collection,
        view : view
    });

})(jQuery);