class Meal < ActiveRecord::Base
  
  paginates_per 6
  
  belongs_to(
  :user,
  class_name: "User",
  primary_key: :id,
  foreign_key: :host_id
  )
  
  has_many :guest_meal_joins
  
  has_many(
  :guests,
  through: :guest_meal_joins,
  source: :guest
  )
  
  validates :title, :price, :max_guests, :tag, :host_id, :date, presence: true
end
