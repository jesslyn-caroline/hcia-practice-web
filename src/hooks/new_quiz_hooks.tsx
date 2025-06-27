import { useState } from "react"

import { useNavigate } from "react-router"
import toast_error from "../components/toast/toast_error"
import axios from "axios"
import type { QuestionModel } from "../model/question_model"

function NewQuizHooks() {
    const navigate = useNavigate()

    const [questionCount, setQuestionCount] = useState<number>(10)
    const handleQuestionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        // if (count < 10 || count > 60) return
        setQuestionCount(count)
    }

    const quizTypes  = ["regular", "flash"]
    const [quizType, setQuizType] = useState<number>(0)
    const handleQuizType = (num:number) => setQuizType(num)

    const [timePerQuestion, setTimePerQuestion] = useState<number>(10)
    const handleTimePerQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        // if (count < 5 || count > 20) return
        setTimePerQuestion(count)
    }

    const [timeLimit, setTimeLimit] = useState<number>(60) // minutes
    const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        // if (count < 60) return
        setTimeLimit(count)
    }

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    async function startQuiz():Promise<void> {
        setIsOnLoad(true)

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/quiz", {
                title: "Hello",
                questionCount,
                type: quizTypes[quizType],
                time: timeLimit
            })

            if (response.status === 201) {
                let time: number
                const miliseconds = 1000;

                if (quizType === 1) time = timePerQuestion * questionCount * miliseconds
                else time = timeLimit * 60 * miliseconds
  
                let isAnswerAttemptSelected: boolean[][] = [
                    ...response.data.quiz.questions.map((value : QuestionModel) => {
                        return (value.type === "single-word-answer") ? [true, false, false, false] : [false, false, false, false]
                    })
                ]

                let answerAttemptValue: string[][] = [
                    ...response.data.quiz.questions.map((value : QuestionModel) => {
                        return (value.type === "single-word-answer") ? [""] : []
                    })
                ]

                if (quizType === 0) {
                    let quizData: {
                        question: QuestionModel[],
                        startTime: Date,
                        expectedEndTime: Date,
                        quizTypes: string,
                        isAnswerAttemptSelected: boolean[][]
                        answerAttemptValue: string[][],
                        currentQuestion: number,
                    } = {
                        question: response.data.quiz.questions,
                        startTime: new Date(),
                        expectedEndTime: new Date(new Date().getTime() + time),
                        quizTypes: quizTypes[quizType],
                        isAnswerAttemptSelected: isAnswerAttemptSelected,
                        answerAttemptValue: answerAttemptValue,
                        currentQuestion: 0,
                    }

                    localStorage.setItem("quizData", JSON.stringify(quizData))

                    navigate(`/quiz/regular/ongoing`)
                }
                else {
                    let quizData: {
                        question: QuestionModel[],
                        startTime: Date,
                        timePerQuestion: number,
                        lowerBoundQuizTime: Date,
                        quizTypes: string,
                        isAnswerAttemptSelected: boolean[][],
                        answerAttemptValue: string[][],
                        currentQuestion: number,
                        score: number
                    } = {
                        question: response.data.quiz.questions,
                        startTime: new Date(),
                        timePerQuestion: timePerQuestion,
                        lowerBoundQuizTime: new Date(),
                        quizTypes: quizTypes[quizType],
                        isAnswerAttemptSelected: isAnswerAttemptSelected,
                        answerAttemptValue: answerAttemptValue,
                        currentQuestion: 0,
                        score: 0
                    }

                    localStorage.setItem("quizData", JSON.stringify(quizData))

                    navigate(`/quiz/flash/ongoing`)
                }
            }
        }
        catch (err: any) {
            toast_error(err.message)
        }

        setIsOnLoad(false)
    }

    return { questionCount, handleQuestionCountChange, quizType, handleQuizType, timePerQuestion, handleTimePerQuestionChange, timeLimit, handleTimeLimitChange, startQuiz, isOnLoad }
}  

export default NewQuizHooks