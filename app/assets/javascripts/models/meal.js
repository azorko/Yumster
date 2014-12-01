Yumster.Models.Meal = Backbone.Model.extend({
  urlRoot: "/api/meals",
	
  // host: function () {
  //   if(!this._host) {
  //     this._host = Yumster.Collections.users.getOrFetch(this.get("host_id"));
  //   }
  //
  //   return this._host;
  // },
	
	basicHostData: function () {
    if(!this._hostData) {
      this._hostData = new Yumster.Models.User([]);
    }

    return this._hostData;
	},
	
	ratings: function () {
    if(!this._ratings) {
      this._ratings = new Yumster.Collections.Ratings([]);
    }

    return this._ratings;
	},

  parse: function (response) {
    if(response.host) {
      this.basicHostData().set(response.host, { parse: true });
      delete response.host;
    }
    if(response.ratings) {
      this.ratings().set(response.ratings, { parse: true });
      delete response.ratings;
    }

    return response;
  }
	
});
