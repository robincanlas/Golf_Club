define([
	"app",
	"modules/dashboard/schedule/schedule_view",
	"entities/reservation"
], function(App, View){

		App.module("ScheduleApp.Schedule", function(Schedule, App, Backbone, Marionette, $, _){
	
			Schedule.Controller = Marionette.Controller.extend({
	
				initialize: function(options){
					this.optionCollection = options.collection;

					var d = new Date();
					var time = ('0'+d.getHours()).slice(-2)+('0'+d.getMinutes()).slice(-2);
					
					var filteredCollection = _.first(options.collection.getReservationsByTime(time), 10);

					this.collection = App.request("reservation:entities:recreate", {data:filteredCollection});

					this.collectionFilter()
					this.layout = this.getLayoutView();
					// this.listenTo(this.optionCollection, 'collection:change', function(){
					// 	this.test();
					// });
					options.region.show(this.layout);
					this.listenTo(this.layout, 'childview:reserve:schedule', this.reserveSchedule)
				},

				getLayoutView: function(){
					return new View.Reservations({collection: this.collection});					
				},

				collectionFilter: function(){
					var collection = this.collection.scheduleFilter();
					this.collection.reset(collection);
				},

				// test: function(){
				// 	var time = '0600'
				// 		filteredCollection = _.first(this.optionCollection.getReservationsByTime(time), 10);
				// 	this.test = App.request("reservation:entities:recreate", {data:filteredCollection});
				// 	console.log(this.test);
				// 	// this.collection = this.test;
				// }

			});
		
		});
	
		return App.ScheduleApp.Schedule;
});
