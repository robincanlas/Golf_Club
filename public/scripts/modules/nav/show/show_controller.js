define([
	"app",
	"modules/nav/show/show_view"
], function(App, View){

	App.module("NavApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Controller = Marionette.Controller.extend({
			initialize: function(){
		
				this.layout = this.getLayout();
		
				App.navRegion.show(this.layout);

				this.listenTo(App, "nav:active:change", this.changeActive)
			},
		
			getLayout: function(){
				return new View.Layout();
			},

			changeActive: function(route){
				this.layout.$(".isActive").removeClass("isActive");
				this.layout.$(route).addClass("isActive");
			},
		
			
		});

	});

	return App.NavApp.Show;
});