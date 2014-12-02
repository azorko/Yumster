class GuestMealJoin < ActiveRecord::Base
  
  validates :guest_id, :meal_id, :guest_num, presence: true
  
  belongs_to(
  :guest,
  class_name: "User",
  primary_key: :id,
  foreign_key: :guest_id
  )
  
  belongs_to :meal
  
end
