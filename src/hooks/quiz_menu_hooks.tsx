import { useContext, useEffect, useState } from "react"
import { UserContext } from "../provider/user_context"
import axios from "axios"


interface HistoryObj {
    _id: string,
    quizId: string,
    score: number,
    time: number,
    type: string,
    title: string
}

function QuizMenuHooks() {
    const { user } = useContext(UserContext)

    const [history, setHistory] = useState<HistoryObj[]>([])

    useEffect(() => {
        getHistory()
        getAssignments()
    }, [])

    async function getHistory():Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?userId=${user.userId}`)

            if (response.status === 200) {
                // setHistory(response.data)
                console.log(response.data)

                for (let i = 0; i < response.data.length; i++) {
                    const quiz = await getQuizInfo(response.data[i].quizId)
                    let quizObj:HistoryObj = {
                        title : quiz.title,
                        time : quiz.time,
                        type : quiz.type,
                        score : response.data[i].score,
                        _id : response.data[i]._id,
                        quizId : response.data[i].quizId
                    }
                    setHistory(prev => [...prev, quizObj])
                }
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    async function getQuizInfo(quizId: string):Promise<any> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizId}`)

            if (response.status === 200) {
                // console.log(response.data)
                return response.data.quiz
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    async function getAssignments():Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/assignment`)

            if (response.status === 200) {
                // console.log(response.data)
                return response.data.assignments
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    return {history, getQuizInfo}
}

export default QuizMenuHooks