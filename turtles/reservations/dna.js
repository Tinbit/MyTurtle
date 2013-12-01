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
        },
        url: function(){
            var url = this.options.url;
            url = url.replace(/\//gi, '+');

            //return "https://data.flatturtle.com/2/Calendar/ICal/" + url + ".json";
        },
        parse: function(json){
            var now = json.now;
            var next = json.next;

            now.start = new Date(now.start * 1000);
            now.end = new Date(now.end * 1000);

            next.start = new Date(next.start * 1000);
            next.end = new Date(next.end * 1000);
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
                var date1 = new Date();
                date1.setHours(18);
                date1.setMinutes(0);
                var date2 = new Date();
                date2.setHours(19);
                date2.setMinutes(00);
                var date3 = new Date();
                date3.setHours(20);
                date3.setMinutes(0);

                var descr = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris adipiscing ante nec varius lacinia. Mauris velit purus, commodo et malesuada sed, pellentesque non arcu. Nam id sollicitudin odio. Nullam feugiat elit eget rutrum aliquet. Sed venenatis gravida purus a tincidunt. Etiam semper erat ipsum, at pellentesque metus bibendum ut. Nullam porta faucibus pulvinar. Morbi non sagittis diam. Curabitur at arcu nec ante dignissim suscipit quis quis ipsum.";
                var data = {
                    now : {
                        "logo": "http://theadvancedapes.com/wp-content/uploads/2013/10/logo-google-astro-1.jpg",
                        "start": date1.format("{H}:{M}"),
                        "end": date2.format("{H}:{M}"),
                        "company": "Google",
                        "title": "Changing to kitkat",
                        "booker": "Larry Page",
                        "description": descr.substr(0, 140) + "..."
                    },
                    next: {
                        "logo": "http://theadvancedapes.com/wp-content/uploads/2013/10/logo-google-astro-1.jpg",
                        "start": date2.format("{H}:{M}"),
                        "end": date3.format("{H}:{M}"),
                        "company": "Google",
                        "title": "About that change to kitkat",
                        "booker": "Larry Page",
                        "description": descr.substr(0, 140) + "..."
                    }
                };

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));

                // progress
                progressBar(this.$el, date1, date2);
            }

        }
    });

    // animate the progressbar on the current meeting
    function progressBar($el, min_date, max_date){
        var currentDate = new Date();

        //don't start if current is smaller than min_date
        if(currentDate < min_date){
            return;
        }

        var current_pct = (currentDate - min_date) / (max_date - min_date);
        var time_to_go =  max_date - currentDate;

        //only update every 5 seconds
        jQuery.fx.interval = 5000;

        $el.find(".progress").stop().width(current_pct*100+"%");
        $el.find(".progress").animate({width:"100%"}, parseInt(time_to_go), "linear", function() {

            // request next meeting
        })
    }

    // register turtle
    Turtles.register("reservations", {
        collection : collection,
        view : view
    });

})(jQuery);