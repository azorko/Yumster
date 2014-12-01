class ChangeMealPriceToInteger < ActiveRecord::Migration
  def change
    change_column :meals, :price, :integer
  end
end
