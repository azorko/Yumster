Yumster.Views.MealsSearch = Backbone.View.extend({

  template: JST['meals/search'],
	
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "sync", this.updateMap);
	},
	
	events: {
		"click button": "submit",
		"slide .slider": "updatePrice",
		"click .meal-info": "show"
	},
	
			// Backbone.history.navigate("search/query + new query params", { replace: true }); //can use to add diff query based on search page changes
	
  render: function () {
		var filters = {};
		var query = Yumster.current_query;
		query = query.split("&");
		for(var i = 0; i < query.length; i++) {
			query[i] = query[i].split("=");
			filters[query[i][0]] = query[i][1];
			filters[query[i][0]] = filters[query[i][0]].replace(/\+/g, " ");
		}
		Yumster.current_filters = filters;
		this.getCenter(filters["location"]);
		
		// new Date(2014,12,28);
		
    var content = this.template({
    	meals: this.collection,
			filters: filters,
			cuisines: Yumster.cuisines
    });
    this.$el.html(content);
		// $("#location-search").attr("value", filters["location"]);
		
		this.$el.find(".slider").slider({
			min: 0,
			max: 1000,
			range: true,
			values: [0, 1000]
		 });
		 
		// this.updateMap();
		
    return this;
  },
	
	getCenter: function (center) {
		var that = this;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': center }, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
				that.setLocationRadius(results);
			}
		});
	},
	
	setLocationRadius: function (results) {
		this._center = results[0].geometry.location;
		var radius;
		if (Yumster.current_filters["radius"]) {
			radius = Number(Yumster.current_filters["radius"]);
		} else {
			radius = 15;
		}
		this._validLocation = new google.maps.Circle({ //does this need a map?
		  center: this._center,
			radius: (radius * 1609), //in meters
			visible: false
		});
		
	},
	
	updateMap: function () { //(location) {
		// var address = location;
		var mapOptions = {
			center: { lat: 37.726666666, lng: -122.395555555 },
			zoom: 10
		};
		this._map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); //this.$el.find('#map-canvas')[0] //document.getElementById('map-canvas')
		this._map.setCenter(this._center);
		var that = this;
		var geocoder = new google.maps.Geocoder();
		for (var i = 0; i < this.collection.length; i++) {
		  var address = this.collection.models[i].basicHostData().get("address");
			geocoder.geocode({ 'address': address }, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
					if ( that._validLocation.getBounds().contains(results[0].geometry.location) ) {
					// if (google.maps.geometry.circle.containsLocation(results[0].geometry.location, that._validLocation)) {
						that.attachMarker(results);
					} else {
						this.collection.models.splice(i, 1);
					}
				}
			});
		}
	},
	
	attachMarker: function (results) {
    var marker = new google.maps.Marker({
      map: this._map,
      position: results[0].geometry.location
    });
	},
	
	updatePrice: function (event) {
		var minValue = $(event.currentTarget).slider( "values", 0 );
		this.$el.find("#min-price").text("$" + minValue);
		var maxValue = $(event.currentTarget).slider( "values", 1 );
		this.$el.find("#max-price").text("$" + maxValue);
		
	},
	
	show: function (event) {
		var id = $(event.currentTarget).data("id");
		Backbone.history.navigate("meals/" + id, {trigger: true});
	}

});