class CreateMeals < ActiveRecord::Migration
  def change
    create_table :meals do |t|
      t.string :title
      t.decimal :price
      t.integer :max_guests
      t.string :tag
      t.integer :host_id

      t.timestamps
    end
  end
end
