Meal.create({tag: "Latin American", title: "Seafood Bonanza", price: 25, max_guests: 10, host_id: 1, date: "2014-12-28", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/seafood.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "French Breakfast", price: 20, max_guests: 10, host_id: 2, date: "2014-12-29", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/quiche.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Philly Style", price: 30, max_guests: 10, host_id: 3, date: "2014-12-30", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/philly-cheese.jpg", about: Faker::Lorem.paragraph(12)})

User.create({email: "natasha@yumster.com", password: "secret", name: "Natasha", address: "3255 21st St, San Francisco, CA", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host1.jpg", about: Faker::Lorem.paragraph });

User.create({email: "andrei@yumster.com", password: "secret", name: "Andrei", address: "429 Castro St, San Francisco, CA", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host2.jpg", about: Faker::Lorem.paragraph });

User.create({email: "marina@yumster.com", password: "secret", name: "Marina", address: "1610 Geary Blvd, San Francisco, CA", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host3.jpg", about: Faker::Lorem.paragraph });

3.times do |i|
  author_arr = [1, 2, 3]
  author_arr.slice!(i)
  author_arr.each do |j|
    Rating.create({ rating: [4, 5].sample, review: Faker::Lorem.paragraph, host_id: (i + 1), author_id: j })
  end
end