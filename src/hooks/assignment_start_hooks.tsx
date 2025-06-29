import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { AssignmentModel } from "../model/assignment_model"
import type { QuestionModel } from "../model/question_model"

function AssignmentStartHooks() {

    const {assignmentId} = useParams()
    const navigate = useNavigate()

    const [assignment, setAssignment] = useState<AssignmentModel>({
        _id: "",
        type: "",
        time: 0,
        title: "",
        questions: []
    })

    useEffect(() => {
        getAssignmentDetail()
    }, [])

    async function getAssignmentDetail():Promise<void> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz/${assignmentId}`)

            if (response.status === 200) {
                console.log(response.data.quiz)
                setAssignment(response.data.quiz)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    function startQuiz() {
        let time: number = assignment.time
        const miliseconds = 1000;
        // console.log(response.data)

        if (assignment.type === "flash") time = assignment.time * assignment.questions.length * miliseconds
        else time = assignment.time * 60 * miliseconds

        let isAnswerAttemptSelected: boolean[][] = [
            ...assignment.questions.map((value : QuestionModel) => {
                return (value.type === "single-word-answer") ? [true, false, false, false] : [false, false, false, false]
            })
        ]

        let answerAttemptValue: string[][] = [
            ...assignment.questions.map((value : QuestionModel) => {
                return (value.type === "single-word-answer") ? [""] : []
            })
        ]

        if (assignment.type === "regular") {
            let quizData: {
                question: QuestionModel[],
                startTime: Date,
                expectedEndTime: Date,
                quizType: string,
                isAnswerAttemptSelected: boolean[][]
                answerAttemptValue: string[][],
                currentQuestion: number,
                quizId: string
            } = {
                question: assignment.questions,
                startTime: new Date(),
                expectedEndTime: new Date(new Date().getTime() + time),
                quizType: assignment.type,
                isAnswerAttemptSelected: isAnswerAttemptSelected,
                answerAttemptValue: answerAttemptValue,
                currentQuestion: 0,
                quizId: assignment._id
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
                quizType: string,
                isAnswerAttemptSelected: boolean[][],
                answerAttemptValue: string[][],
                currentQuestion: number,
                score: number,
                quizId: string
            } = {
                question: assignment.questions,
                startTime: new Date(),
                timePerQuestion: assignment.time,
                lowerBoundQuizTime: new Date(),
                quizType: assignment.type,
                isAnswerAttemptSelected: isAnswerAttemptSelected,
                answerAttemptValue: answerAttemptValue,
                currentQuestion: 0,
                score: 0,
                quizId: assignment._id
            }

            localStorage.setItem("quizData", JSON.stringify(quizData))

            navigate(`/quiz/flash/ongoing`)
        }
    }

    return {assignment, startQuiz}
}

export default AssignmentStartHooks