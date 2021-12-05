# == Schema Information
#
# Table name: questions
#
#  id                                    :bigint           not null, primary key
#  consecutive(何回連続で正解しているか) :integer          default(0)
#  question(問題文文字列)                :text(65535)      not null
#  created_at                            :datetime         not null
#  updated_at                            :datetime         not null
#
class Question < ApplicationRecord
  validates :question, presence: true

  has_many :alternatives, dependent: :destroy
end
