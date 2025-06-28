import { useContext, useEffect, useState } from "react";
import type { QuestionModel } from "../model/question_model";
import checkAnswer from "../func/check_answer";
import toast_success from "../components/toast/toast_success";
import { useNavigate } from "react-router";
import { UserContext } from "../provider/user_context";
import axios from "axios";


function OnQuizRegularHooks() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const quizData = JSON.parse(localStorage.getItem("quizData")!) || []

    const [timeLeft, setTimeLeft] = useState<number>(() => getTimeLeft())
    useEffect(() => {
        setInterval(() => 
            setTimeLeft(getTimeLeft())
        , 1000)
    }, [])

    const question:QuestionModel[] = quizData.question

    function getTimeLeft():number {

        const expectedEndTime = new Date(quizData.expectedEndTime)
        const currentTime = new Date()

        let seconds = Math.ceil((expectedEndTime.getTime() - currentTime.getTime()) / 1000)

        if (seconds == 0) {
            submit()
        }
        return seconds
    }

    const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
        return quizData.currentQuestion
    })
    const handleCurrentQuestionChange = (num:number) => {
        if (num < 0 || num >= question.length) return
        localStorage.setItem("quizData", JSON.stringify({...quizData, currentQuestion: num}))
        setCurrentQuestion(num)
    }

    const [isAnswerAttemptSelected, setIsAnswerAttemptSelected] = useState<boolean[][]>(() => {
        return quizData.isAnswerAttemptSelected
    })

    const [answerAttemptValue, setAnswerAttemptValue] = useState<string[][]>(() => {
        return quizData.answerAttemptValue
    })

    const handleCheckBoxAnswer = (index:number, e: React.ChangeEvent<HTMLInputElement>) => {
        let newIsAnswerAttemptSelected = [...isAnswerAttemptSelected]
        newIsAnswerAttemptSelected[currentQuestion][index] = e.target.checked
        setIsAnswerAttemptSelected(newIsAnswerAttemptSelected)

        localStorage.setItem("quizData", JSON.stringify({...quizData, isAnswerAttemptSelected: newIsAnswerAttemptSelected}))
    }

    const handleRadioAnswer = (index:number, e: React.ChangeEvent<HTMLInputElement>) => {
        let newIsAnswerAttemptSelected = [...isAnswerAttemptSelected]
        newIsAnswerAttemptSelected[currentQuestion] = [false, false, false, false]
        newIsAnswerAttemptSelected[currentQuestion][index] = e.target.checked
        setIsAnswerAttemptSelected(newIsAnswerAttemptSelected)

        localStorage.setItem("quizData", JSON.stringify({...quizData, isAnswerAttemptSelected: newIsAnswerAttemptSelected}))
    }

    const handleEssayAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newAnswerAttemptValue = [...answerAttemptValue]
        newAnswerAttemptValue[currentQuestion][0] = e.target.value
        setAnswerAttemptValue(newAnswerAttemptValue)

        localStorage.setItem("quizData", JSON.stringify({...quizData, answerAttemptValue: newAnswerAttemptValue}))
    }

    function submit():void {
        let score = 0

        for (let i = 0; i < question.length; i++) {
            let isCorrect:boolean = checkAnswer(question[i].answer, isAnswerAttemptSelected[i], question[i].options)
            if (question[i].type === "single-word-answer") isCorrect = answerAttemptValue[i][0].toLowerCase() === question[i].answer[0].toLowerCase()

            if (isCorrect) score += question[i].score
        }

       finalize(score)

        // localStorage.setItem("quizData", JSON.stringify({...quizData, score}))
    }

    async function finalize(score: number):Promise<void> {
        try {
            const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizData.quizId}`, {
                score,
                userId: user.userId
            })
            
            if (response.status === 200) {
                toast_success(response.data.message)
                localStorage.removeItem("quizData")
                navigate(`/quiz/result/${quizData.quizId}`)              
            }        
        } catch (err) {
            console.error(err)
        }
    }

    return {timeLeft, question, currentQuestion, answerAttemptValue, handleCurrentQuestionChange, isAnswerAttemptSelected, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer, submit}
}

export default OnQuizRegularHooks