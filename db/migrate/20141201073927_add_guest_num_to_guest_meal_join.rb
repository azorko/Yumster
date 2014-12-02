class AddGuestNumToGuestMealJoin < ActiveRecord::Migration
  def change
    add_column :guest_meal_joins, :guest_num, :integer
  end
end
