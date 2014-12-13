Yumster.Views.Map = Backbone.CompositeView.extend({
	
	template: JST['meals/map'],
	
	initialize: function () {
		console.log('initializeMap');
		Yumster.markers = [];
		this.refreshListeners();
		this.render();
	},
	
	refreshListeners: function () {
		console.log("refreshListeners");
		this.stopListening();
		this.listenTo(this.collection, "add", this.attachMarker);
		this.listenTo(this.collection, "remove", this.removeMarker);
	},
	
  render: function () {
		console.log('rendering map');
		var content = this.template();
		this.$el.html(content);
		this.renderMap();
    return this;
  },
	
	renderMap: function () {
		var lat = Number(Yumster.current_filters["lat"]) || 37.7749295;
		var lng = Number(Yumster.current_filters["lng"]) || -122.4194155;
		var mapOptions = {
			center: new google.maps.LatLng(lat, lng),
			zoom: 12
		};
		this._map = new google.maps.Map(this.$el.find("#search-map")[0], mapOptions); //this._map ||

		var that = this;
	  google.maps.event.addListener(this._map, 'idle', function() { //never use "bounds_changed"
			var mapBounds = that._map.getBounds();
			var southWest = mapBounds.getSouthWest();
			var northEast = mapBounds.getNorthEast();
			
 			var topLeftLat = northEast.lat();
 			var topLeftLng = southWest.lng();
 			var bottomRightLat = southWest.lat();
 			var bottomRightLng = northEast.lng();
 			Yumster.current_filters["top_left"] = [topLeftLat, topLeftLng];
 			Yumster.current_filters["bottom_right"] = [bottomRightLat, bottomRightLng];
 			that.collection.fetch({data: { filters: Yumster.current_filters, page: Yumster.meal_page } });
 	  });
	},
	
	changeCenter: function () {
		var lat = Number(Yumster.current_filters["lat"]) || 37.7749295;
		var lng = Number(Yumster.current_filters["lng"]) || -122.4194155;
		var newCenter = new google.maps.LatLng(lat, lng);
		this._map.setCenter(newCenter);
	},
	
	newMarker: function (results, listing) {
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569",
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));
		
    var marker = new google.maps.Marker({
      map: this._map,
      position: results[0].geometry.location,
			animation: google.maps.Animation.DROP,
			icon: pinImage,
			listingId: listing.id
    });
		Yumster.markers.push(marker);
		
		google.maps.event.addListener(marker, "click", (function() {
			this.clickMarker(marker, event)
		}).bind(this));
	},
	
	attachMarker: function (listing) {
		var that = this;
		var address = listing.basicHostData().get("address");
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address }, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
				that.newMarker(results, listing);
			}
		});
	},
	
	addMarkers: function() {
		// debugger
		// Yumster.markers = [];
		console.log('addMarkers');
		this.collection.each(function (listing) {
			this.attachMarker(listing);
		}.bind(this));
	},
	
	removeMarkers: function () {
		console.log('removeMarkers');
		_.each(Yumster.markers, function(marker) { 
			marker.setMap(null);
		});
		
		Yumster.markers = [];
	},
	
	removeMarker: function (listing) {
		var that = this;
		Yumster.markers.forEach(function(marker, index) { 
			if (marker.listingId === listing.id) {
				marker.setMap(null);
				Yumster.markers.splice(index, 1);
			}
		});
	},
	
	clickMarker: function (marker, event) {
		if (this._listingWindow) {
			this._listingWindow.close();
		}

		this._listingWindow && this._listingWindow.infoView.remove();
		this._listingWindow = this._openInfoWindow(marker);
		this._listingWindow.open(this._map, marker);
	},

	_openInfoWindow: function(marker) {
		var meal = Yumster.Collections.meals.getOrFetch(marker.listingId);
		var infoView = new Yumster.Views.MapMeal({ model: meal });

		var info = new google.maps.InfoWindow({
			content: infoView.template({ meal: meal }),
			infoView: infoView,
			buttons:{close:{show: 4}}
		});
		
		google.maps.event.addListener(this._map, "click", function(){
		  info.close();
		});
		
		function show (event) {
			var id = $(event.currentTarget).data("id");
			Backbone.history.navigate("meals/" + id, {trigger: true});
		};
		
		google.maps.event.addListener(info, 'domready', function () {
		  google.maps.event.addDomListener(document.getElementById("meal-info"), 'click', show);
		});	
		
		return info;
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

});