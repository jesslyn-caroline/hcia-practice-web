import QuestionCard from "../components/question_card"
import AssignmentDetailHooks from "../hooks/assignment_detail_hooks"

function AssignmentQuestions() {

    const { assignment } = AssignmentDetailHooks()
    // console.log(assignment.questions)

    return (
        <div>
        {
            ...assignment.questions.map((question, index) => {
                return (
                    <div className={`space-y-1`}>
                        <h1 className={`text-md font-semibold`}>Question {index + 1}</h1>
                        <QuestionCard question={question.question} answer={question.answer} options={question.options} type={question.type} id={question._id} /> 
                    </div>
                )
            })
        }
        </div>
    )
}

export default AssignmentQuestions