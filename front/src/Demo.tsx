import type { FC } from 'react'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_QUESTIONS = gql`
{
  questions{
    id
    question
    consecutive
  }
}
`;

export const Demo: FC = ()=> {
  const {loading, error, data} = useQuery(GET_QUESTIONS);
  
  if (loading) return (
    <h2>ロード中....</h2>
  );
  if (error) return (
    <h2>{`Error ${error.message}`}</h2>
  );

  return (
    <>
      {data.questions.map((question: { id: string, question: string }) => (
        <div key={question.id}>
          <h1>{question.question}</h1>
        </div>
      ))}
    </>
  )
}