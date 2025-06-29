import QuizResultHooks from "../hooks/quiz_result_hooks"

function QuizResult() {

    const { quizId } = QuizResultHooks()

    return(
        <div>
            <div className={`flex flex-col`}>
                {/* <i className={`text-4xl ri-list-check-2 mb-2`}/> */}
                <h1 className={`text-xl font-semibold`}>Question Result</h1>
                <h2 className={`text-gray-400 font-semibold`}>{ quizId }</h2>
                {/* <h3>Score: {score}</h3>
                <h3>Type: {type}</h3> */}
            </div>
        </div>
    )
}

export default QuizResult