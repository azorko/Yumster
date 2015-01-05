month = DateTime.now.month
year = DateTime.now.year

Meal.create({tag: "Latin American", title: "Seafood Bonanza", price: 30, max_guests: 10, host_id: 1, date: "#{year}-#{month}-28", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/seafood.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "French Breakfast", price: 20, max_guests: 10, host_id: 2, date: "#{year}-#{month}-27", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/quiche.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Philly Style", price: 30, max_guests: 10, host_id: 3, date: "#{year}-#{month}-26", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/philly-cheese.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Panda Sushi", price: 15, max_guests: 10, host_id: 4, date: "#{year}-#{month}-25", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/panda_sushi.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Oodles of Noodles", price: 20, max_guests: 10, host_id: 5, date: "#{year}-#{month}-24", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/soba.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Latin American", title: "Peruvian Ribs", price: 30, max_guests: 10, host_id: 6, date: "#{year}-#{month}-23", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/ribs.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Middle Eastern", title: "Kebab Time", price: 25, max_guests: 10, host_id: 7, date: "#{year}-#{month}-22", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/kebab.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Middle Eastern", title: "Everything Hummus", price: 15, max_guests: 10, host_id: 8, date: "#{year}-#{month}-21", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/hummus.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Middle Eastern", title: "Beefed Up Gyros", price: 20, max_guests: 10, host_id: 9, date: "#{year}-#{month}-20", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/shawarma.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Kitsune Udon", price: 15, max_guests: 10, host_id: 10, date: "#{year}-#{month}-19", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/udon.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Cajun Jambalaya", price: 30, max_guests: 10, host_id: 11, date: "#{year}-#{month}-18", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/jambalaya.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Grandma's Lasagna", price: 25, max_guests: 10, host_id: 12, date: "#{year}-#{month}-17", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/lasagna.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Molten Lava Cake", price: 15, max_guests: 10, host_id: 13, date: "#{year}-#{month}-16", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/lava_cake.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Latin American", title: "Pulled Pork Quesadillas", price: 20, max_guests: 10, host_id: 14, date: "#{year}-#{month}-15", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/quesadillas.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Asian", title: "Curries Galore", price: 20, max_guests: 10, host_id: 15, date: "#{year}-#{month}-14", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/curries.jpg", about: Faker::Lorem.paragraph(12)})

Meal.create({tag: "Western", title: "Almond Creme Crepe Cake", price: 15, max_guests: 10, host_id: 16, date: "#{year}-#{month}-13", photo_url: "https://s3-us-west-1.amazonaws.com/yumster/crepe_cake.jpg", about: Faker::Lorem.paragraph(12)})


User.create({email: "natasha@yumster.com", password: "secret", name: "Natasha", address: "3255 21st St, San Francisco, CA", lat: 37.75685199999999, lng: -122.42031359999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Katia.jpg", about: Faker::Lorem.paragraph });

User.create({email: "andrei@yumster.com", password: "secret", name: "Andrei", address: "429 Castro St, San Francisco, CA", lat: 37.7620333, lng: -122.43475910000001, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Nikita.jpg", about: Faker::Lorem.paragraph });

User.create({email: "marina@yumster.com", password: "secret", name: "Marina", address: "1610 Geary Blvd, San Francisco, CA", lat: 37.7849934, lng: -122.43018119999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Olga.jpg", about: Faker::Lorem.paragraph });

User.create({email: "shelly@yumster.com", password: "secret", name: "Shelly", address: "100 Transverse Dr, San Francisco, CA", lat: 37.769421, lng: -122.486214, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Nitzan.jpg", about: Faker::Lorem.paragraph });

User.create({email: "franchesca@yumster.com", password: "secret", name: "Franchesca", address: "1805 Geary Blvd, San Francisco, CA", lat: 37.7840042, lng: -122.43313319999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Lily.jpg", about: Faker::Lorem.paragraph });

User.create({email: "jessica@yumster.com", password: "secret", name: "Jessica", address: "1601 Haight St, San Francisco, CA", lat: 37.7697907, lng: -122.44858240000002, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Tiffie.jpg", about: Faker::Lorem.paragraph });

User.create({email: "lara@yumster.com", password: "secret", name: "Lara", address: "679 Sutter St, San Francisco, CA", lat: 37.7885915, lng: -122.41148129999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Nev.jpg", about: Faker::Lorem.paragraph });

User.create({email: "sebastian@yumster.com", password: "secret", name: "Sebastian", address: "2144 Chestnut St, San Francisco, CA", lat: 37.8006178, lng: -122.43871250000001, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Dima.jpg", about: Faker::Lorem.paragraph });

User.create({email: "sophia@yumster.com", password: "secret", name: "Sophia", address: "736 W Dana St., Mountain View, CA", lat: 37.3923683, lng: -122.07892140000001, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Gina.jpg", about: Faker::Lorem.paragraph });

User.create({email: "artemus@yumster.com", password: "secret", name: "Artemus", address: "1945 Charleston Road, Mountain View, CA", lat: 37.4225275, lng: -122.0904213, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Chris.jpg", about: Faker::Lorem.paragraph });

User.create({email: "lucas@yumster.com", password: "secret", name: "Lucas", address: "855 E El Camino Real, Sunnyvale, CA", lat: 37.3546874, lng: -122.01528239999999, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Sahil.jpg", about: Faker::Lorem.paragraph });

User.create({email: "isabella@yumster.com", password: "secret", name: "Isabella", address: "21840 McClellan Rd, Cupertino, CA", lat: 37.3144364, lng: -122.05667269999998, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Zhyliana.jpg", about: Faker::Lorem.paragraph });

User.create({email: "maya@yumster.com", password: "secret", name: "Maya", address: "2500 Grant Rd, Mountain View, CA", lat: 37.3694772, lng: -122.07991170000003, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Shefali.jpg", about: Faker::Lorem.paragraph });

User.create({email: "eva@yumster.com", password: "secret", name: "Eva", address: "10123 N Wolfe Rd, Cupertino, CA", lat: 37.3271238, lng: -122.01519380000002, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Adity.jpg", about: Faker::Lorem.paragraph });

User.create({email: "rodrigo@yumster.com", password: "secret", name: "Rodrigo", address: "1500 N Shoreline Blvd, Mountain View, CA", lat: 37.4146221, lng: -122.08096280000001, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Ashton.jpg", about: Faker::Lorem.paragraph });

User.create({email: "guest@yumster.com", password: "secret", name: "Guest", address: "588 N Mary Ave, Sunnyvale, CA", lat: 37.3932482, lng: -122.03691609999998, photo_url: "https://s3-us-west-1.amazonaws.com/yumster/Panda.jpg", about: Faker::Lorem.paragraph });


16.times do |i|
  author_arr = (1..16).to_a
  author_arr.slice!(i)
  author_arr.each do |k|
    if i.odd?
      if (k - 1) % 2 == 0
        GuestMealJoin.create!({meal_id: i + 1, guest_id: k, guest_num: [1].sample})
        Rating.create({ stars: [4, 5].sample, review: Faker::Lorem.paragraph, host_id: i + 1, author_id: k })
      end
    else
      if k % 2 == 0
        GuestMealJoin.create!({meal_id: i + 1, guest_id: k, guest_num: [1].sample})
        Rating.create({ stars: [4, 5].sample, review: Faker::Lorem.paragraph, host_id: i + 1, author_id: k })
      end
    end
  end
end

