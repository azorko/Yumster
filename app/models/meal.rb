class Meal < ActiveRecord::Base
  
  belongs_to(
  :user,
  class_name: "User",
  primary_key: :id,
  foreign_key: :host_id
  )
  
  validates :title, :price, :max_guests, :tag, :host_id, :date, presence: true
end
