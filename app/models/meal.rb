class Meal < ActiveRecord::Base
  
  belongs_to :user
  
  validates :title, :price, :max_guests, :tag, :host_id, :date, presence: true
end
