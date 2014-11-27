Yumster.Views.Map = Backbone.View.extend({
	
	// Backbone.history.navigate("search/query + new query params", { replace: true }); //can use to add diff query based on search page changes
	
	initialize: function () {
		var mapOptions = {
			center: { lat: 37.726666666, lng: -122.395555555 },
			zoom: 10
		};
		this.map = new google.maps.Map(this.el, mapOptions);
	},
	
	render: function () {
		//
		// google.maps.event.addDomListener(window, 'load', this.attachMap.bind(this));
		//
		// $(document).ready(function () {
		// 	this.updateMap(filters["location"]);
		// }.bind(this));
		//
		return this;
	},
	
	geoCallback: function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			this._map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: this._map,
				position: results[0].geometry.location
			});
		}
	},
	
	updateMap: function (location) {
		debugger
		var address = location;
		var that = this;
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address }, this.geoCallback.bind(this));
		// geocoder.geocode({ 'address': address }, function(results, status) {
			//   if (status == google.maps.GeocoderStatus.OK) {
				//     that._map.setCenter(results[0].geometry.location);
				//     var marker = new google.maps.Marker({
					//     map: that._map,
					//     position: results[0].geometry.location
					//   });
					// 	    }
					// });
				},
	
				attachMap: function () {
					var mapOptions = {
						center: { lat: 37.726666666, lng: -122.395555555 },
						zoom: 10
					};
					this._map = new google.maps.Map(document.getElementById('map-canvas'),
					mapOptions);
				}

			});