export const QuestionArea = (props: any) => {
  const question = props.question
  const alternatives = question.randomAlternatives
  const aiue: Array<string> = ["あ", "い", "う", "え"];

  return (
    <div style={{padding: "0.5em 1em", margin: "2em 0", border: "double 5px #4ec4d3", marginBottom: "0.5em"}}>
      <h2>{question.question}</h2>
      {alternatives.map((alternative: {id: string, alternative: string}, i: number) => (

          <li style={{listStyle: "none"}} key={alternative.id}>
            {`${aiue[i]}. ${alternative.alternative}`}
          </li>
        ))}
    </div>
  )
}