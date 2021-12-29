module Types
  class MutationType < Types::BaseObject
    field :export_csv, mutation: Mutations::ExportCsv
    field :submit_in_correct, mutation: Mutations::SubmitInCorrect
    field :submit_correct, mutation: Mutations::SubmitCorrect
    field :create_alternative, mutation: Mutations::CreateAlternative
    field :create_question, mutation: Mutations::CreateQuestion
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
