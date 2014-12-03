Yumster.Views.Map = Backbone.CompositeView.extend({
	
	template: JST['meals/map'],
	
	// tagName: "div",
	
	initialize: function () {
		this.listenToOnce(this.collection, "sync", this.addMarkers);
		this.listenTo(this.collection, "remove", this.removeMarker);
	},
	
  render: function () {
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
		this._map = new google.maps.Map(this.$el.find("#search-map")[0], mapOptions);

		var that = this;
	  google.maps.event.addListener(this._map, 'dragend', function() { //"bounds_changed"
			debugger
 			var topLeftLat = that._map.getBounds().Fa.j;
 			var topLeftLng = that._map.getBounds().wa.j;
 			var bottomRightLat = that._map.getBounds().Fa.k;
 			var bottomRightLng = that._map.getBounds().wa.k;
 			Yumster.current_filters["top_left"] = [topLeftLat, topLeftLng];
 			Yumster.current_filters["bottom_right"] = [bottomRightLat, bottomRightLng];
 			that.collection.fetch({data: Yumster.current_filters});
 	  });
	},
	
	newMarker: function (results, eventId) {
		// debugger
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569",
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));
		
    var marker = new google.maps.Marker({
      map: this._map,
      position: results[0].geometry.location,
			animation: google.maps.Animation.DROP,
			icon: pinImage,
			event: eventId
    });
		Yumster.markers.push(marker);
		// google.maps.event.addListener(marker, 'click', this.toggleBounce.bind(this));
	},
	
	attachMarker: function (event) {
		var that = this;
		var address = event.basicHostData().get("address");
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address }, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
				that.newMarker(results, event.id);
			}
		});
	},
	
	// toggleBounce: function (event) {
	// 	debugger
	//     var marker = event.currentTarget;
	//   if (marker.getAnimation() != null) {
	//     marker.setAnimation(null);
	//   } else {
	//     marker.setAnimation(google.maps.Animation.BOUNCE);
	//   }
	// },

	addMarkers: function(event){
		Yumster.markers = [];
		for (var i = 0; i < this.collection.length; i++) {
			this.attachMarker(event.models[i]);
		}
		this.listenTo(this.collection, "add", this.attachMarker);
	},
	
	removeMarker: function (event) {
		// debugger
		var that = this;
		Yumster.markers.forEach(function(marker, index) { 
			if (marker.event === event.id) {
				marker.setMap(null);
				marker = null;
				Yumster.markers.splice(index, 1);
			}
		});
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

_.extend(Yumster.Views.Map.prototype);