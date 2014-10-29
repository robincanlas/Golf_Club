define(['app'], function(App){

	App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){

		Entities.Reservation = Backbone.Model.extend({
		});

		Entities.ReservationsCollection = Backbone.Collection.extend({
			model: Entities.Reservation,
			comparator: "time",

			parse: function(response){
				return response.results;
			},

			// Filters reservations for isBooked: true and returns count
			countReservations: function(){

				var matches = this.filter(function(model){
					return model.get("isBooked") === true;
				});
				return matches.length;
			},
			

			scheduleFilter: function(){

				var matches = this.filter(function(model){
					return model.get("isBooked") === false;
				});

				return this.reset(matches);
			},

			// Subtracts the size of how many booked reservations from the total amount of reservations
			countAvailableReservations: function(){
				return this.length - this.countReservations();
			},

			getNextReservation: function(time){
				return this.find(function(reservation){
					return reservation.get("time") > time && reservation.get("isBooked") === false;
				});
			},
			
			getReservationsByTime: function(time){
				return this.filter(function(reservation){
					return reservation.get("time") > time;
				});
			}

		});
	
		var API = {
	
			getEmptyReservations: function(){
				var emptyReservations = new Entities.ReservationsCollection([]);	

				var newReservations = [
					{isBooked: true, time: "06:00", guestCount: "2", fullName: "Peter Parker" },			
					{isBooked: true, time: "08:00", guestCount: "1", fullName: "Bruce Banner"},
					{isBooked: true, time: "10:00", guestCount: "3", fullName: "Tony Stark"}					
				];
				emptyReservations.add(newReservations, {merge: true});
				
					var startDate = new Date("May 5, 2014 06:00");
					var endDate = new Date("May 5, 2014 14:00");

					do {
						var nowHours = startDate.getHours() < 10 ? ( "0" + startDate.getHours() ) : startDate.getHours();
						var nowMinutes = startDate.getMinutes() < 10 ? ( "0" + startDate.getMinutes() ) : startDate.getMinutes();
							
							if (emptyReservations.findWhere( {time: nowHours+":"+nowMinutes} ) ){
								
							}else{
								now = nowHours+":"+nowMinutes;
								emptyReservations.push({time:now});
							}

						startDate.setMinutes( startDate.getMinutes() + 15 );
					} while ( startDate.getTime() <= endDate.getTime() )			

					emptyReservations.sort();

					return emptyReservations;
					
			},

			getReservations: function(options){
				var now = options.date || new Date(),
					tmw = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

				var openTime	= "0600",
					closeTime	= "1400";
				var reservations = new Entities.ReservationsCollection();

				// reservations.fetch();

				var times = [];
				var time = new Date(2014,5,6,6);
				do {

					var reservationTime = ('0'+time.getHours()).slice(-2)+('0'+time.getMinutes()).slice(-2);

					if ( !reservations.findWhere({time:reservationTime}) ) {
					    times.push({
					        time: reservationTime,
					    });						
					}

				    time.setMinutes(time.getMinutes()+15);

				} while ( reservationTime < closeTime );

				reservations.add(times);

				return reservations;
			},

			recreateReservations: function(options){
				var reservations = new Entities.ReservationsCollection(options.data)

				return reservations;
			},

		};
	
		App.reqres.setHandler('reservations:entity', function(){
		});			

		App.reqres.setHandler('reservation:entities', function(options){
			return API.getReservations(options);
		});

		App.reqres.setHandler('reservation:entities:recreate', function(options){
			return API.recreateReservations(options);
		});
	
	});

	return App.Entities;

});
