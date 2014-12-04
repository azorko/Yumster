json.extract! @meal, :id, :title, :price, :max_guests, :tag, :host_id, :photo_url, :date, :about
	
	host = @meal.user
	json.host do
	  json.extract! host, :id, :name, :address, :photo_url, :about
	end
		
	json.ratings host.ratings do |rating|
	  json.extract! rating, :id, :stars, :review
		json.author do
		  json.extract! rating.author, :id, :photo_url, :name
		end
	end
	
	json.guests @meal.guests do |guest|
	  json.extract! guest, :id, :photo_url, :name
		json.booking do
		  json.extract! guest.guest_meal_joins.where(meal_id: @meal.id).first, :id, :guest_num
		end
	end
	