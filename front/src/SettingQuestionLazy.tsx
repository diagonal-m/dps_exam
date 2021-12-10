import { useQuery, useLazyQuery, ApolloError } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useState } from "react";
import styled from "styled-components";

import { QuestionArea } from "./components/QuestionArea";

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

const SButton = styled.button`
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;/*ボタン色*/
  color: #FFF;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
  cursor: pointer;
  &:active {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);/*下に動く*/
    border-bottom: none;/*線を消す*/
  }
`

const createQuestionData: any = (loading: boolean, error: ApolloError, data: any) => {
  // クエリ実行中の表示
  if (loading) return <p>Loading ...</p>;
  if (error) return <p style={{color: 'red'}}>{error.message}</p>;

  const question = data.settingQuestion;

  return question
}

const QuestionPage: any = (props: any) => {
  const [isAnswer, setIsAnswer] = useState(false)
  const {data} = useQuery(GET_QUESTION);
  const LoadQuestionButton = props.load_button

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
      <QuestionArea question={question} />
      <SButton onClick={onClickAnsButton}>答えを見る</SButton>
      <LoadQuestionButton>次の問題</LoadQuestionButton>
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

  const LoadQuestionButton: any = (props: any) => {
    return <SButton onClick={() => loadQuestion()}>{props.children}</SButton>
  }

  return (
    <>
      { data ? <></> : <LoadQuestionButton>問題</LoadQuestionButton>}
      <QuestionPage question={questionData} load_button={LoadQuestionButton}/>
    </>
  )
}