module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :questions, [Types::QuestionType], null: false
    def questions
      Question.all
    end

    field :question, Types::QuestionType, null: false do
      argument :id, Int, required: false
    end
    def question(id:)
      Question.find(id)
    end
  end
end
