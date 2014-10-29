define(["app"], function(App){

	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

		Entities.Reservation = Parse.Object.extend({
			className: 'User'
		});

		Entities.ReservationsCollection = Parse.Collection.extend({
			model: Entities.Reservation,
			check: function(options){
				console.log(options);
			},
		});
	
		var API = {
			
			checkUserName: function(options){
				var username = options.username;
				var password = options.password;

				var query = new Parse.Query(Entities.Reservation)
					.equalTo('username', username);
				var users = query.collection();
				var defer = $.Deferred();
				users.fetch({
					success: function(data){
						defer.resolve(data);
					}
				});

				return defer.promise();
			}

		};

		App.reqres.setHandler("username:entities", function(options){
			return API.checkUserName(options);
		});
	
	});

	return App.Entities;

});