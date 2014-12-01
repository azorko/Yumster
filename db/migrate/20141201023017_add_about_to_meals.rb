class AddAboutToMeals < ActiveRecord::Migration
  def change
    add_column :meals, :about, :text
  end
end
