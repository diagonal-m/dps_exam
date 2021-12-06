module Types
  class AlternativeType < Types::BaseObject
    field :id, ID, null: false
    field :alternative, String, null: false
    field :is_correct, Boolean, null: false
    field :question_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :description, Types::DescriptionType, null: false
    def description
      object.description
    end
  end
end
