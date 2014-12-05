Yumster.Views.UserMeals = Backbone.CompositeView.extend({
	
  template: JST['users/meals'],
	
	initialize: function (options) {
		this.user = options.user;
    this.listenTo(this.model, "sync remove", this.render);
		this.listenTo(this.user, "sync add remove reset", this.render);
		this.listenTo(this.model.guest_meals(), "sync add remove reset", this.render);
	},
	
	events: {
		"click .update": "cancelBooking",
		"click .meal-click": "viewMeal"
	},
	
  render: function () {
    var content = this.template({
    	user: this.model,
			meals: this.model.guest_meals(),
			current_user: this.user
    });
    this.$el.html(content);
    return this;
  },
	
	cancelBooking: function (event) {
		var bookingId = $(event.currentTarget).data("booking-id");
		var booking = Yumster.Collections.bookings.getOrFetch(bookingId);
		var mealIndex = $(event.currentTarget).data("meal-ind");
		var that = this;
	  booking.destroy( {
	  	success: function () {
						var bookings = that.model.guest_meals();
						bookings.remove(bookings.at(mealIndex));
					}
	  });
	},
	
	viewMeal: function (event) {
		var mealId = $(event.currentTarget).data("meal-id");
		var meal = Yumster.Collections.meals.getOrFetch(mealId);
		Backbone.history.navigate("meals/" + mealId, {trigger: true});
	}
	
});