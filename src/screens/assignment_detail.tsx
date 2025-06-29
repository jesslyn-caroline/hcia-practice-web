import { Link, Outlet } from "react-router"
import AssignmentDetailHooks from "../hooks/assignment_detail_hooks"

function AssignmentDetail() {

    const { assignmentId, currentActive, handleTabChange } = AssignmentDetailHooks()


    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-pencil-ruler-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Assignment Detail</h1>
            <div className={`flex flex-row mb-3 space-x-4`}>
                <Link to={`/assignment/${assignmentId}`} className={`${currentActive === 0? 'font-semibold' : ''}`} onClick={() => {handleTabChange(0)}} >
                    General
                </Link>
                <Link to={`/assignment/${assignmentId}/questions`} className={`${currentActive === 1? 'font-semibold' : ''}`} onClick={() => {handleTabChange(1)}}>
                    Questions
                </Link>
                <Link to={`/assignment/${assignmentId}/submissions`} className={`${currentActive === 2? 'font-semibold' : ''}`} onClick={() => {handleTabChange(2)}}>
                    Submissions
                </Link>
            </div>
            <hr className={`mb-6`}/>
            <Outlet />
        </div>
    )
}

export default AssignmentDetail