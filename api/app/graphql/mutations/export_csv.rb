require 'csv'

module Mutations
  class ExportCsv < BaseMutation
    graphql_name 'ExportCsv'
    
    argument :csv, String

    field :result, Boolean, null: true

    def resolve(**args)
      export_csv_question
      export_csv_alternative
      export_csv_description
      {
        result: true
      }
    end

    def export_csv_question
      questions = Question.all
      csv_column_names = ["id","consecutive","question", "created_at", "updated_at"]
      CSV.open("question_data/question.csv", 'w') do |csv|
        csv << csv_column_names
        questions.each do |question|
          csv_column_values = [
            question.id,
            question.consecutive,
            question.question,
            question.created_at,
            question.updated_at
          ]
          csv << csv_column_values
        end
      end
    end

    def export_csv_alternative
      alternatives = Alternative.all
      csv_column_names = ["id","alternative","is_correct", "created_at", "updated_at", "question_id"]
      CSV.open("question_data/alternative.csv", 'w') do |csv|
        csv << csv_column_names
        alternatives.each do |alternative|
          csv_column_values = [
            alternative.id,
            alternative.alternative,
            alternative.is_correct,
            alternative.created_at,
            alternative.updated_at,
            alternative.question_id
          ]
          csv << csv_column_values
        end
      end
    end

    def export_csv_description
      descriptions = Description.all
      csv_column_names = ["id","description", "created_at", "updated_at", "alternative_id"]
      CSV.open("question_data/description.csv", 'w') do |csv|
        csv << csv_column_names
        descriptions.each do |description|
          csv_column_values = [
            description.id,
            description.description,
            description.created_at,
            description.updated_at,
            description.alternative_id
          ]
          csv << csv_column_values
        end
      end
    end
  end
end
