Yumster.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
	
	initialize: function (options) {
		this.user = new Yumster.Models.User();
		this.user.fetch();
		this.listenTo(this.user, "sync add remove reset", this.render);
		
    this.listenTo(this.model, "sync", this.render);
		this.query = options.query;
		this.renderListings();
		this.renderMeals();
	},
	
	events: {
		"click .listings": "showListings",
		"click .meals": "showMeals",
		"click .header-button": "changeSubview"
	},
	
  render: function () {
    var content = this.template({
    	user: this.model
    });
    this.$el.html(content);
		this.attachSubviews();
		if (this.query === "listings") {
			this.showListings();
		} else if (this.query === "meals") {
			this.showMeals();
		}
		return this;
  },
	
  renderListings: function () {
    var subview = new Yumster.Views.UserListings({
      model: this.model,
			user: this.user
    });
    this.addSubview('#listings', subview);
  },
	
  renderMeals: function () {
    var subview = new Yumster.Views.UserMeals({
      model: this.model,
			user: this.user
    });
    this.addSubview('#meals', subview);
  },
	
	showListings: function (event) {
		Backbone.history.navigate('#users/' + this.model.get("id") + '/listings', {trigger: false});
    this.$el.find("#meals").attr("style", "display: none;");
		this.$el.find("#listings").attr("style", "display: block;");
	},
	
	showMeals: function (event) {
		Backbone.history.navigate('#users/' + this.model.get("id") + '/meals', {trigger: false});
		this.$el.find("#listings").attr("style", "display: none;");
    this.$el.find("#meals").attr("style", "display: block;");
	},
	
	changeSubview: function (event) {
		$(".header-button").removeAttr("style");
		$(event.currentTarget).attr("style", "background-color: #E7E7E7;");
		var action = $(event.currentTarget).data("action");
		if (action === "listings") {
			this.showListings();
		} else if (action === "meals") {
			this.showMeals();
		}
	}

});
