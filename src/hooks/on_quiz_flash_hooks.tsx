import { useContext, useEffect,  useState } from "react";
import type { QuestionModel } from "../model/question_model";
import checkAnswer from "../func/check_answer";
import axios from "axios";
import { UserContext } from "../provider/user_context";
import { useNavigate } from "react-router";
import toast_success from "../components/toast/toast_success";


function OnQuizFlashHooks() {
    
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const question:QuestionModel[] = JSON.parse(localStorage.getItem("quizData")!).question

    const [timeToNext, setTimeToNext] = useState<number>(() => {
        return getTimeToNext()
    })

    const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        
        const startTime = new Date(quizData.startTime).getTime()
        const currentTime = new Date().getTime()
        const diff = Math.floor((currentTime - startTime) / 1000)
        const currentQuestion = Math.floor(diff / quizData.timePerQuestion)

        return Math.max(currentQuestion, quizData.currentQuestion)
    })


    function getTimeToNext():number {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)

        const lowerBound = new Date(quizData.lowerBoundQuizTime).getTime()
        let current = new Date().getTime()

        let diff = Math.floor((current - lowerBound) / 1000)
        const secondsLeft = quizData.timePerQuestion - (diff % quizData.timePerQuestion)
        localStorage.setItem("quizData", JSON.stringify({...quizData, timeToNext: secondsLeft}))

        return secondsLeft - 1
    }

    useEffect(() => {
        setInterval(() => {
            let time = getTimeToNext()
            setTimeToNext(time)
        }, 1000)
    }, [])

    useEffect(() => {
        if (timeToNext === 0) {
            if (currentQuestion === question.length - 1) {
                finalize()
                return
            }

            const quizData = JSON.parse(localStorage.getItem("quizData")!)

            let nextLowerBound = new Date(new Date(quizData.lowerBoundQuizTime).getTime() + quizData.timePerQuestion * 1000)
            localStorage.setItem("quizData", JSON.stringify({...quizData, lowerBoundQuizTime: nextLowerBound, currentQuestion: currentQuestion + 1}))
            setCurrentQuestion(JSON.parse(localStorage.getItem("quizData")!).currentQuestion)
        }
    }, [timeToNext])
 

    const [isAnswerAttemptSelected, setIsAnswerAttemptSelected] = useState<boolean[][]>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        return quizData.isAnswerAttemptSelected
    })

    const [answerAttemptValue, setAnswerAttemptValue] = useState<string[][]>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        return quizData.answerAttemptValue
    })

    const handleCheckBoxAnswer = (index:number, e: React.ChangeEvent<HTMLInputElement>) => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!) 
        let newIsAnswerAttemptSelected = [...isAnswerAttemptSelected]
        newIsAnswerAttemptSelected[currentQuestion][index] = e.target.checked
        setIsAnswerAttemptSelected(newIsAnswerAttemptSelected)

        localStorage.setItem("quizData", JSON.stringify({...quizData, isAnswerAttemptSelected: newIsAnswerAttemptSelected}))
    }

    const handleRadioAnswer = (index:number, e: React.ChangeEvent<HTMLInputElement>) => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)

        let newIsAnswerAttemptSelected = [...isAnswerAttemptSelected]
        newIsAnswerAttemptSelected[currentQuestion] = [false, false, false, false]
        newIsAnswerAttemptSelected[currentQuestion][index] = e.target.checked
        setIsAnswerAttemptSelected(newIsAnswerAttemptSelected)

        localStorage.setItem("quizData", JSON.stringify({...quizData, isAnswerAttemptSelected: newIsAnswerAttemptSelected}))
    }

    const handleEssayAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)

        let newAnswerAttemptValue = [...answerAttemptValue]
        newAnswerAttemptValue[currentQuestion][0] = e.target.value
        setAnswerAttemptValue(newAnswerAttemptValue)

        localStorage.setItem("quizData", JSON.stringify({...quizData, answerAttemptValue: newAnswerAttemptValue}))
    }

    const [score, setScore] = useState<number>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        return quizData.score
    })

    function submit() {

        const quizData = JSON.parse(localStorage.getItem("quizData")!)

        const current = new Date().getTime()
        const lowerBound = new Date(current - quizData.timePerQuestion * 1000)

        setTimeToNext(0)

        let isCorrect:boolean = checkAnswer(question[currentQuestion].answer, isAnswerAttemptSelected[currentQuestion], question[currentQuestion].options)
        if (question[currentQuestion].type === "single-word-answer") isCorrect = answerAttemptValue[currentQuestion][0].toLowerCase() === question[currentQuestion].answer[0].toLowerCase()

        if (isCorrect) {
            console.log(score)
            setScore(quizData.score + question[currentQuestion].score)
        }   
        localStorage.setItem("quizData", JSON.stringify({...quizData, lowerBoundQuizTime: lowerBound, 
            score: (isCorrect ? quizData.score + question[currentQuestion].score : quizData.score),
        }))

    }

    async function finalize():Promise<void> {
        const quizData = JSON.parse(localStorage.getItem("quizData")!) 

        try {
            const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizData.quizId}`, {
                score: quizData.score,
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

    return {currentQuestion, question, timeToNext, isAnswerAttemptSelected, answerAttemptValue, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer, score, submit}  
}

export default OnQuizFlashHooks