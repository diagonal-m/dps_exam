class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.text :question, null: false, comment: '問題文文字列'
      t.integer :consecutive, default: 0, comment: '何回連続で正解しているか'

      t.timestamps
    end
  end
end
