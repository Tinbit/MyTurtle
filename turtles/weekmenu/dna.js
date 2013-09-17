/*
 * FlatTurtle
 * @author: Nik Torfs (nik@flatturtle.com)
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
                    today: getMenuToday(self.options.data),
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

    function getMenuToday(data){
        var d = new Date();
        var dayIndex = d.getDay() - 1; // 1 for monday , ...
        var menu_today = [];

        // checking if there are categories and that the index is smaller than 5
        if(data.categories && dayIndex < 5){

            for(var i in data.categories){
                var category = data.categories[i];
                var entry = {};
                entry.categoryName = category.name;
                entry.price = category.price;
                entry.mealName = category.meals[dayIndex].name;
                entry.image = category.meals[dayIndex].image;

                menu_today.push(entry);
            }

        }
        return menu_today;
    }

})(jQuery);