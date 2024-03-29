define([
	"app",
	"text!modules/dashboard/show/templates/layout.html",
], function(App, LayoutTemplate){

	App.module("DashBoardApp.Show", function(Show, App, Backbone, Marionette, $, _){

		Show.Layout = Marionette.LayoutView.extend({
			className: 'row',
			template: LayoutTemplate,
			regions: {
				dayRegion: '#day-region',
				countRegion: '#reserve-count-region',
				nextRegion: '#reserve-next-region',
				scheduleRegion: '#small-schedule-region',
				calendarRegion: '#calendar-region'
			},
			onDomRefresh: function(){
				var pageHeight = $(document).height();
				$('.sidebar').css('height', pageHeight);
			}
		});

	});

	return App.DashBoardApp.Show;
});
