json.meals do
	json.array!(@meals) do |meal|
	  json.extract! meal, :id, :title, :price, :tag, :photo_url
	
		json.host do
		  host = meal.user
		  json.extract! host, :id, :name, :address, :photo_url
		end
	
	end
end

json.page page_number
json.total_pages total_pages