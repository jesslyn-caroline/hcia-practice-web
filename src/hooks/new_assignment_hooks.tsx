import { useState } from "react"

import { useNavigate } from "react-router"
import toast_error from "../components/toast/toast_error"
import axios from "axios"
import type { QuestionModel } from "../model/question_model"
import toast_success from "../components/toast/toast_success"

function NewAssignmentHooks() {
    const navigate = useNavigate()

    const [assignmentTitle, setAssignmentTitle] = useState<string>("")
    const handleAssignmentTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAssignmentTitle(e.target.value)
    }

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

    async function createAssignment():Promise<void> {
        setIsOnLoad(true)

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/quiz", {
                title: assignmentTitle,
                questionCount,
                type: quizTypes[quizType],
                time: (quizType === 1) ? timePerQuestion : timeLimit
            })

            if (response.status === 201) {
                setAssignmentTitle("")
                setQuestionCount(10)
                setQuizType(0)
                setTimePerQuestion(10)
                setTimeLimit(60)
                toast_success("Assignment created successfully!")
            }
        }
        catch (err: any) {
            toast_error(err.message)
        }

        setIsOnLoad(false)
    }

    return { assignmentTitle, handleAssignmentTitleChange, questionCount, handleQuestionCountChange, quizType, handleQuizType, timePerQuestion, handleTimePerQuestionChange, timeLimit, handleTimeLimitChange, createAssignment, isOnLoad }
}  

export default NewAssignmentHooks