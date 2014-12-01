class Rating < ActiveRecord::Base
  
  belongs_to(
  :host,
  class_name: "User",
  primary_key: :id,
  foreign_key: :host_id
  )
  
  belongs_to(
  :author,
  class_name: "User",
  primary_key: :id,
  foreign_key: :author_id
  )
  
  validates :rating, :review, :host_id, :author_id, presence: true
  
end
