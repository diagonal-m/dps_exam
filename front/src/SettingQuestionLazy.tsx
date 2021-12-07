import { useQuery, useLazyQuery, ApolloError } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useState } from "react";

const GET_QUESTION = gql`
  {
    settingQuestion{
      id
      question
      randomAlternatives{
        id
        alternative
        isCorrect
        description{
          id
          description
        }
      }
    }
  }
`

// export const SettingQuestionLazy: any = () => {
//   const [loadQuestion, {called, loading, error, data}] = useLazyQuery(
//     GET_QUESTION
//   );
//   if (called && loading) {
//     return <h2>Loading...</h2>
//   }

//   if (!called) {
//     return <button onClick={() => loadQuestion()}>LOAD</button>
//   }

//   if (error) {
//     return error;
//   }

//   const question = <div>{data.settingQuestion.question}</div>

//   return (
//     <>
//     <h2>Question</h2>
//     <button onClick={() => loadQuestion()}>Load</button>
//     {question}
//     </>
//   )
// }

const createQuestionData: any = (loading: boolean, error: ApolloError, data: any) => {
  // クエリ実行中の表示
  if (loading) return <p>Loading ...</p>;
  if (error) return <p style={{color: 'red'}}>{error.message}</p>;

  const question = data.settingQuestion;

  return question
}

const QuestionArea: any = (props: any) => {
  const [isAnswer, setIsAnswer] = useState(false)
  const {data} = useQuery(GET_QUESTION);

  if (props.question === null) return <div></div>
  const question = data.settingQuestion
  const alternatives = question.randomAlternatives

  const onClickAnsButton = () => {
    setIsAnswer(!isAnswer)
  }

  const GetAnswer = (props: any) => {
    const ans = props.alts.filter((alt: any) => {
      return alt.isCorrect
    })
    return (
      <div>{`正解: ${ans[0].alternative}`}</div>
    )
  }

  const GetDescription = (props: any) => {
    return (
      <div>
        {props.alts.map((alt: any) => (
          <div key={alt.alternative.id}>
            <div>{alt.alternative}</div>
            <li>{alt.description.description}</li>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* 問題文 */}
      <h2>{`問題${question.id}`}</h2>
      <div>{question.question}</div>

      {/* 選択肢 */}
      {alternatives.map((alternative: {id: string, alternative: string}) => (
        <li key={alternative.id}>
          {alternative.alternative}
        </li>
      ))}

      <button onClick={onClickAnsButton}>{isAnswer ? '隠す' : '答えを見る'}</button>
      {
      isAnswer ? 
      <div>
        <GetAnswer alts={alternatives}/>
        <GetDescription alts={alternatives} /> 
      </div>
      :
      <div></div>
      }
    </>
  )
}

export const SettingQuestionLazy: React.FC = () => {
  const [loadQuestion, {called, loading, error, data}] = useLazyQuery(GET_QUESTION);
  const questionData = called ? createQuestionData(loading, error, data) : null;

  return (
    <>
      <QuestionArea question={questionData}/>
      <button onClick={() => loadQuestion()}>次の問題</button>
    </>
  )
}