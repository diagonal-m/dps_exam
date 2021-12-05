module Types
  class DescriptionType < Types::BaseObject
    field :id, ID, null: false
    field :description, String, null: true
    field :alternative_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
