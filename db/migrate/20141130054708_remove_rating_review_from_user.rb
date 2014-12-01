class RemoveRatingReviewFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :rating
    remove_column :users, :review
    add_column :users, :ratings, :integer, array: true
    add_column :users, :reviews, :text, array: true
  end
end
