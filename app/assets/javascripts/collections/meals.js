Yumster.Collections.Meals = Backbone.Collection.extend({
  url: "/api/meals",
  model: Yumster.Models.Meal,
	
  getOrFetch: function (id) {
    var meal = this.get(id);
		var meals = this;

    if(!meal) {
      meal = new Yumster.Models.Meal({ id: id });
      meal.fetch({
        success: function () {
          meals.add(meal);
        }
      });
    } else {
      meal.fetch();
    }

    return meal;
  }

});

Yumster.Collections.meals = new Yumster.Collections.Meals();