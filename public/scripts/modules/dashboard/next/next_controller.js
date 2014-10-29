define([
	"app",
	"modules/dashboard/next/next_view",
	"entities/reservation"

], function(App, View){

	App.module("NextApp.Next", function(Next, App, Backbone, Marionette, $, _){

		Next.Controller = Marionette.Controller.extend({

			initialize: function(options){
				this.collection = options.collection;
				this.cloneCollection = _.clone(this.collection)

				this.model = options.model;
				this.dates = options.dates;

				this.nextReservation = this.collection.getNextReservation(this.getCurrentTime());
				
				this.layout = this.getLayoutView();
				options.region.show(this.layout);

				// this.listenTo(this.model, 'change', function(){
				// 	this.resetCollection();
				// });

				this.listenTo(this.layout, "save:next:reservation", this.saveReservation);
			},

			getLayoutView: function(){
				return new View.Layout({
					model: this.nextReservation,
					collection:this.collection
				});					
			},

			getCurrentTime: function(){
				var d = this.model.get('date'),
					time = ('0'+d.getHours()).slice(-2)+('0'+d.getMinutes()).slice(-2);

				return time;
			},

			saveReservation: function(iv){
				//this is where the save is placed
				iv.model.set({isBooked:true});
				var time = iv.model.get('time');

				this.model.get('date').setHours(time.slice(0, -2), time.slice(-2), 00);

				this.model.trigger('render:layout');
			},

			// resetCollection: function(){
			// 	var temp = [];

			// 	_.each(this.cloneCollection.models, function(model){
			// 		temp.push(model)
			// 	});
			// 	this.collection.reset(temp);
			// 	this.collection.trigger('collection:change')
			// 	this.model.trigger('render:layout');
			// }

		});
	
	});

	return App.NextApp.Next;
		
});
