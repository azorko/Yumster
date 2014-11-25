@meals do |meal|
  json.extract! meal, :id, :title, :price, :max_guests, :tag, :host_id, :created_at, :updated_at