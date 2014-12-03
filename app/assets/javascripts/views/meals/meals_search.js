Yumster.Views.MealsSearch = Backbone.View.extend({

  template: JST['meals/search'],
	
	initialize: function () {
		this.listenTo(this.collection, "sync", this.update);
		// this.listenTo(this.collection, "sync", this.addMarkers);
		// this.listenTo(this.collection, "add", this.newMarker);
// 		this.listenTo(this.collection, "remove", this.removeMarker);

		this.parseQuery();
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
	},
	
  render: function () {
		debugger
    var content = this.template({
    	meals: this.collection,
			filters: Yumster.current_filters,
			cuisines: Yumster.cuisines
    });
    this.$el.html(content);
		this.renderSlider();
		this.renderMap();
		
    return this;
  },
	
	parseQuery: function () {
		var filters = {};
		var query = Yumster.current_query;
		query = query.split("&");
		for(var i = 0; i < query.length; i++) {
			query[i] = query[i].split("=");
			filters[query[i][0]] = query[i][1];
			filters[query[i][0]] = filters[query[i][0]].replace(/\+/g, " ");
		}
		Yumster.current_filters = filters;
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
	
	// getCenter: function (center) {
// 		var that = this;
// 		var geocoder = new google.maps.Geocoder();
// 		geocoder.geocode({ 'address': center }, function(results, status) {
// 		  if (status == google.maps.GeocoderStatus.OK) {
// 				that.setLocationRadius(results);
// 			}
// 		});
// 	},
	
	// setLocationRadius: function (results) {
// 		this._center = results[0].geometry.location;
// 		var radius;
// 		if (Yumster.current_filters["radius"]) {
// 			radius = Number(Yumster.current_filters["radius"]);
// 		} else {
// 			radius = 15;
// 		}
// 		this._validLocation = new google.maps.Circle({ //does this need a map?
// 		  center: this._center,
// 			radius: (radius * 1609), //in meters
// 			visible: false
// 		});
//
// 	},

	addMarkers: function(){
		var geocoder = new google.maps.Geocoder();
		var that = this;
		for (var i = 0; i < this.collection.length; i++) {
		  var address = this.collection.models[i].basicHostData().get("address");
			geocoder.geocode({ 'address': address }, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
					that.attachMarker(results);
				}
			});
		}
	},
	renderMap: function () {
		var lat = Number(Yumster.current_filters["lat"]) || 37.7749295;
		var lng = Number(Yumster.current_filters["lng"]) || -122.4194155;
		var mapOptions = {
			center: new google.maps.LatLng(lat, lng),
			zoom: 12
		};
		this._map = new google.maps.Map(this.$el.find("#search-map")[0], mapOptions);
		
		this.markers = [];
		this.addMarkers();
		

		var that = this;
	  google.maps.event.addListener(this._map, 'bounds_changed', function() {
 			var topLeftLat = that._map.getBounds().Fa.j;
 			var topLeftLng = that._map.getBounds().wa.j;
 			var bottomRightLat = that._map.getBounds().Fa.k;
 			var bottomRightLng = that._map.getBounds().wa.k;
 			Yumster.current_filters["top_left"] = [topLeftLat, topLeftLng];
 			Yumster.current_filters["bottom_right"] = [bottomRightLat, bottomRightLng];
 			that.collection.fetch({data: Yumster.current_filters});
 	  });
	},
	
	update: function () {
		//this._map.setCenter(new google.maps.LatLng(Number(Yumster.current_filters["lat"]), Number(Yumster.current_filters["lng"])));
    // var content = this.template({
 //    	meals: this.collection,
 // 			filters: Yumster.current_filters,
 // 			cuisines: Yumster.cuisines
 //    });
 //    this.$el.html(content);
		this.renderSlider();
		
		this.addMarkers();
		this.removeMarkers();
	},
	
	attachMarker: function (results) {
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569",
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));
		
    var marker = new google.maps.Marker({
      map: this._map,
      position: results[0].geometry.location,
			animation: google.maps.Animation.DROP,
			icon: pinImage
    });
		this.markers.push(marker);
		// google.maps.event.addListener(marker, 'click', this.toggleBounce.bind(this));
	},
	// this.markers[this.markers.indexOf(marker)]
	
	// toggleBounce: function (event) {
// 		debugger
//     var marker = event.currentTarget;
// 	  if (marker.getAnimation() != null) {
// 	    marker.setAnimation(null);
// 	  } else {
// 	    marker.setAnimation(google.maps.Animation.BOUNCE);
// 	  }
// 	},
	
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
		this.markers[num].setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|005CB8");
	},
	
	redMarker: function (event) {
		var num = $(event.currentTarget).data("listing-num");
		this.markers[num].setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
	}

});