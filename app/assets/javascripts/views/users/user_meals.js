Yumster.Views.UserMeals = Backbone.CompositeView.extend({
	
  template: JST['users/meals'],
	
	initialize: function () {
    this.listenTo(this.model, "sync", this.render);		
	},
	
  render: function () {
    var content = this.template({
    	user: this.model,
			meals: this.model.guest_meals()
    });
    this.$el.html(content);
    return this;
  }
	
});