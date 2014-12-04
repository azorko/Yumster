json.extract! @user, :id, :name, :address, :photo_url, :about

# json.host_meal_photo do
#   json.extract! @user.host_meals.first, :id, :photo_url
# end

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
		end
	end
end