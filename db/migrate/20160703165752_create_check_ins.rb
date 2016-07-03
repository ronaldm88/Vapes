class CreateCheckIns < ActiveRecord::Migration
  def change
    create_table :check_ins do |t|
      t.integer :user_id
      t.integer :beer_id
      t.integer :rating
      t.text    :comment

      t.timestamps null: false
    end
  end
end
