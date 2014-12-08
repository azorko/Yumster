Meal.create({tag: "Latin American", title: "Seafood Bonanza", price: 30, max_guests: 10, host_id: 1, date: "2014-12-28", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/seafood.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "French Breakfast", price: 20, max_guests: 10, host_id: 2, date: "2014-12-29", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/quiche.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Philly Style", price: 30, max_guests: 10, host_id: 3, date: "2014-12-30", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/philly-cheese.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Panda Sushi", price: 15, max_guests: 10, host_id: 4, date: "2014-12-27", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/panda_sushi.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Oodles of Noodles", price: 20, max_guests: 10, host_id: 5, date: "2014-12-26", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/soba.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Latin American", title: "Peruvian Ribs", price: 30, max_guests: 10, host_id: 6, date: "2014-12-25", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/ribs.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Middle Eastern", title: "Kebab Time", price: 25, max_guests: 10, host_id: 7, date: "2014-12-24", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/kebab.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Middle Eastern", title: "Everything Hummus", price: 15, max_guests: 10, host_id: 8, date: "2014-12-23", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/hummus.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Middle Eastern", title: "Beefed Up Gyros", price: 20, max_guests: 10, host_id: 1, date: "2014-12-22", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/shawarma.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Kitsune Udon", price: 15, max_guests: 10, host_id: 2, date: "2014-12-21", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/udon.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Almond Creme Crepe Cake", price: 15, max_guests: 10, host_id: 3, date: "2014-12-21", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/crepe_cake.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Cajun Jambalaya", price: 30, max_guests: 10, host_id: 4, date: "2014-12-20", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/jambalaya.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Grandma's Lasagna", price: 25, max_guests: 10, host_id: 5, date: "2014-12-19", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/lasagna.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Molten Lava Cake", price: 15, max_guests: 10, host_id: 6, date: "2014-12-18", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/lava_cake.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Latin American", title: "Pulled Pork Quesadillas", price: 20, max_guests: 10, host_id: 7, date: "2014-12-17", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/quesadillas.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Curries Galore", price: 20, max_guests: 10, host_id: 8, date: "2014-12-16", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/curries.jpg", about: Faker::Lorem.paragraph(12)})


User.create({email: "natasha@yumster.com", password: "secret", name: "Natasha", address: "3255 21st St, San Francisco, CA", lat: 37.75685199999999, lng: -122.42031359999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host1.jpg", about: Faker::Lorem.paragraph });

User.create({email: "andrei@yumster.com", password: "secret", name: "Andrei", address: "429 Castro St, San Francisco, CA", lat: 37.7620333, lng: -122.43475910000001, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host2.jpg", about: Faker::Lorem.paragraph });

User.create({email: "marina@yumster.com", password: "secret", name: "Marina", address: "1610 Geary Blvd, San Francisco, CA", lat: 37.7849934, lng: -122.43018119999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/host3.jpg", about: Faker::Lorem.paragraph });

User.create({email: "shelly@yumster.com", password: "secret", name: "Shelly", address: "100 Transverse Dr, San Francisco, CA", lat: 37.769421, lng: -122.486214, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Nitzan.png", about: Faker::Lorem.paragraph });

User.create({email: "franchesca@yumster.com", password: "secret", name: "Franchesca", address: "1805 Geary Blvd, San Francisco, CA", lat: 37.7840042, lng: -122.43313319999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Lily", about: Faker::Lorem.paragraph });

User.create({email: "jessica@yumster.com", password: "secret", name: "Jessica", address: "1601 Haight St, San Francisco, CA", lat: 37.7697907, lng: -122.44858240000002, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Tiffie.png", about: Faker::Lorem.paragraph });

User.create({email: "lara@yumster.com", password: "secret", name: "Lara", address: "679 Sutter St, San Francisco, CA", lat: 37.7885915, lng: -122.41148129999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Nev.png", about: Faker::Lorem.paragraph });

User.create({email: "sebastian@yumster.com", password: "secret", name: "Sebastian", address: "2144 Chestnut St, San Francisco, CA", lat: 37.8006178, lng: -122.43871250000001, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Dima.png", about: Faker::Lorem.paragraph });

User.create({email: "guest@yumster.com", password: "secret", name: "Guest", address: "1601 Market St, San Francisco, CA", lat: 37.78105559999999, lng: -122.4114551, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Panda", about: Faker::Lorem.paragraph });


12.times do |i|
  author_arr = [1, 2, 3, 4, 5, 6, 7, 8]
  author_arr.slice!(i)
  # j = i + 1
  # j = i - 7 if i > 7
  author_arr.each do |k|
    if i < 8
      Rating.create({ stars: [4, 5].sample, review: Faker::Lorem.paragraph, host_id: i + 1, author_id: k })
    end
    if i.odd?
      if (k - 1) % 2 == 0
        GuestMealJoin.create!({meal_id: i + 1, guest_id: k, guest_num: [1, 2].sample})
      end
    else
      if k % 2 == 0
        GuestMealJoin.create!({meal_id: i + 1, guest_id: k, guest_num: [1, 2].sample})
      end
    end
  end
end

