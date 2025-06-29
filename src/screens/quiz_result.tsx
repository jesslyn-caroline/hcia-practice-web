import QuestionCard from "../components/question_card"
import QuizResultHooks from "../hooks/quiz_result_hooks"

function QuizResult() {

    const { score, questions } = QuizResultHooks()

    return(
        <div>
            <div className={`flex flex-col space-y-3`}>
                <i className={`text-4xl ri-list-check-2`}/>
                <h1 className={`text-xl font-semibold`}>Question Result</h1>
                <h3><span className={`font-semibold`}>Score:</span> {score}</h3>
                <h3 className={`font-semibold`}>Questions and the correct answer</h3>
                <div>
                {
                    ...questions.map((question, index) => {
                        return (
                            <div className={`space-y-1`}>
                                <h1 className={`text-md font-semibold`}>Question {index + 1}</h1>
                                <QuestionCard question={question.question} answer={question.answer} options={question.options} type={question.type} id={question._id} /> 
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default QuizResult