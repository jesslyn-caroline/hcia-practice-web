import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { SubmissionModel } from "../model/submission_model"

function AssignmentSubmissionHooks() {

    const { assignmentId } = useParams()

    useEffect(() => {
        getSubmissions()
    }, [])

    const [submissions, setSubmissions] = useState<SubmissionModel[]>([])

    async function getSubmissions():Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?quizId=${assignmentId}`)

            if (response.status === 200) {
                setSubmissions(response.data)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    return { submissions }
}

export default AssignmentSubmissionHooks