Yumster.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
	
	initialize: function (options) {
    this.listenToOnce(this.model, "sync", this.render);
		this.query = options.query;
		// this.listenToOnce(this.model, "sync", this.render);
	},
	
	events: {
		"click .listings": "showListings",
		"click .meals": "showMeals"
	},
	
  render: function () {
    var content = this.template({
    	user: this.model
    });
    this.$el.html(content);
		this.renderListings();
		this.renderMeals();
		if (this.query === "listings") {
			this.showListings();
		} else if (this.query === "meals") {
			this.showMeals();
		}
		return this;
  },
	
  renderListings: function () {
    var subview = new Yumster.Views.UserListings({
      model: this.model
    });
    this.addSubview('#listings', subview);
  },
	
  renderMeals: function () {
    var subview = new Yumster.Views.UserMeals({
      model: this.model
    });
    this.addSubview('#meals', subview);
  },
	
	showListings: function (event) {
    this.$el.find("#meals").attr("style", "display: none;");
		this.$el.find("#listings").attr("style", "display: block;");
	},
	
	showMeals: function (event) {
		this.$el.find("#listings").attr("style", "display: none;");
    this.$el.find("#meals").attr("style", "display: block;");
	},

});
