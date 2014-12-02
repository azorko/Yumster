Yumster.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
  	this.$rootEl = options.$rootEl;
  },
	
  routes: {
		"": "home",
		"search/*query": "search",
    "meals/:id": "mealShow",
		"guest_meals": "guestMealsIndex"
  },
	
	home: function () {
    var view = new Yumster.Views.Home();
    this._swapView(view);
	},

  search: function (query) {
		Yumster.Collections.meals.fetch({data: query});
		Yumster.current_query = query;
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
	
	guestMealsIndex: function () {
		debugger
	},

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
		// $('#button-header').off("click"); //is this removing the search bar listener?
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
	
	
});

Yumster.cuisines = ["Asian", "Western", "Middle Eastern", "Latin American"];
