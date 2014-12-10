Yumster.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
		Yumster.current_filters = {};
		Yumster.mapView = new Yumster.Views.Map({
		  collection: Yumster.Collections.meals
		});
		
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
		
		$('.menu-click').on('click', function (event) {
			event.preventDefault();
			var query = $(event.currentTarget).data("query");
			var userId = $(event.currentTarget).data("user-id");
			Backbone.history.navigate("#/users/" + userId + "/" + query, { trigger: true });
		});
		
		this.headerAuto = new google.maps.places.Autocomplete($("#location-header")[0], { types: ['geocode'] });
		google.maps.event.addListener(this.headerAuto, "place_changed", this.autocompleteHeader.bind(this));
    
  },
	
  routes: {
		"": "home",
		"users/:id/:query": "userShow", //could make it optional /(:query)
		"search/*query": "search",
    "meals/:id": "mealShow"
  },
	
	home: function () {
		var meals = new Yumster.Collections.Meals();
		var len = 15;
		var prevChoices = [];
		var randNum
		for (var i = 0; i < 3; i++) {
			do {
			randNum = Math.floor(Math.random() * len) + 1;
		  } while (prevChoices.indexOf(randNum) !== -1);
			prevChoices.push(randNum);
			meals.add(Yumster.Collections.meals.getOrFetch(randNum) );
		}
    var view = new Yumster.Views.Home({
    	collection: meals
    });
    this._swapView(view);
	},

  search: function (query) {
		console.log('search');
		Yumster.mapView.removeMarkers();
		
		Yumster.current_filters = this.parseQuery(query);
		Yumster.mapView.changeCenter();
		
    var view = new Yumster.Views.MealsSearch({
      collection: Yumster.Collections.meals
    });
		
		Yumster.Collections.meals.fetch({
			data: { filters: Yumster.current_filters, page: 1 },
			success: function (collection) {
				// Yumster.mapView.addMarkers();
			}
		});

    this._swapView(view);
  },
	
	mealShow: function (id, query) {
    var meal = Yumster.Collections.meals.getOrFetch(id);
    var view = new Yumster.Views.MealShow({
      model: meal
    });

    this._swapView(view);
	},
	
	userShow: function (id, query) {
    var user = Yumster.Collections.users.getOrFetch(id);
    var view = new Yumster.Views.UserShow({
      model: user,
			query: query
    });

    this._swapView(view);
	},

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
		view.afterRender && view.afterRender();
  },
	
	autocompleteHeader: function () {
		var loc = this.headerAuto.getPlace();
		var geoLoc = this.headerAuto.getPlace().geometry.location;
		$("#location-header").attr("value", loc);
		$("#header-lat").attr("value", geoLoc.k);
		$("#header-lng").attr("value", geoLoc.B);
	},
	
	parseQuery: function (query) {
		var filters = {};
		query = query.split("&");
		for(var i = 0; i < query.length; i++) {
			query[i] = query[i].split("=");
			filters[query[i][0]] = query[i][1];
			filters[query[i][0]] = filters[query[i][0]].replace(/\+/g, " ");
		}
		return filters;
	},
	
});

Yumster.cuisines = ["Asian", "Latin American", "Middle Eastern", "Western"];
