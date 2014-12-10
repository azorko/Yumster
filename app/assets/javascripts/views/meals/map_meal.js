Yumster.Views.MapMeal = Backbone.View.extend({
	template: JST['meals/meal'],
	
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},

	render: function() {
		var content = this.template({ meal: this.model });
		this.$el.html(content);
		return this;
	},
	
});