Meal.create({tag: "Latin American", title: "Seafood Bonanza", price: 25.00, max_guests: 10, host_id: 1, date: "2014-12-28", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/seafood.jpg"})

Meal.create({tag: "Western", title: "French Breakfast", price: 20.00, max_guests: 10, host_id: 2, date: "2014-12-29", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/quiche.jpg"})

Meal.create({tag: "Western", title: "Philly Style", price: 30.00, max_guests: 10, host_id: 3, date: "2014-12-30", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/philly-cheese.jpg"})

User.create({email: "natasha@yumster.com", password: "secret", name: "Natasha Rostov", address: "3255 21st St, San Francisco, CA", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host1.jpg"});

User.create({email: "andrei@yumster.com", password: "secret", name: "Andrei Truman", address: "429 Castro St, San Francisco, CA 94114", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host2.jpg"});

User.create({email: "marina@yumster.com", password: "secret", name: "Marina Zander", address: "1610 Geary Blvd, San Francisco, CA 94115", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host3.jpg"});