import ActionButton from "../components/action_button"
import AssignmentStartHooks from "../hooks/assignment_start_hooks"

function AssignmentStart () {

    const {assignment, startQuiz} = AssignmentStartHooks()

    return (
        <div className={`space-y-4`}>
            <h1 className={`text-md font-semibold`}>{assignment.title}</h1>
            <div>
                <h2>
                    <span className={`font-medium`}>Quiz Type: </span>
                    <span className={`capitalize`}>{assignment.type}</span>
                </h2>
                <h2>Number of questions: {assignment.questions.length}</h2>
                <h2>{assignment.type === "regular"? `${assignment.time} minutes` : `${assignment.time} seconds per question`}</h2>
                <div className={`mt-10 flex flex-col text-gray-400`}>
                    <div className={`flex flex-row items-center space-x-2`}>
                        <i className={`text-2xl ri-pushpin-fill`}/>
                        <span className={`font-semibold`}>Note!</span>
                    </div>
                    <span>
                        The timer will still run even if you leave the page.
                    </span>
                    <span>
                        Your answers will be saved automatically.
                    </span>
                </div>
                <div className={`mt-6`}>
                    <ActionButton action={startQuiz} text="Start Quiz" icon="" isOnLoad={false} /> 
                </div>
            </div>
        </div>
    )
}

export default AssignmentStart