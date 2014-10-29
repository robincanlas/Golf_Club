define([
	'app',	
], function(App){

		App.module('ScheduleApp', function(ScheduleApp, App, Backbone, Marionette, $, _){

		ScheduleApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'schedule/:uri': 'list'
			}
		});
		
		var API = {
			list: function(uri, options){

				var controllerOptions = options || {};
				controllerOptions.id = this.getIdFromUri(uri);
				controllerOptions.uri = uri;

				require(['modules/schedule/list/list_controller'], function(){
					new ScheduleApp.List.Controller(controllerOptions);
				});

				App.trigger('nav:active:change', '#schedule');
			},

			show: function(options){
				require(['modules/schedule/show/show_controller'], function(){
					new ScheduleApp.Show.Controller(options);
				});
			},

			getIdFromUri: function(uri){
				return _.last(uri.split('-'));
			},
		};

		App.vent.on('itemview:show:dialog', function(options){
			API.show(options);		
		});

		App.vent.on('show:schedule:page', function(options){
			var username = options.get('username'),
				id = options.id;
			var uri = username + '-' + id;	
			Backbone.history.navigate('schedule/'+uri);
			API.list(uri, {model: options})
		});

		App.addInitializer(function(){
			new ScheduleApp.Router({
				controller: API
			});
		});

	});

	return App.Schedule;
});
