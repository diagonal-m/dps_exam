export const QuestionArea = (props: any) => {
  const question = props.question
  const alternatives = question.randomAlternatives

  return (
    <div style={{padding: "0.5em 1em", margin: "2em 0;", border: "double 5px #4ec4d3"}}>
      <p style={{fontWeight: "bold"}}>{question.question}</p>
      {alternatives.map((alternative: {id: string, alternative: string}) => (
          <li key={alternative.id}>
            {alternative.alternative}
          </li>
        ))}
    </div>
  )
}