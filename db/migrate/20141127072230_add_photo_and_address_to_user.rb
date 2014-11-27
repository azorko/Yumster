class AddPhotoAndAddressToUser < ActiveRecord::Migration
  def change
    add_column :users, :address, :text
    add_column :users, :photo_url, :text
  end
end
