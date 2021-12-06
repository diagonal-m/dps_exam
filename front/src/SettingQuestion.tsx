import { useState, FC } from 'react'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

export const SettingQuestion: FC = ()=> {
  const {loading, error, data} = useQuery(GET_QUESTION);
  const [isAnswer, setIsAnswer] = useState(false)

  if (loading) return (
    <h2>ロード中....</h2>
  );
  if (error) return (
    <h2>{`Error ${error.message}`}</h2>
  );
  
  const onClickAnsButton = () => {
    setIsAnswer(!isAnswer)
  }

  const onClickNextQuestion = () => {
    window.location.reload()
  }

  const question = data.settingQuestion
  const alternatives = question.randomAlternatives

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
      <h1>{`問題${question.id}`}</h1>
      <div>{question.question}</div>
      {alternatives.map((alternative: {id: string, alternative: string}) => (
        <li key={alternative.id}>
          {alternative.alternative}
        </li>
      ))}
      <button onClick={onClickAnsButton}>{isAnswer ? '隠す' : '答えを見る'}</button>
      <button onClick={onClickNextQuestion}>次の問題</button>
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
