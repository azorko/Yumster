json.extract! @meal, :id, :title, :price, :max_guests, :tag, :host_id, :photo_url, :date, :created_at, :updated_at, :about
	
	host = @meal.user
	json.host do
	  json.extract! host, :id, :name, :address, :photo_url, :about
	end
		
	json.ratings host.ratings do |rating|
	  json.extract! rating, :id, :rating, :review
		json.author do
		  json.extract! rating.author, :photo_url, :name
		end
	end
	