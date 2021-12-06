# == Schema Information
#
# Table name: alternatives
#
#  id                       :bigint           not null, primary key
#  alternative(選択肢)      :text(65535)      not null
#  is_correct(正解かどうか) :boolean          not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  question_id              :bigint           not null
#
# Indexes
#
#  index_alternatives_on_question_id  (question_id)
#
# Foreign Keys
#
#  fk_rails_...  (question_id => questions.id)
#
class Alternative < ApplicationRecord
  validates :alternative, presence: true

  has_one :description, dependent: :destroy
  belongs_to :question
end
