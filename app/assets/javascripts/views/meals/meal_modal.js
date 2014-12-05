Yumster.Views.MealModal = Backbone.CompositeView.extend({
	
  template: JST['meals/modal'],
	
	initialize: function (options) {
		this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.user, "sync", this.render);
		$("body").attr("style", "overflow: hidden;");
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
		debugger
		event.preventDefault();
		var attrs = $(".modal-input").serializeJSON();
		
		var that = this;
		function success () {
			$("body").removeAttr("style");
			that.remove();
		};

		if(this.model.isNew()) {
			this.collection.create(attrs, {
				success: success
			});
		} else {
			this.model.save(attrs, { success: success });
		}
	}
	
});