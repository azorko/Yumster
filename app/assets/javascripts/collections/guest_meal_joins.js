Yumster.Collections.GuestMealJoins = Backbone.Collection.extend({
  url: "/api/guest_meal_joins",
  model: Yumster.Models.GuestMealJoin,
	
  getOrFetch: function (id) {
    var booking = this.get(id);
		var bookings = this;

    if(!booking) {
      booking = new Yumster.Models.GuestMealJoin({ id: id });
      booking.fetch({
        success: function () {
          bookings.add(booking);
        }
      });
    } else {
      booking.fetch();
    }

    return booking;
  },

});

Yumster.Collections.bookings = new Yumster.Collections.GuestMealJoins();
