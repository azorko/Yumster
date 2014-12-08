Yumster.Views.MealsSearch = Backbone.CompositeView.extend({

  template: JST['meals/search'],
	
	initialize: function () {
		// this.parseQuery(); //main div
		this.addMap();
		this.addSearchContent();
	},
	
  render: function () {
		console.log('rendering meals search');
    var content = this.template({});
    this.$el.html(content);
		
		this.attachSubviews();
    return this;
  },
	
	addMap: function () {
    this.addSubview('#map', Yumster.mapView);
	},
	
  addSearchContent: function () {
    var view = new Yumster.Views.SearchContent({
      collection: this.collection
    });
    this.addSubview('#search-content', view);
  },
	
	afterRender: function () {
		Yumster.mapView.render();
		Yumster.mapView.refreshListeners();
		// Yumster.mapView.addMarkers();
	}

});