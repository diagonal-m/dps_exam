module Mutations
  class CreateQuestion < BaseMutation
    graphql_name 'CreateQuestion'

    field :question, Types::QuestionType, null: false
    field :result, Boolean, null: true

    argument :question, String, required: true

    def resolve(**args)
      question = Question.create(question: args[:question])
      { 
        question: question,
        result: question.errors.blank?
      }
    end
  end
end
