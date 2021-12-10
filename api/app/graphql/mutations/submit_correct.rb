module Mutations
  class SubmitCorrect < BaseMutation
    field :consecutive, Integer, null: false

    argument :id, Integer, required: true

    def resolve(**args)
      question = Question.find(args[:id].to_i)
      consecutive = question.consecutive
      question.update!(consecutive: consecutive + 1)
      {
        consecutive: question.consecutive
      }
    end
  end
end
