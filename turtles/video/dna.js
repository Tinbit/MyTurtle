(function($){
    
    var view = Backbone.View.extend({

	initialize : function() {
            var self = this; 
	    $.get('turtles/video/views/widget.html', function(template) {
		var data = {
		    location : self.options.location
		};		
		// set window height to load
		self.$el.height('100%');
		// render html
		self.$el.html(Mustache.render(template, data));
		// change turtle padding
		self.$el.addClass('nopadding');
                self.render();
	    });
	},
	render : function(){
            //make a difference between the Qt Browser used by FlatTurtle customers and normal browser users
            if(typeof application === 'undefined'){
                //for normal browsers, let's use HTML5
                $("#videocanvas").html("<video src='http://localhost/glaverbel.mp4' autoplay=autoplay width=100% height=100%></video>");
            }else{
                //application exists, which means we are on a FlatTurtle device. In order to save bandwidth, we will automatically download the video file onto a device an play it using the hardware accelerated phonon qt plugin
                $("#videocanvas").html("<object></object>");//todo
            }
	}
    });
    
    // register turtle
    Turtles.register("video", {
	view : view
    });
    
})(jQuery);

