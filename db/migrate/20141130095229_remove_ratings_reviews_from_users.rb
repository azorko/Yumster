class RemoveRatingsReviewsFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :ratings
    remove_column :users, :reviews
  end
end
