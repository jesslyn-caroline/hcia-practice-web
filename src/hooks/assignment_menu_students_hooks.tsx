import { useContext, useEffect, useState } from "react"
import type { AssignmentModel } from "../model/assignment_model"
import axios from "axios"
import { UserContext } from "../provider/user_context"

function AssignmentMenuStudentsHooks() {
    // const navigate = useNavigate()

    const { user } = useContext(UserContext)

    const [unfinishedAssignments, setUnfinishedAssignment] = useState<AssignmentModel[]>([])
    const [finishedAssignments, setFinishedAssignment] = useState<AssignmentModel[]>([])

    useEffect(() => {
        getAssignments()
    }, [])

    async function getAssignments():Promise<void> {
        try {
            const response1 = await axios.get("https://huawei-practice-web-backend.vercel.app/api/assignment")
            const response2 = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?userId=${user.userId}`)

            if (response1.status === 200 && response2.status === 200) {
                let finishedAssignmentId:string[] = []
                let unfinishedAssignmentId:string[] = []

                let finishedAssignments:AssignmentModel[] = []
                let unfinishedAssignments:AssignmentModel[] = []

                response2.data.forEach((quiz: any) => {
                    finishedAssignmentId.push(quiz.quizId)
                })

                response1.data.forEach((quiz: any) => {
                    if (!finishedAssignmentId.includes(quiz._id)) {
                        unfinishedAssignmentId.push(quiz)
                        unfinishedAssignments.push(quiz)
                    }
                    else {
                        finishedAssignments.push(quiz)
                    }
                })
                
                setFinishedAssignment(finishedAssignments)
                setUnfinishedAssignment(unfinishedAssignments)
            }
        }
        catch (err:any) {
            console.log(err)
        }
    }

    return { unfinishedAssignments, finishedAssignments}
}

export default AssignmentMenuStudentsHooks