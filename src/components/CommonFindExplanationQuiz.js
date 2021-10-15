import { useEffect, useState } from "react"
import { useTitle } from "react-use"
import { APP_NAME, FIND_EXPLANATION } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import FindExplanationQuizGenerator from "../service/FindExplanationQuizGenerator"
import FindExplanationQuiz from "./FindExplanationQuiz"

const CommonFindExplanationQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({
    paals: [],
    adhikarams: [],
    explanationAuthor: defaultExplanationAuthor
  })

  useTitle(`${FIND_EXPLANATION} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect - quiz")
    if (!quiz) {
      log(`filters: ${JSON.stringify(filters)}`)
      const { paals, adhikarams, explanationAuthor } = filters
      const quizGenerator = new FindExplanationQuizGenerator()
      const { kural, kuralNo } = quizGenerator.getKural(paals, adhikarams.map(adhikaram => adhikaram.name), explanationAuthor)
      log(`random kural: ${kuralNo} - ${kural}`)
      const explanations = quizGenerator.getExplanations()
      log(`random explanations: ${JSON.stringify(explanations)}`)
      const quiz = { kuralNo, kural, explanations }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
    }
    log("<<<<< side-effect - quiz")
  }, [quiz, filters])

  const handleFilterChange = (filters) => {
    setFilters(filters)
    setQuiz(null)
  }

  const handleNextQuiz = () => {
    setQuiz(null)
  }

  return (
    <FindExplanationQuiz
      heading={FIND_EXPLANATION}
      quiz={quiz}
      onFilterChange={handleFilterChange}
      onNextQuiz={handleNextQuiz}
    />
  )
}

export default CommonFindExplanationQuiz