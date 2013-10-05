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
                var today = {};
                today.entries=getMenuToday(self.options.data);
                today.empty = today.entries.length == 0;
                today.today_title = self.options.data.today_title;
                var weekmenu = filterData(self.options.data);
                var data = {
                    today: today,
                    data : weekmenu
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

    function filterData(data){

        for( var i in data.categories){
            var cat = data.categories[i];

            var meals = [];
            for( var j in cat.meals){
                if(cat.meals[j] != null){
                    meals.push(cat.meals[j]);
                }
            }
            cat.meals = meals;
            data.categories[i] = cat;
        }

        return data;

    }

    function getMenuToday(data){
        var d = new Date();
        var dayIndex = d.getDay() - 1; // 1 for monday , ...
        // sunday is '0' in getDay(), we want it to be last in the array and monday first!
        if(dayIndex == -1){
            dayIndex = 6;
        }
        var menu_today = [];

        // checking if there are categories and that the index is smaller than 5
        if(data.categories && dayIndex < 7){


            for(var i in data.categories){
                var category = data.categories[i];

                if(category.meals[dayIndex]){

                    var entry = {};
                    entry.categoryName = category.name;
                    entry.price = category.price;

                    entry.mealName = category.meals[dayIndex].name;
                    entry.image = category.meals[dayIndex].image;
                    menu_today.push(entry);
                }

            }

        }

        return menu_today;
    }

})(jQuery);