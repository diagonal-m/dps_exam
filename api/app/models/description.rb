# == Schema Information
#
# Table name: descriptions
#
#  id                :bigint           not null, primary key
#  description(解説) :text(65535)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  alternative_id    :bigint           not null
#
# Indexes
#
#  index_descriptions_on_alternative_id  (alternative_id)
#
# Foreign Keys
#
#  fk_rails_...  (alternative_id => alternatives.id)
#
class Description < ApplicationRecord
  belongs_to :alternative
end
