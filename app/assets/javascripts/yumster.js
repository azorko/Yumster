window.Yumster = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		var $rootEl = $("#content");
		new Yumster.Routers.Router({ $rootEl: $rootEl });
		Backbone.history.start();
  }
};
