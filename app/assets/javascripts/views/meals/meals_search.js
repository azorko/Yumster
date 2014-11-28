Yumster.Views.MealsSearch = Backbone.View.extend({

  template: JST['meals/search'],
	
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
	},
	
	events: {
		"click button": "submit",
		"slide .slider": "updatePrice"
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
		this.updateMap(filters["location"]);
		
    return this;
  },
	
	updateMap: function (location) {
		var address = location;
		var that = this;
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address }, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
				that.attachMap(results);
			}
		});
	},
	
	attachMap: function (results) {
		var mapOptions = {
			center: { lat: 37.726666666, lng: -122.395555555 },
			zoom: 10
		};
		this._map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
			
    this._map.setCenter(results[0].geometry.location);
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
	}

});