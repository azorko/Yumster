Yumster.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
  	this.$rootEl = options.$rootEl;
		$('#button-header').on('click', function (event) {
			event.preventDefault();
			var attrs = $("#search-wrapper").serialize();
			Backbone.history.navigate("#/search/" + attrs, { trigger: true });
		});
    
		$('#guest-login').on('click', function (event) {
			event.preventDefault();
			$("#guest-email").attr("value", "guest@yumster.com");
			$("#guest-pass").attr("value", "secret");
		});
		
		this.headerAuto = new google.maps.places.Autocomplete($("#location-header")[0], { types: ['geocode'] });
		google.maps.event.addListener(this.headerAuto, "place_changed", this.autocompleteHeader.bind(this));
    
  },
	
  routes: {
		"": "home",
		"search/*query": "search",
    "meals/:id": "mealShow",
		"guest-meals": "guestMealsIndex"
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
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  },
	
	autocompleteHeader: function () {
		var loc = this.headerAuto.getPlace();
		var geoLoc = this.headerAuto.getPlace().geometry.location;
		$("#location-header").attr("value", loc);
		$("#header-lat").attr("value", geoLoc.k);
		$("#header-lng").attr("value", geoLoc.B);
	}
	
});

Yumster.cuisines = ["Asian", "Western", "Middle Eastern", "Latin American"];
