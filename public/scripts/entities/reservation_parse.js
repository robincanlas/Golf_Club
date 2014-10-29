define(['app'], function(App){

	App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){

		var Reservation = Parse.Object.extend({
			className: 'Reservation',
			initialize: function(options){
				// var courseId = options.courseId || {};

				this.on('add', _.bind(function(model){
					// console.log(model);
				}, this));
			
			},
		});

		var ReservationsCollection = Parse.Collection.extend({
			initialize: function(options){
				// var courseId = options.courseId || {};

				this.on('add', _.bind(function(model){
					this.checkReservation(model);
				}, this));
			
			},
			model: Reservation,
			checkReservation: function(model){
				// var that = this;
				// // check if model for a time has a reservation
				// // var re = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
				// // var todaysDate = new Date(d.getTime());
				var d = new Date();				
				var dateTomorrow = new Date(d.getTime() + 24 * 60 * 60 * 1000);
				var dateYesterDay = new Date(d - 1000 * 60 * 60 * 24);
				
				// TODO: query data according to course id 
				// and date selected in the calendar
				var dateNow = new Date().getDate();				
				var query = new Parse.Query(Reservation)
					.include('courseId')
					.equalTo('courseId', {'__type':'Pointer','className':'Course','objectId':model.get('courseId')})
					.greaterThan('time', dateYesterDay)
					.lessThan('time', dateTomorrow)
					.find(function(data){
						for(var i = 0; i < data.length; ++i){							
							if (+model.get('time') === +data[i].get('time')) {
								model.set({'isReserved': true, 'isPaid': data[i].get('isPaid'), 'objectId': data[i].id});
							}
						}
					});

			}
		});
	
		var API = {

			getReservationsParse: function(){
				// var query = new Parse.Query(Reservation)
				// 	.include('courseId');
				// var reservations = query.collection();
				// var defer = $.Deferred();
				// reservations.fetch({
				// 	success: function(data){
				// 		defer.resolve(data);
				// 	}
				// });

				// return defer.promise();
			},

			// TODO change date according to selected date on calendar
			// TODO check reservation in Parse before returning the collection
			getFullReservationsParse: function(options){
				var reservationsCollection = new ReservationsCollection();

				// set the time for the schedule today hh/mm/ss/ms
				var startDate = new Date();				
				startDate.setHours(05, 45, 0, 0);
				var endDate = new Date();
				endDate.setHours(14, 0, 0, 0);
				var timeOfCourse = [];
										
			  	while(startDate < endDate){
					timeOfCourse.push({time:startDate, courseId: options.courseId});         

					var newDate = startDate.setMinutes( startDate.getMinutes() + 15 )
					startDate = new Date(newDate);
			    }

			    var temp = [];
				var d = new Date();				
				var dateTomorrow = new Date(d.getTime() + 24 * 60 * 60 * 1000);
				var dateYesterDay = new Date(d - 1000 * 60 * 60 * 24);
				
				// TODO: query data according to course id 
				// and date selected in the calendar
				// var dateNow = new Date().getDate();				
				// var query = new Parse.Query(Reservation)
				// 	.include('courseId')
				// 	.equalTo('courseId', {'__type':'Pointer','className':'Course','objectId':options.courseId})
				// 	.greaterThan('time', dateYesterDay)
				// 	.lessThan('time', dateTomorrow)
				// 	.find(function(data){
				// 		for(var i = 0; i < data.length; ++i){							
				// 			temp.push(+data[i].get('time'));
				// 			// if (+model.get('time') === +data[i].get('time')) {
				// 			// 	model.set({'isPaid': data[i].get('isPaid'), 'objectId': data[i].id});
				// 			// }
				// 		}
				// 		reservationsCollection.map(function(model, i){
				// 			var x = _.intersection(temp, [+model.get('time')]);
				// 			if(+x === +model.get('time')){
				// 				model.set('isReserved', true);
				// 			}							
				// 		});

				// 	});

				reservationsCollection.add(timeOfCourse);

				return reservationsCollection;
			},

			getEmptyReservationParse: function(){
				var emptyReservation = new Reservation();
				return emptyReservation;
			},

			test: function(options){
				return options;
			},

		};
	
		App.reqres.setHandler('reservations:entity', function(){
		});

		App.reqres.setHandler('reservations:entities:full', function(options){
			return API.getFullReservationsParse(options);		
		});			

		App.reqres.setHandler('reservations:entity:empty', function(options){
			return API.getEmptyReservationParse(options);		
		});			

		App.reqres.setHandler('reservation:entities', function(options){
			return API.getReservationsParse(options);
		});
	
	});

	return App.Entities;

});
