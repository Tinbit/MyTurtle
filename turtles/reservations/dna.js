(function($) {

    // temp until companies and logos are linked
    var companies = {
        "CBRE" : "https://img.flatturtle.com/reservation/cbre.png",
        "Statoil" : "https://img.flatturtle.com/reservation/statoil.png"
    };

    /*
     * Collections are ordered sets of models. You can bind "change" events to
     * be notified when any model in the collection has been modified, listen
     * for "add" and "remove" events, fetch the collection from the server
     */
    var collection = Backbone.Collection.extend({
        initialize : function(models, options) {
            _.bindAll(this, "configure", "url", "parse", "refresh");

            this.bind("born", this.fetch);
            this.on("born", this.configure);
            this.on("reconfigure", this.configure);

            var self = this;

            setTimeout(function(){
                setInterval(self.refresh, 10000);
            },  Math.round(Math.random()*5000));
        },
        configure : function(){

            //this.trigger("render");
        },
        url: function(){
            var url = this.options.url;

            return url + "/reservations";
        },
        parse: function(json){
            if(json.length > 0){
                var date_now = new Date();
                var futureReservations = [];

                for(var i in json){
                    var reservation = json[i];
                    var from = utcDate(new Date(reservation.to));
                    if(from > date_now){
                        futureReservations.push(reservation);
                    }
                }

                // sort the reservations on time
                futureReservations.sort(function(a,b){
                    a_date = new Date(a.from);
                    b_date = new Date(b.from);
                    if (a_date < b_date) return -1;
                    if (a_date > b_date) return 1;

                    // this should never happen!
                    return 0;
                });

                var now = null;
                var next = null;
                if(futureReservations.length> 0){
                    now = futureReservations[0];
                    // checks can be removed after companies are set in the api
                    if(now.customer && now.customer.company && now.customer.company in companies){
                        now.logo = companies[now.customer.company];
                    }

                    now.from = utcDate(new Date(now.from));
                    now.from_string = now.from.format("{H}:{M}");
                    now.to = utcDate(new Date(now.to));
                    now.to_string = now.to.format("{H}:{M}");
                    now.booker = now.announce.join(", ");
                    if(futureReservations.length > 1){
                        next = futureReservations[1];

                        // checks can be removed after companies are set in the api
                        if(next.customer && next.customer.company && next.customer.company in companies){
                            next.logo = companies[next.customer.company];
                        }
                        next.from = utcDate(new Date(next.from));
                        next.from_string = next.from.format("{H}:{M}");
                        next.to = utcDate(new Date(next.to));
                        next.to_string = next.to.format("{H}:{M}");
                        next.booker = next.announce.join(", ");
                    }


                }
                this.options.now = now;
                this.options.next = next;
            }
            this.trigger('render');
        },
        refresh: function(){
            var self = this;
            self.fetch();
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
                var now = this.options.now;
                var next = this.options.next;

                var data = {
                    now : now,
                    next : next
                };

                // add html to container
                this.$el.empty();
                this.$el.html(Mustache.render(this.template, data));

                if(now){
                    // progress
                    progressBar(this.$el, now.from, now.to);
                }
            }

        }
    });

    // animate the progressbar on the current meeting
    function progressBar($el, min_date, max_date){
        var currentDate = new Date();

        //don't start if current is smaller than min_date
        if(currentDate < min_date){
            //todo set timeout to start it when it has to (or just refresh)
            return;
        }

        var current_pct = (currentDate - min_date) / (max_date - min_date);
        var time_to_go =  max_date - currentDate;

        //only update every 5 seconds
        jQuery.fx.interval = 5000;

        $el.find(".progress").stop().width(current_pct*100+"%");
        $el.find(".progress").animate({width:"100%"}, parseInt(time_to_go), "linear", function() {

        })
    }

    function utcDate(date){
        return new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
    }

    // register turtle
    Turtles.register("reservations", {
        collection : collection,
        view : view
    });

})(jQuery);