Yumster.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
  	this.$rootEl = options.$rootEl;
  },
	
  routes: {
		"": "home",
		"search/*query": "search",
    "meals/:id": "mealShow"
  },
	
	home: function () {
    var view = new Yumster.Views.Home();
    this._swapView(view);
	},

  search: function (query) {
		Yumster.Collections.meals.fetch({data: query});
		Yumster.current_query = query;
		// Backbone.history.navigate("search/query + new query params", { replace: true }); //can use to add diff query based on search page changes
    var view = new Yumster.Views.MealsSearch({
      collection: Yumster.Collections.meals
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
