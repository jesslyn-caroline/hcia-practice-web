import AssignmentDetailHooks from "../hooks/assignment_detail_hooks"

function AssignmentDetailInfo() {

    const {assignment} = AssignmentDetailHooks()

    return (
        <div className={`space-y-4`}>
            <h1 className={`text-md font-semibold`}>{assignment.title}</h1>
            <div>
                <h2>
                    <span className={`font-medium`}>Quiz Type: </span>
                    <span className={`capitalize`}>{assignment.type}</span>
                </h2>
                <h2>{assignment.questions.length} questions</h2>
                <h2>{assignment.type === "regular"? `${assignment.time} minutes` : `${assignment.time} seconds per question`}</h2>
            </div>
        </div>
    )
}

export default AssignmentDetailInfo