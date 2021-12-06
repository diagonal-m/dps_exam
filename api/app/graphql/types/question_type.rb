module Types
  class QuestionType < Types::BaseObject
    field :id, ID, null: false
    field :question, String, null: false
    field :consecutive, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  
    field :alternatives, [Types::AlternativeType], null: false
    def alternatives
      object.alternatives
    end

    field :random_alternatives, [Types::AlternativeType], null: false
    def random_alternatives
      object.alternatives.shuffle
    end
  end
end
