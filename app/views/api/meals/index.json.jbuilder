json.array!(@meals) do |meal|
  json.extract! meal, :id, :title, :price, :max_guests, :tag, :host_id, :photo_url, :date, :created_at, :updated_at
	
	json.host do
	  host = meal.user
	  json.extract! host, :id, :name, :address, :photo_url
	end
end