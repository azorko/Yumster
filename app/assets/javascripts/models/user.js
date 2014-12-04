Yumster.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
	
	host_meals: function () {
    this._host_meals = this._host_meals || new Yumster.Collections.Meals([], {});
    return this._host_meals;
	},
	
	guest_meals: function () {
    this._guest_meals = this._guest_meals || new Yumster.Collections.Meals([], {});
    return this._guest_meals;
	},
	
  parse: function (response) {
    if(response.host_meals) {
      this.host_meals().set(response.host_meals, {parse: true});
      delete response.host_meals;
    }
    if(response.guest_meals) {
      this.guest_meals().set(response.guest_meals, {parse: true});
      delete response.guest_meals;
    }
    // debugger
    return response;
  }
	
});
