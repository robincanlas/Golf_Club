define([
	"app",
	"modules/dashboard/count/count_view",
], function(App, View){

		App.module("CountApp.Count", function(Count, App, Backbone, Marionette, $, _){
	
			Count.Controller = Marionette.Controller.extend({
	
				initialize: function(options){
					this.collection = options.collection;
					this.layout = this.getLayoutView();
					options.region.show(this.layout);

				},

				getLayoutView: function(){
					return new View.Layout({collection:this.collection});					
				},

			});
		
		});
	
		return App.CountApp.Count;
		
});
