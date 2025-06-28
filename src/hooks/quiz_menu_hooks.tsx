import { useContext, useEffect, useState } from "react"
import { UserContext } from "../provider/user_context"
import axios from "axios"

function QuizMenuHooks() {

    const { user } = useContext(UserContext)

    const [history, setHistory] = useState([])

    useEffect(() => {
        getHistory()
    }, [])

    async function getHistory():Promise<void> {
        try {
            const response = axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?userId=${`user.userId`}`)
        }
        catch (err: any) {
            console.log(err)
        }
    }
}

export default QuizMenuHooks