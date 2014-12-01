class AddAboutRatingReviewToUser < ActiveRecord::Migration
  def change
    add_column :users, :about, :text
    add_column :users, :rating, :integer
    add_column :users, :review, :text
  end
end
