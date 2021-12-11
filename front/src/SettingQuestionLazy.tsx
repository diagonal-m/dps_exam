import { useQuery, useLazyQuery, useMutation, ApolloError } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useState } from "react";
import styled from "styled-components";

import { QuestionArea } from "./components/QuestionArea";

const GET_QUESTION = gql`
  {
    settingQuestion{
      id
      question
      consecutive
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
const SUBMIT_CORRECT = gql`
    mutation submitCorrect($id: Int!) {
      submitCorrect(input: {id: $id}) {
        consecutive
      }
    }
`

const SUBMIT_IN_CORRECT = gql`
    mutation submitInCorrect($id: Int!) {
      submitInCorrect(input: {id: $id}) {
        consecutive
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
  const [submitCurrect] = useMutation(SUBMIT_CORRECT);
  const [submitInCurrect] = useMutation(SUBMIT_IN_CORRECT);
  const LoadQuestionButton = props.load_button
  const loadQuestion = props.load_question

  if (props.question === null) return <div></div>
  const question = data.settingQuestion
  const alternatives = question.randomAlternatives

  const ansOff: any = () => {
    if (isAnswer) {setIsAnswer(false)}
  }

  const onClickAnsButton = () => {
    setIsAnswer(!isAnswer)
  }

  const GetAnswer = (props: any) => {
    const aiue: Array<string> = ["あ", "い", "う", "え"];

    const ansIndex = props.alts.findIndex((alt: any) => {
      return alt.isCorrect
    })
    return (
      <h3>{`正解: (${aiue[ansIndex]}) ${props.alts[ansIndex].alternative}`}</h3>
    )
  }

  const GetDescription = (props: any) => {
    const aiue: Array<string> = ["あ", "い", "う", "え"];

    return (
      <div>
        {props.alts.map((alt: any, i: number) => (
          <div key={alt.alternative.id}>
            <div style={{fontWeight: "bold"}}>{`${aiue[i]}. ${alt.alternative}`}</div>
            <p style={{marginTop: "0em"}}>{alt.description.description}</p>
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
      <LoadQuestionButton isAns={isAnswer} isSetAns={setIsAnswer}>次の問題</LoadQuestionButton>
      <SButton onClick={
        () => {submitCurrect({variables: {id: Number(question.id)}}); loadQuestion(); ansOff()}
        }>正解</SButton>
      <SButton onClick={
        () => {submitInCurrect({variables: {id: Number(question.id)}}); loadQuestion(); ansOff()}
        }>不正解</SButton>
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
    const isAnswer = props.isAns
    const isSetAnswer = props.isSetAns

    const ansOff: any = () => {
      if (isAnswer) {isSetAnswer(false)}
    }

    return <SButton onClick={() => {loadQuestion(); ansOff();}}>{props.children}</SButton>
  }

  return (
    <>
      { data ? <></> : <LoadQuestionButton>問題</LoadQuestionButton>}
      <QuestionPage question={questionData} load_button={LoadQuestionButton} load_question={loadQuestion}/>
    </>
  )
}