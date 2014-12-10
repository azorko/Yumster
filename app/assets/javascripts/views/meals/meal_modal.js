Yumster.Views.MealModal = Backbone.CompositeView.extend({
	
  template: JST['meals/modal'],
	
	initialize: function (options) {
		this.user = options.user;
		this.listenTo(this.user, "sync", this.render);
		$("body").attr("style", "overflow: hidden; position: fixed;");
	},
	
  events: {
    'click .yum-modal-dismiss': 'dismiss',
    'click .yum-modal-backdrop': 'dismiss',
		'click button': 'submit'
  },
	
  dismiss: function (event) {
    event.preventDefault();
		$("body").removeAttr("style");
    this.remove();
  },
	
  render: function () {
    var content = this.template({
    	meal: this.model,
			cuisines: Yumster.cuisines,
			// user: this.user
    });
    this.$el.html(content);
    return this;
  },
	
	submit: function (event) {
		event.preventDefault();
		var attrs = $(".modal-input").serializeJSON();
		
		var that = this;
		function success () {
			that.user.host_meals().add(that.model);
			$("body").removeAttr("style");
			that.remove();
		};
		
		function error () {
			$("#listing-errors").html("Please fill out all the fields.");
			setTimeout(function () {
				$("#listing-errors").html("");
			}, 3000);
		};

		if(this.model.isNew()) {
			var model = this.collection.create(attrs, {
				success: function () {
					that.user.host_meals().add(model);
					$("body").removeAttr("style");
					that.remove();
				},
				error: error
			});
		} else {
			this.model.save(attrs, { success: success, error: error });
		}
	}
	
});