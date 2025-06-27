import { useEffect,  useState } from "react";
import type { QuestionModel } from "../model/question_model";
import checkAnswer from "../func/check_answer";


function OnQuizFlashHooks() {

    const quizData = JSON.parse(localStorage.getItem("quizData")!) || []

    const question:QuestionModel[] = quizData.question

    const [timeToNext, setTimeToNext] = useState<number>(() => {
        return getTimeToNext()
    })

    const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
      return quizData.currentQuestion
    })

    function getTimeToNext():number {
        const startTime = new Date(quizData.startTime).getTime()
        const current = new Date().getTime()

        const diff = Math.floor((current - startTime) / 1000)
        const secondsLeft = quizData.timePerQuestion - (diff % quizData.timePerQuestion)
        localStorage.setItem("quizData", JSON.stringify({...quizData, timeToNext: secondsLeft}))

        return secondsLeft - 1
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeToNext(getTimeToNext())
        }, 1000)
    
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (timeToNext === 0) {
            setCurrentQuestion((prev) => {
                if (prev === question.length - 1) {
                    localStorage.setItem("quizData", JSON.stringify({...quizData, currentQuestion: question.length - 1}))
                    return question.length - 1;
                }
                else {
                    localStorage.setItem("quizData", JSON.stringify({...quizData, currentQuestion: prev + 1}))
                    return prev + 1;
                }
            });
        }
    }, [timeToNext]);

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

    const [score, setScore] = useState<number>(0)

    function submit() {
        console.log(timeToNext)        


        let isCorrect:boolean = checkAnswer(question[currentQuestion].answer, isAnswerAttemptSelected[currentQuestion], question[currentQuestion].options)
        if (question[currentQuestion].type === "single-word-answer") isCorrect = answerAttemptValue[currentQuestion][0].toLowerCase() === question[currentQuestion].answer[0].toLowerCase()

        if (isCorrect) {
            setScore((prev) => {
              return prev + question[currentQuestion].score
            })
        }      
    }

    return {currentQuestion, question, timeToNext, isAnswerAttemptSelected, answerAttemptValue, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer, score, submit}  
}

export default OnQuizFlashHooks