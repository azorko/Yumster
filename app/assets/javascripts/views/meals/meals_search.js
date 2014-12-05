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
	
	// parseQuery: function () {
// 		var filters = {};
// 		var query = Yumster.current_query;
// 		query = query.split("&");
// 		for(var i = 0; i < query.length; i++) {
// 			query[i] = query[i].split("=");
// 			filters[query[i][0]] = query[i][1];
// 			filters[query[i][0]] = filters[query[i][0]].replace(/\+/g, " ");
// 		}
// 		Yumster.current_filters = filters;
// 	},
	
  renderMap: function () {
    var view = new Yumster.Views.Map({
      collection: this.collection
    });
    this.addSubview('#map', view);
  },
	
  renderSearchContent: function () {
    var view = new Yumster.Views.SearchContent({
      collection: this.collection
    });
    this.addSubview('#search-content', view);
  },

});