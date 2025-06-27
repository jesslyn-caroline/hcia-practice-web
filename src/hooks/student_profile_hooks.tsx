import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

function StudentProfileHooks() {
    
    const studentId = useParams()
    const [name, setName] = useState<string>("")

    async function getStudentInfo():Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/user/${studentId.id}`)

            if (response.status === 200) {
                setName(response.data.name)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    useEffect(() => {
        getStudentInfo()
    }, [])
    
    return {name, studentId}
}

export default StudentProfileHooks