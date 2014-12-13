Yumster.Views.MealShow = Backbone.View.extend({

  template: JST['meals/show'],
	
	initialize: function () {
		this.listenTo(this.model, "sync add remove reset", this.render);
		this.user = new Yumster.Models.User();
		this.user.fetch();
		this.listenTo(this.user, "sync add remove reset", this.render);
	},
	
	events: {
		"click .calc": "calcPrice",
		"click #book": "book",
		"change #guest_num": "changeCalc",
		"click .new-review-link": "reviewForm",
		"click #post-review": "postReview",
		"click .host-pic": "viewUser"
	},
	
	render: function () {
    var content = this.template({
    	meal: this.model,
			filters: Yumster.current_filters,
			user: this.user
    });
    this.$el.html(content);
		
		this.calcRating();
		
		if(this.model.guests().get(this.user.get("id"))) {
			this.newReview();
		}
		
		return this;
	},
	
	newReview: function () {
		var html = "<div class='new-review-link'><span class='glyphicon glyphicon-plus'> </span> <span style='margin-left: 10px; font-size: 15px;'>Post your review. </span> </div>";
		this.$el.find(".new-review").html(html);
	},
	
	calcRating: function () {
		var stars = 0;
		this.model.ratings().forEach( function (rating) {
			stars += rating.get("stars");
		});
		var numRatings = this.model.ratings().length;
		stars = stars / numRatings;
		this.$el.find("#meal-rating").append(numRatings + " Reviews");
		var starRating = $("<span>").attr("style", "margin-left: 10px;");
		starRating.raty({score: stars, readOnly: true});
		this.$el.find("#meal-rating").append(starRating);
	},
	
	calcPrice: function (event) {
		this.calc = true;
		var gridEl = this.$el.find("#price-grid");
		this.guest_num = this.$el.find("select").val();
		var price = this.model.get("price");
		var grid = "<table style='border-bottom: 1px solid #e7e7e7;' class='table table-hover'><tr><td>$" + price + " x " + this.guest_num + " Guests</td><td>$" + price*this.guest_num + "</td> </tr><tr><td>Service Fee</td><td>$" + Math.floor(.1*price*this.guest_num) +"</td> </tr> <tr><td> Total </td><td>$" + Math.floor(price*this.guest_num*1.1) + "</td></tr></table>";
		gridEl.html(grid);
		var bookButton = "<button style='margin-left: 10px; width: 100%;' type='submit' id='book' class='search-button btn btn-default'>Book </button>";
		this.$el.find("#book-div").html(bookButton);
	},
	
	book: function (event) {
		event.preventDefault();
		if(this.user.isNew()) {
			var error = "<p style='text-align: center; color: red;'> Please sign in, or register to book. </p>";
		} else if (this.model.guests().get(this.user.get("id"))) {
			var error = "<p style='text-align: center; color: red;'> You have already booked this meal. </p>";
		} else {
			
			var error = "<p style='text-align: center; color: green;'> Your request was processed succesfully. </p>";
			
			var that = this;
			var booking = new Yumster.Models.GuestMealJoin();
			booking.save({ meal_id: this.model.get("id"), guest_id: this.user.get("id"), guest_num: this.guest_num }, {
				success: function () {
					setTimeout(function () { that.model.fetch(); }, 3000);
				}
			});
		}
		this.$el.find("#book-errors").html(error);
		var that = this;
		setTimeout(function () { that.$el.find("#book-errors").html("") }, 3000);
	},
	
	changeCalc: function (event) {
		if (this.calc === true) {
		  this.calcPrice();	
		}
	},
	
	reviewForm: function (event) {
		var starRating = $("<span>").attr("id", "rating");
		starRating.raty();
		this.$el.find(".new-review").empty().append(starRating);
		
		var html = "<textarea style='width: 100%; height: 75px; margin-top: 10px;' placeholder='What did you think?'></textarea> <button style='margin-top: 5px;' type='submit' id='post-review' class='search-button btn btn-default'>Post </button>";
		this.$el.find(".new-review").append(html);
	},
	
	postReview: function (event) {
		var review = this.$el.find("textarea").val();
		var stars = this.$el.find("#rating").raty('score');
		var that = this;
		var rating = new Yumster.Models.Rating();
		rating.save({ host_id: this.model.escape("host_id"), author_id: this.user.get("id"), review: review, stars: stars },
		{
			success: function() {
				that.model.fetch();
			}
		});
		
	},
	
	viewUser: function (event) {
		var userId = $(event.currentTarget).data("user-id");
		var user = Yumster.Collections.users.getOrFetch(userId);
		Backbone.history.navigate("users/" + userId + "/meals", {trigger: true});
	}

});