import { Link } from "react-router"
import ActionButton from "../components/action_button"
import AssignmentCard from "../components/assignment_card"
import AssignmentMenuHooks from "../hooks/assignment_menu_hooks"
import { UserContext } from "../provider/user_context"
import { useContext } from "react"
import AssignmentMenuStudentsHooks from "../hooks/assignment_menu_students_hooks"

function AssignmentMenu() {

    const {newAssignment, assignments} = AssignmentMenuHooks()
    const { finishedAssignments, unfinishedAssignments } = AssignmentMenuStudentsHooks()

    const {user} = useContext(UserContext)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-pencil-ruler-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Assignment</h1>
            <div className={`${user.role === 'student'? 'hidden' : ''}`}>
                <ActionButton action={newAssignment} text="New Assignment" icon="ri-add-line" />
            </div>
            <div className={`${user.role === 'student'? '' : 'hidden'}`}>
                <div>
                    <h1 className={`text-md font-semibold my-6`}>Unfinished Assignments</h1>
                    <div className={`flex flex-col space-y-5`}>
                    {
                        ...unfinishedAssignments.map((value) => {
                            return (
                                <Link to={`/assignment/${value._id}`}>
                                    <AssignmentCard title={value.title} type={value.type} time={value.time} questionCount={0} />
                                </Link>
                            )
                        })
                    }
                    </div>
                </div>
                <div>
                    <h1 className={`text-md font-semibold my-6`}>Finished Assignments</h1>
                    <div className={`flex flex-col space-y-5`}>
                    {
                        ...finishedAssignments.map((value) => {
                            return (
                                <Link to={`/quiz/result/${value._id}`}>
                                    <AssignmentCard title={value.title} type={value.type} time={value.time} questionCount={0} />
                                </Link>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <div className={`${user.role === 'admin'? '' : 'hidden'}`}>
                <h1 className={`text-md font-semibold my-6`}>Assignments</h1>
                <div className={`flex flex-col space-y-5`}>
                {
                    ...assignments.map((value) => {
                        return (
                            <Link to={`/assignment/${value._id}`}>
                                <AssignmentCard title={value.title} type={value.type} time={value.time} questionCount={value.questions.length} />
                            </Link>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default AssignmentMenu