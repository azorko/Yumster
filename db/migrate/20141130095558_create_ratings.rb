class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :author_id
      t.integer :host_id
      t.integer :rating
      t.text :review

      t.timestamps
    end
  end
end
