Yumster.Views.Home = Backbone.View.extend({

  template: JST['home/home'],
	
	tagName: "form",
	
	events: {
		"click button": "submit"
	},
	
  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
	
	submit: function (event) {
		event.preventDefault();
		var attrs = this.$el.serialize();
		Backbone.history.navigate("search/" + attrs, {trigger: true});
	}

});