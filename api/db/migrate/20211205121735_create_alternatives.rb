class CreateAlternatives < ActiveRecord::Migration[6.0]
  def change
    create_table :alternatives do |t|
      t.text :alternative, null: false, comment: '選択肢'
      t.boolean :is_correct, null: false, default: false, comment: '正解かどうか'
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
