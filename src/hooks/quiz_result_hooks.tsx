import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { UserContext } from "../provider/user_context"
import type { QuestionModel } from "../model/question_model"

function QuizResultHooks() {

    const { quizId } = useParams()
    const { user } = useContext(UserContext)

    useEffect(() => {
        getHistory()
        getQuizInfo()
    }, [])

    const [score, setScore] = useState<number>(0)
    const [questions, setQuestions] = useState<QuestionModel[]>([])

    async function getHistory():Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?quizId=${quizId}&userId=${user.userId}`)

            if (response.status === 200) {
                setScore(response.data[0].score)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    async function getQuizInfo():Promise<any> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizId}`)

            if (response.status === 200) {
                // console.log(response.data)
                setQuestions(response.data.quiz.questions)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    return { quizId, score, questions }
}

export default QuizResultHooks