window.Yumster = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		var $rootEL = $("#content");
		new Yumster.Routers.Router({ $rootEl: $rootEl });
		Backbone.history.start();
  }
};

$(document).ready(function(){
  Yumster.initialize();
});
