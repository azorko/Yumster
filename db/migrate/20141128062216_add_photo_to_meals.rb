class AddPhotoToMeals < ActiveRecord::Migration
  def change
    add_column :meals, :photo_url, :text
  end
end
