import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router"

function QuizResultHooks() {

    const { quizId } = useParams()

    useEffect(() => {
        getHistory()
    }, [])

    // const [score, setScore] = useState<number>(0)
    // const [type, setType] = useState<string>("")


    async function getHistory():Promise<void> {
        // console.log("hello")
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizId}`)

            if (response.status === 200) {
                console.log(response.data.quiz)
                // setScore(response.data.quiz.score)
                // setType(response.data.quiz.type)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    console.log(quizId)

    return { quizId }
}

export default QuizResultHooks