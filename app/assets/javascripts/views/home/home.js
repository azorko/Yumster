Yumster.Views.Home = Backbone.View.extend({

  template: JST['home/home'],
	
	tagName: "form",
	
	initialize: function () {
	},
	
	events: {
		"click button": "submit"
	},
	
  render: function () {
    var content = this.template();
    this.$el.html(content);
		this._autocomplete = new google.maps.places.Autocomplete(this.$el.find("#location")[0], { types: ['geocode'] });

		google.maps.event.addListener(this._autocomplete, "place_changed", this.autocomplete.bind(this));
				
    return this;
  },
	
	submit: function (event) {
		event.preventDefault();
		var attrs = this.$el.serialize();
		Backbone.history.navigate("search/" + attrs, {trigger: true});
	},
	
	autocomplete: function () {
		var loc = this._autocomplete.getPlace();
		this.$el.find("#location").attr("value", loc);
	}

});