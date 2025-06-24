import { useContext, useState } from "react"
import { OnQuizContext } from "../provider/on_quiz_context"
import { useNavigate } from "react-router"

function NewQuizHooks() {
    const navigate = useNavigate()

    const { loadQuestion } = useContext(OnQuizContext)

    const [numberOfQuestion, setNumberOfQuestion] = useState<number>(10)
    const handleNumberOfQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        if (count < 10 || count > 60) return
        setNumberOfQuestion(count)
    }

    const quizTypes  = ["regular", "fast"]
    const [quizType, setQuizType] = useState<number>(0)
    const handleQuizType = (num:number) => setQuizType(num)

    const [timePerQuestion, setTimePerQuestion] = useState<number>(10)
    const handleTimePerQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        if (count < 5 || count > 20) return
        setTimePerQuestion(count)
    }

    const [timeLimit, setTimeLimit] = useState<number>(10)
    const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        if (count < 5 || count > 20) return
        setTimeLimit(count)
    }

    function startQuiz():void {
        loadQuestion(numberOfQuestion)
        navigate('/quiz/ongoing')
    }

    return { numberOfQuestion, handleNumberOfQuestionChange, quizType, handleQuizType, timePerQuestion, handleTimePerQuestionChange, timeLimit, handleTimeLimitChange, startQuiz }
}  

export default NewQuizHooks