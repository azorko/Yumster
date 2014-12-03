Yumster.Views.SearchContent = Backbone.CompositeView.extend({
	
	template: JST['meals/search_content'],
	
	initialize: function () {
    this.listenTo(this.collection, "sync", this.render);		
	},
	
	events: {
		"click button": "submit",
		"slide .slider": "updateSlider",
		"slidestop .slider": "updatePrice",
		"click .meal-info": "show",
		"change input": "filterChange",
		"change select": "filterChange",
		"click .remove-filter": "removeFilter",
		"mouseenter .meal-info": "blueMarker",
		"mouseleave .meal-info": "redMarker"
	},
	
  render: function () {
    var content = this.template({
    	meals: this.collection,
			filters: Yumster.current_filters,
			cuisines: Yumster.cuisines
    });
    this.$el.html(content);
		this.renderSlider();
		
    return this;
  },
	
	renderSlider: function () {
		var min = Yumster.current_filters["min_price"] || "0";
		var max = Yumster.current_filters["max_price"] || 250;
		this.$el.find(".slider").slider({
			min: 0,
			max: 250,
			range: true,
			values: [Number(min), max]
		 });
 		this.$el.find("#min-price").text("$" + min);
 		this.$el.find("#max-price").text("$" + max);
	},
	
	updateSlider: function (event) {
		var minValue = $(event.currentTarget).slider( "values", 0 );
		this.$el.find("#min-price").text("$" + minValue);
		var maxValue = $(event.currentTarget).slider( "values", 1 );
		this.$el.find("#max-price").text("$" + maxValue);
		Yumster.current_filters["min_price"] = minValue;
		Yumster.current_filters["max_price"] = maxValue;
	},
	
	updatePrice: function (event) {
		this.updateSlider(event);
		this.collection.fetch({data: Yumster.current_filters});
	},
	
	show: function (event) {
		var id = $(event.currentTarget).data("id");
		Backbone.history.navigate("meals/" + id, {trigger: true});
	},
	
	filterChange: function (event) {
		var $filterEl = $(event.currentTarget);
		Yumster.current_filters[$filterEl.attr("name")] = $filterEl.val();
		this.collection.fetch({data: Yumster.current_filters});
	},
	
	removeFilter: function (event) {
		var filterId = $(event.currentTarget).data("filter");
		var $filterEl = this.$el.find("#" + filterId);
		if ($filterEl.is("input")) {
			if(filterId === "start_date") {
				$("#end_date").removeAttr("value");
				delete Yumster.current_filters["end_date"];
			} else if (filterId === "end_date") {
				$("#start_date").removeAttr("value");
				delete Yumster.current_filters["start_date"];
			}
			$filterEl.removeAttr("value");
		} else if ($filterEl.is("select")) {
			$filterEl.prop('selectedIndex', 0);
		} else { //it is a slider
			if(filterId === "min_price") {
				delete Yumster.current_filters["max_price"];
			} else if (filterId === "max_price") {
				delete Yumster.current_filters["min_price"];
			}
		}
		delete Yumster.current_filters[filterId];
		this.collection.fetch({data: Yumster.current_filters});
	},
	
	blueMarker: function (event) {
		var num = $(event.currentTarget).data("listing-num");
		var marker = Yumster.markers[num];
		marker.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|005CB8");
	  // this.pinBounce(marker);
		marker.setAnimation(google.maps.Animation.BOUNCE);
	},
	
	redMarker: function (event) {
		var num = $(event.currentTarget).data("listing-num");
		Yumster.markers[num].setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
		// this.pinBounce(marker);
		Yumster.markers[num].setAnimation(null);
	},
	
});
_.extend(Yumster.Views.SearchContent.prototype);