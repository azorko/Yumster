Yumster.Collections.Users = Backbone.Collection.extend({

  url: "/api/users",
	model: Yumster.Models.User,
	
  getOrFetch: function (id) {
    var user = this.get(id);
		var users = this;

    if(!user) {
      user = new Yumster.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }
    return user;
  }
});

Yumster.Collections.users = new Yumster.Collections.Users();