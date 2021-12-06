class CreateDescriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :descriptions do |t|
      t.text :description, comment: '解説'
      t.references :alternative, null: false, foreign_key: true

      t.timestamps
    end
  end
end
