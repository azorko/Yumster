class CreateGuestMealJoins < ActiveRecord::Migration
  def change
    create_table :guest_meal_joins do |t|
      t.integer :meal_id
      t.integer :guest_id

      t.timestamps
    end
  end
end
