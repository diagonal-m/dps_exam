module Mutations
  class CreateQuestion < BaseMutation
    graphql_name 'CreateQuestion'

    field :question, Types::QuestionType, null: false
    field :result, Boolean, null: true

    argument :question, String, required: true
    argument :alternatives, [String]
    argument :descriptions, [String]

    def resolve(**args)
      question = Question.create!(question: args[:question])
      
      args[:alternatives].zip(args[:descriptions]).each_with_index { |(alternative_text, description_text), index|
        alternative = question.alternatives.create!(
          alternative: alternative_text, 
          is_correct: index.zero?
        )
        alternative.create_description!(description: description_text)
      }
      { 
        question: question,
        result: question.errors.blank?
      }
    end
  end
end
