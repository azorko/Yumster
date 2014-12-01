Yumster.Views.MealShow = Backbone.View.extend({

  template: JST['meals/show'],
	
	initialize: function () {
		this.listenTo(this.model, "sync add remove reset", this.render);
	},
	
	events: {
		"click .calc": "calcPrice"
	},
	
	render: function () {
    var content = this.template({
    	meal: this.model,
			filters: Yumster.current_filters
    });
    this.$el.html(content);
		
		this.calcRating();
		
		return this;
	},
	
	calcRating: function () {
		var stars = 0;
		this.model.ratings().forEach( function (rating) {
			stars += rating.get("rating");
		});
		var numRatings = this.model.ratings().length;
		stars = stars / numRatings;
		this.$el.find("#meal-rating").append(numRatings + " Reviews");
		var starRating = $("<span>").attr("style", "margin-left: 10px;");
		starRating.raty({score: stars, readOnly: true});
		this.$el.find("#meal-rating").append(starRating);
	},
	
	calcPrice: function (event) {
		event.preventDefault();
		var gridEl = this.$el.find("#price-grid");
		var guest_num = 4;
		var price = this.model.get("price");
		Yumster.total_price = price*guest_num*1.1;
		var grid = "<table style='border-bottom: 1px solid #e7e7e7;' class='table table-hover'><tr><td>$" + price + " x " + guest_num + " Guests</td><td>$" + price*guest_num + "</td> </tr><tr><td>Service Fee</td><td>$" + .1*price*guest_num +"</td> </tr> <tr><td> Total </td><td>" + price*guest_num*1.1 + "</td></tr></table>";
		gridEl.html(grid);
		var bookButton = "<button style='margin-left: 10px; width: 100%;' type='submit' id='button-search' class='search-button btn btn-default book'>Book </button>";
		this.$el.find("#book-div").html(bookButton);
	}

});