import styled from "styled-components";

const TAG_STYLE = styled.p`
  display: inline-block;
  margin: 0 .1em .6em 0;
  padding: .6em;
  line-height: 1;
  text-decoration: none;
  color: #0000ee;
  background-color: #fff;
  border: 1px solid #0000ee;
  margin-bottom: 0em;
`

export const QuestionArea = (props: any) => {
  const question = props.question
  const alternatives = question.randomAlternatives
  const aiue: Array<string> = ["あ", "い", "う", "え"];

  return (
    <div style={{padding: "0.5em 1em", margin: "2em 0", border: "double 5px #4ec4d3", marginBottom: "0.5em"}}>
      <TAG_STYLE>{`question id: ${question.id}`}</TAG_STYLE>
      <h2>{question.question}</h2>
      <p>{`${question.consecutive} 回連続正解中`}</p>
      {alternatives.map((alternative: {id: string, alternative: string}, i: number) => (

          <li style={{listStyle: "none"}} key={alternative.id}>
            {`${aiue[i]}. ${alternative.alternative}`}
          </li>
        ))}
    </div>
  )
}