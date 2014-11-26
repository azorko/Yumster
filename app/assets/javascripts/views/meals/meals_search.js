Yumster.Views.MealsSearch = Backbone.View.extend({

  template: JST['meals/search'],
	
	events: {
		"click button": "submit"
	},
	
			// Backbone.history.navigate("search/query + new query params", { replace: true }); //can use to add diff query based on search page changes
	
  render: function () {
		var filters = {};
		var query = Yumster.current_query;
		query = query.split("&");
		for(var i = 0; i < query.length; i++) {
			query[i] = query[i].split("=");
			filters[query[i][0]] = query[i][1];
		}
		new Date(2014,12,28);
    var content = this.template({
    	meals: this.collection,
			filters: filters
    });
    this.$el.html(content);
    return this;
  }

});