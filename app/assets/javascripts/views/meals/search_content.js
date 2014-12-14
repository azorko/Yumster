Yumster.Views.SearchContent = Backbone.CompositeView.extend({
	
	template: JST['meals/search_content'],
	
	initialize: function () {
		this.meal_page = 1;
		this.render();
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
		"mouseleave .meal-info": "redMarker",
		"click .pagination>li>a": "pageChange"
	},
	
  render: function () {
    var content = this.template({
    	meals: this.collection,
			filters: Yumster.current_filters,
			cuisines: Yumster.cuisines,
			page_num: this.meal_page
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
		this.collection.fetch({data: { filters: Yumster.current_filters, page: this.meal_page } });
	},
	
	show: function (event) {
		var id = $(event.currentTarget).data("id");
		Backbone.history.navigate("meals/" + id, {trigger: true});
	},
	
	filterChange: function (event) {
		var $filterEl = $(event.currentTarget);
		Yumster.current_filters[$filterEl.attr("name")] = $filterEl.val();
		this.collection.fetch({data: { filters: Yumster.current_filters, page: this.meal_page } });
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
		this.collection.fetch({data: { filters: Yumster.current_filters, page: this.meal_page } });
	},
	
	blueMarker: function (event) {
		var id = $(event.currentTarget).data("id");
		Yumster.markers.forEach(function(marker, index) { 
			if (marker.listingId === id) {
				marker.setIcon("https://s3-us-west-1.amazonaws.com/yumster/blue_pin.png");
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		});
	},
	
	redMarker: function (event) {
		var id = $(event.currentTarget).data("id");
		Yumster.markers.forEach(function(marker, index) { 
			if (marker.listingId === id) {
				marker.setIcon("https://s3-us-west-1.amazonaws.com/yumster/red_pin.png");
				marker.setAnimation(null);
			}
		});
	},
	
	pageChange: function (event) {
		event.preventDefault();
		var chosenPage = Number($(event.currentTarget).data("page"));
		if (chosenPage === 0) {
			this.meal_page--;
		} else if (chosenPage === -1) {
			this.meal_page++;
		} else {
			this.meal_page = chosenPage;
		}
		this.collection.fetch({data: { filters: Yumster.current_filters, page: this.meal_page } });
	}
	
});