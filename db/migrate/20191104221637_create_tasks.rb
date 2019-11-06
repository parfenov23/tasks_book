class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.integer :creater_id
      t.string :title
      t.text :description
      t.datetime :deadline
      t.string :status

      t.timestamps
    end
  end
end
