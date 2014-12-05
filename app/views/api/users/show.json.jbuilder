json.extract! @user, :id, :name, :address, :photo_url, :about

json.host_meals do
	json.meals do
		json.array! @user.host_meals do |meal|
		  json.extract! meal, :id, :title, :photo_url, :date, :updated_at
		end
	end
end

json.guest_meals do
	json.meals do
		json.array! @user.guest_meals do |meal|
		  json.extract! meal, :id, :title, :photo_url, :date, :updated_at
	    json.booking do
			  json.extract! meal.guest_meal_joins.where(guest_id: @user.id).first, :id, :guest_num
			end
		end
	end
end

# json.bookings meal.guest_meal_joins do |booking|
#   json.extract! booking, :id, :guest_num
# end