Yumster.Views.Home = Backbone.View.extend({

  template: JST['home/home'],
	
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
	},
	
	events: {
		"click #button-search": "submitSearch",
		"click .meal-info": "show",
	},
	
  render: function () {
    var content = this.template({
    	cuisines: Yumster.cuisines,
			meals: this.collection
    });
    this.$el.html(content);

		this.searchAuto = new google.maps.places.Autocomplete(this.$el.find("#location-search")[0], { types: ['geocode'] });
		google.maps.event.addListener(this.searchAuto, "place_changed", this.autocompleteSearch.bind(this));
				
    return this;
  },
	
	submitSearch: function (event) {
		event.preventDefault();
		var attrs = this.$el.find("form").serialize();
		Backbone.history.navigate("search/" + attrs, {trigger: true});
	},
	
	autocompleteSearch: function () {
		var loc = this.searchAuto.getPlace();
		var geoLoc = this.searchAuto.getPlace().geometry.location;
		this.$el.find("#lat-search").attr("value", geoLoc.k);
		this.$el.find("#lng-search").attr("value", geoLoc.B);
		this.$el.find("#location-search").attr("value", loc);
	},
	
	show: function (event) {
		var id = $(event.currentTarget).data("id");
		Backbone.history.navigate("meals/" + id, {trigger: true});
	},

});