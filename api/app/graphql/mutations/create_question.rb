module Mutations
  class CreateQuestion < BaseMutation
    graphql_name 'CreateQuestion'

    field :question, Types::QuestionType, null: false
    field :result, Boolean, null: true

    argument :question, String, required: true
    argument :alternatives, [String]

    def resolve(**args)
      question = Question.create!(question: args[:question])
      args[:alternatives].each_with_index { |alternative, index|
        question.alternatives.create!(
          alternative: alternative, 
          is_correct: index.zero?
        )
      }
      { 
        question: question,
        result: question.errors.blank?
      }
    end
  end
end
