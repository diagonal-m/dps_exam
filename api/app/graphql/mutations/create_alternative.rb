module Mutations
  class CreateAlternative < BaseMutation
    graphql_name 'CreateAlternative'

    field :alternative, Types::AlternativeType, null: false
    field :result, Boolean, null: true

    argument :question_id, Integer, required: true
    argument :alternative, String, required: true
    argument :is_correct, Boolean, required: false

    def resolve(**args)
      question = Question.find(args[:question_id])
      alternative = question.alternatives.create!(alternative: args[:alternative], is_correct: args[:is_correct])
      { 
        alternative: alternative,
        result: alternative.errors.blank? 
      }
    end
  end
end
