Yumster.Views.UserListings = Backbone.CompositeView.extend({
	
  template: JST['users/listings'],
	
	initialize: function () {
    this.listenTo(this.model, "sync", this.render);		
	},
	
  render: function () {
    var content = this.template({
    	user: this.model,
			listings: this.model.host_meals()
    });
    this.$el.html(content);
    return this;
  }
	
});