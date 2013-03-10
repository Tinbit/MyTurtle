(function($) {

    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "refresh", "configure");

            // bind events
            this.on("born", this.configure);
            this.on("born", this.refresh);
            this.on("refresh", this.refresh);
            this.on("reconfigure", this.configure);

            // default error value
            options.error = false;

            // automatic collection refresh each minute, this will
            // trigger the reset event
            refreshInterval = window.setInterval(this.refresh, 60000);
        },
        configure : function() {
            // Walking time
            var hours = Math.floor(this.options.time_walk/60);
            var minutes = Math.floor(this.options.time_walk%60);
            if(hours == 0 && minutes == 0){
                this.options.time_walk = "< 1 min";
            }else if(this.options.time_walk < 0){
                this.options.time_walk = false;
            }else{
                if(hours< 10) hours = '0' + hours;
                if(minutes< 10) minutes = '0' + minutes;
                this.options.time_walk = hours + ':' + minutes;
            }

            // don't fetch if there is no location
            if (this.options.location == null || !this.options.location)
                return;
        },
        refresh : function() {
            // don't fetch if there is no location
            if (this.options.location == null || !this.options.location)
                return;

            var self = this;
            self.fetch({
                error : function() {
                    // will allow the view to detect errors
                    self.options.error = true;

                    // if there are no previous items to show, display error message
                    if(self.length == 0)
                        self.trigger("reset");
                }
            });
        },
        url : function() {
            var latitude = this.options.location.split(',')[0];
            var longitude = this.options.location.split(',')[1];

            return "http://data.irail.be/Bikes/Villo.json?lat=" + encodeURIComponent(latitude) + "&long=" + encodeURIComponent(longitude) + "&offset=0&rowcount=1";
        },
        parse : function(json) {
            var villo = json.Villo;

            for(var i in villo) {
                villo[i].distance = Math.round(parseInt(villo[i].distance)/10)*10;

                var name = jQuery.trim(villo[i].name);
                name = name.match(/^[0-9]+\s*-\s*(.*?)(?:[\/|:](.*))?$/)[1];
                villo[i].name = name.capitalize();
            }

            return villo;
        }
    });

    var view = Backbone.View.extend({
        initialize : function() {
            // prevents loss of 'this' inside methods
            _.bindAll(this, "render");

            // bind render to collection reset
            this.collection.on("reset", this.render);

            // pre-fetch template file and render when ready
            var self = this;
            if (this.template == null) {
                $.get("turtles/villo/views/list.html", function(template) {
                    self.template = template;
                    self.render();
                });
            }
        },
        render : function() {
            // only render when template file is loaded
            if (this.template && this.collection.length) {

                var data = this.collection.toJSON()[0];
                data.freespots += data.freebikes;
                data.time_walk = this.options.time_walk;
                data.error = this.options.error; // have there been any errors?

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));
            }
        }
    });

    // register turtle
    Turtles.register("villo", {
        collection : collection,
        view : view
    });

})(jQuery);