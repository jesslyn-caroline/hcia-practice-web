import axios from "axios"
import type { AssignmentModel } from "../model/assignment_model"
import { useState } from "react"

function ClassAssignmentHooks() {

    const [assignments, setAssignment] = useState<AssignmentModel[]>([])
    
    async function getAssignment():Promise<void> {
        try {
            const response = await axios.get("https://huawei-practice-web-backend.vercel.app/api/assignment")

            if (response.status === 200) {
                console.log(response.data)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    return {assignments}
}

export default ClassAssignmentHooks