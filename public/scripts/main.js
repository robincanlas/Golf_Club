require.config({
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		backbone: '../bower_components/backbone/backbone',
		marionette: '../bower_components/marionette/lib/backbone.marionette',
		jquery: '../bower_components/jquery/dist/jquery',
		underscore: '../bower_components/lodash/dist/lodash',
		expanding: 'libs/expanding',
		text: '../bower_components/text/text',
		'owl.carousel': 'libs/owl.carousel',
		'moment': '../bower_components/moment/moment',
		pusher: '//js.pusher.com/2.2/pusher.min',
        filepicker: "//api.filepicker.io/v1/filepicker",
        md5: '../bower_components/js-md5/js/md5',

	},
	shim: {
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		},
		expanding: ['jquery'],
		'owl.carousel': ['jquery'],
		pusher: {
			exports: 'Pusher'
		},
	}
});

require(['app'], function(App){
	App.start();
});