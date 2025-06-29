import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import type { AssignmentModel } from "../model/assignment_model"

function AssignmentMenuHooks() {

    const navigate = useNavigate()

    const [assignments, setAssignment] = useState<AssignmentModel[]>([])

    useEffect(() => {
        getAssignments()
    }, [])

    async function getAssignments():Promise<void> {
        try {
            const response = await axios.get("https://huawei-practice-web-backend.vercel.app/api/assignment")

            if (response.status === 200) {
                setAssignment(response.data.reverse())
            }
        }
        catch (err:any) {
            console.log(err)
        }
    }

    function newAssignment() {
        navigate("/assignment/new")
    }

    return {newAssignment, assignments}
}

export default AssignmentMenuHooks