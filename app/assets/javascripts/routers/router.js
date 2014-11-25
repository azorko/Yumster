Yumster.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
  	this.$rootEl = options.$rootEl;
  },
	
  routes: {
		"search/:query": "search",
    "meals/:id": "mealShow"
  },

  search: function (query) {
    // var board = Yumster.Collections.meals.getOrFetch(id);

    var view = new Yumster.Views.MealShow({
      // model: board
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
	
	
});
