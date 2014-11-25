Yumster.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
  	this.$rootEl = options.$rootEl;
  },
	
  routes: {
		"": "home"
		"search/*query": "search",
    "meals/:id": "mealShow"
  },
	
	home: function () {
    var view = new Yumster.Views.Home();
    this._swapView(view);
	},

  search: function (query) {
    // var board = Yumster.Collections.meals.getOrFetch(id);
    var view = new Yumster.Views.Search({
      // model: board
    });

    this._swapView(view);
  },
	
	mealShow: function (id) {
    var meal = Yumster.Collections.meals.getOrFetch(id);
    var view = new Yumster.Views.MealShow({
      model: meal
    });

    this._swapView(view);
	},

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
	
	
});
