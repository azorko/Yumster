Yumster.Views.MealsSearch = Backbone.View.extend({

  template: JST['meals/search'],
	
	events: {
		"click button": "submit"
	},
	
  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});