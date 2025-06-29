import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { AssignmentModel } from "../model/assignment_model"

function AssignmentDetailHooks() {

    const { assignmentId } = useParams()

    const [assignment, setAssignment] = useState<AssignmentModel>({
        _id: "",
        type: "",
        time: 0,
        title: "",
        questions: []
    })

    useEffect(() => {
        getAssignmentDetail()
    }, [])

    async function getAssignmentDetail(): Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz/${assignmentId}`)

            if (response.status === 200) {
                setAssignment(response.data.quiz)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    const [currentActive, setCurrentActive] = useState<number>(0)
    const handleTabChange = (index: number) => setCurrentActive(index)

    async function getSubmission():Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?quizId=${assignmentId}`)

            if (response.status === 200) {
                setAssignment(response.data.quiz)

            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    return { assignmentId, assignment , currentActive, handleTabChange}
}

export default AssignmentDetailHooks