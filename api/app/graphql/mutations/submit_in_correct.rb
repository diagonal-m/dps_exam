module Mutations
  class SubmitInCorrect < BaseMutation
    field :consecutive, Integer, null: false

    argument :id, Integer, required: true

    def resolve(**args)
      question = Question.find(args[:id].to_i)
      question.update!(consecutive: 0)
      {
        consecutive: question.consecutive
      }
    end
  end
end
