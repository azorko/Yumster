Yumster.Views.MealsSearch = Backbone.CompositeView.extend({

  template: JST['meals/search'],
	
	initialize: function () {
		// this.parseQuery(); //main div
	},
	
  render: function () {
    var content = this.template({});
    this.$el.html(content);
		this.renderMap();
		this.renderSearchContent();
    return this;
  },
	
  renderMap: function () {
    this.addSubview('#map', Yumster.map);
  },
	
  renderSearchContent: function () {
    var view = new Yumster.Views.SearchContent({
      collection: this.collection
    });
    this.addSubview('#search-content', view);
  },

});