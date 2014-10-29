define([
	'app',
	'text!modules/nav/show/templates/layout.html'
], function(App, LayoutTemplate){

	App.module('NavApp.Show', function(Show, App, Backbone, Marionette, $, _){
	
		Show.Layout = Marionette.LayoutView.extend({
			template: LayoutTemplate,
			tagName: 'nav',
			className: 'window-height',
		});

	});

	return App.NavApp.Show;
});