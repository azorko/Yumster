Yumster.Views.UserListings = Backbone.CompositeView.extend({
	
  template: JST['users/listings'],
	
	initialize: function (options) {
		this.user = options.user;
		this.listenTo(this.user, "sync add remove reset", this.render); //logged in user
    this.listenTo(this.model, "sync remove", this.render); //user whose profile is being viewed
		this.listenTo(this.model.host_meals(), "sync add remove reset", this.render);
		// this.listenTo(Yumster.Collections.meals, "sync add remove reset", this.render);	
	},
	
	events: {
		"change .update": "update",
		"click .meal-click": "viewMeal",
		"click .modal-button": "newListing"
	},
	
  render: function () {
    var content = this.template({
    	user: this.model,
			listings: this.model.host_meals(),
			current_user: this.user
    });
    this.$el.html(content);
    return this;
  },
	
	update: function (event) {
		var mealId = $(event.currentTarget).data("meal-id");
		var mealIndex = $(event.currentTarget).data("meal-ind");
		var action = $(event.currentTarget).val();
		$(event.currentTarget).val("");
		var meal = Yumster.Collections.meals.getOrFetch(mealId);
		var that = this;
		if (action === "update") {
		  this.modalView = this.modalView ||
		    new Yumster.Views.MealModal({ model: meal, user: this.model });
		  $('body').prepend(this.modalView.render().$el);
		  this.modalView.delegateEvents();
		} else if (action === "delete") {
		  meal.destroy( {
		  	success: function () {
							var listings = that.model.host_meals();
							listings.remove(listings.at(mealIndex));
						}
		  });
		}
	},
	
	viewMeal: function (event) {
		var mealId = $(event.currentTarget).data("meal-id");
		var meal = Yumster.Collections.meals.getOrFetch(mealId);
		Backbone.history.navigate("meals/" + mealId, {trigger: true});
	},
	
	newListing: function (event) {
		event.preventDefault();
		var meal = new Yumster.Models.Meal();
		this.modalView = this.modalView ||
		  new Yumster.Views.MealModal({
				model: meal,
				user: this.model,
				collection: Yumster.Collections.meals
			});
		$('body').prepend(this.modalView.render().$el);
		this.modalView.delegateEvents();
		// setTimeout(this.render.bind(this), 3000);
	}
	
});