Yumster.Views.Home = Backbone.View.extend({

  template: JST['home/home'],
	
	// tagName: "form",
	
	initialize: function () {
	},
	
	events: {
		"click #button-search": "submitSearch",
		"click #button-header": "submitHeader"
	},
	
  render: function () {
    var content = this.template({
    	cuisines: Yumster.cuisines
    });
    this.$el.html(content);

		this.searchAuto = new google.maps.places.Autocomplete(this.$el.find("#location-search")[0], { types: ['geocode'] });
		this.headerAuto = new google.maps.places.Autocomplete($("#location-header")[0], { types: ['geocode'] });

		google.maps.event.addListener(this.searchAuto, "place_changed", this.autocompleteSearch.bind(this));
		google.maps.event.addListener(this.headerAuto, "place_changed", this.autocompleteHeader.bind(this));
				
    return this;
  },
	
	submitSearch: function (event) {
		event.preventDefault();
		var attrs = this.$el.find("form").serialize();
		Backbone.history.navigate("search/" + attrs, {trigger: true});
	},
	
	submitHeader: function (event) {
		event.preventDefault();
		var attrs = $("#location-header").serialize();
		Backbone.history.navigate("search/" + attrs, {trigger: true});
	},
	
	autocompleteSearch: function () {
		var loc = this.searchAuto.getPlace();
		this.$el.find("#location-search").attr("value", loc);
	},
	
	autocompleteHeader: function () {
		var loc = this.headerAuto.getPlace();
		this.$el.find("#location-header").attr("value", loc);
	}

});