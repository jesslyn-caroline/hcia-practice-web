import { useState, createContext, useContext, useEffect } from "react"
import axios from "axios"

import { ErrorMessageContext } from "./error_message_context"
import toast_success from "../components/toast/toast_success"
import toast_error from "../components/toast/toast_error"
import { UserContext } from "./user_context"
import { useNavigate, useParams } from "react-router"
import { QuestionListContext } from "./question_list_context"
import type { QuestionModel } from "../model/question_model"

export const EditQuestionContext = createContext({
    year : "",
    typeOptions: ["", "", "", ""],
    type : "",
    score : 0,
    question : "",
    optionsValue : ["", "", "", ""],
    isOptionsSelected : [false, false, false, false],
    isOnLoad : false,

    handleTypeChange : (e: React.ChangeEvent<HTMLSelectElement>) => { console.log(e.target.value) },
    handleYearChange : (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleScoreChange : (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleQuestionChange : (e: React.ChangeEvent<HTMLTextAreaElement>) => { console.log(e.target.value) },
    handleOptionValueChange : (index:number, e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value, index) },
    handleIsOptionsSelectedChange : (index:number, e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value, index) },

    saveQuestion: () => { console.log("save") },
    clearInputs: () => { console.log("clearInputs") }
})



function EditQuestionProvider ({children} : {children : React.ReactNode}) {

    const params = useParams()
    const navigate = useNavigate()

    const { setQuestionErrMessage, setYearErrMessage, setScoreErrMessage, setOptionsErrMessage, setNoAnswerErrMessage, resetErrMessage } = useContext(ErrorMessageContext)
    const { setIsOnLoadEdit } = useContext(QuestionListContext)
    const { currentActiveRoute } = useContext(UserContext)

    const typeOptions: string[] = ["multiple-answer-multiple-choice", "single-answer-multiple-choice", "true-or-false", "single-word-answer"]
    const [type, setType] = useState<string>("multiple-answer-multiple-choice")
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value)

        // reset options value and isSelected
        setOptionsValue(["", "", "", ""])
        setIsOptionsSelected([false, false, false, false])
        resetErrMessage()

        if (e.target.value === "single-word-answer") setIsOptionsSelected([true, false, false, false])
        
        if (e.target.value === "true-or-false") setOptionsValue(["True", "False", "", ""])
    }

    const date = new Date()
    const [year, setYear] = useState<string>(date.getFullYear().toString())
    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>):void => setYear(e.target.value)
    function yearValidation ():boolean {
        let valid:boolean = true

        if (year === "") {
            setYearErrMessage("Please fill the year")
            valid = false
        }
        else if (year.length !== 4) {
            setYearErrMessage("Please enter valid year")
            valid = false
        }
        else if (year[0].toUpperCase() !== year[0].toLowerCase() ||
            year[1].toUpperCase() !== year[1].toLowerCase() ||
            year[2].toUpperCase() !== year[2].toLowerCase() ||
            year[3].toUpperCase() !== year[3].toLowerCase()) {
            setYearErrMessage("Year must be a number")
            valid = false
        }
        else setYearErrMessage("")

        return valid
    }

    const [score, setScore] = useState<number>()
    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>):void => setScore(parseInt(e.target.value))
    function scoreValidation ():boolean {
        let valid:boolean = true

        if (isNaN(score!) || score === undefined) {
            setScoreErrMessage("Please fill the score")
            valid = false
        }
        else if (score < 0) {
            setScoreErrMessage("Score may not be negative")
            valid = false
        }
        else setScoreErrMessage("")

        return valid
    }

    const [question, setQuestion] = useState<string>("")
    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>):void => setQuestion(e.target.value)
    function questionValidation ():boolean {
        let valid:boolean = true

        if (question === "") {
            setQuestionErrMessage("Please fill the question")
            valid = false
        }
        else setQuestionErrMessage("")

        return valid
    }
    
    const [optionsValue, setOptionsValue] = useState<string[]>(["", "", "", ""])
    const handleOptionValueChange = (index:number, e: React.ChangeEvent<HTMLInputElement>):void => {
        let newOptionsValue = [...optionsValue]
        newOptionsValue[index] = e.target.value

        setOptionsValue(newOptionsValue)
    }


    const [isOptionsSelected, setIsOptionsSelected] = useState<boolean[]>([false, false, false, false])

    // only for multiple-answer-multiple-choice && single-answer-multiple-choice && true-or-false
    // bcs single-word-answer has only one option
    const handleIsOptionsSelectedChange = (index:number, e: React.ChangeEvent<HTMLInputElement>):void => {
        let newIsOptionsSelected = [...isOptionsSelected]

        if (type === "multiple-answer-multiple-choice") {
            newIsOptionsSelected[index] = e.target.checked
        }
        else {
            for (let i = 0; i < 4; i++) {
                if (i === index) newIsOptionsSelected[i] = true
                else newIsOptionsSelected[i] = false
            }
        }

        setIsOptionsSelected(newIsOptionsSelected)
    }
    function optionValidation ():boolean {
        let valid:boolean = true

        let optionsErrMessage:string[] = ["", "", "", ""]
        let isNoAnswer = true

        if (type === "single-word-answer") {
            isNoAnswer = false
            if (optionsValue[0] === "") {
                optionsErrMessage[0] = "Please enter the question"
                valid = false
            }
            else optionsErrMessage[0] = ""
        }
        else if (type === "true-or-false") {
            if (!isOptionsSelected[0] && !isOptionsSelected[1]) {
                isNoAnswer = true
                valid = false
            }
            else isNoAnswer = false
        }
        else {
            for (let i = 0; i < 4; i++) {
                if (optionsValue[i] === "") {
                    optionsErrMessage[i] = "Please fill the option"
                    valid = false
                }
                else optionsErrMessage[i] = ""
    
                if (isOptionsSelected[i]) isNoAnswer = false
            }
        }

        setOptionsErrMessage(optionsErrMessage)

        if (isNoAnswer) {
            setNoAnswerErrMessage("Please select the answer")
            valid = false
        }
        else setNoAnswerErrMessage("")

        return valid
    }

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    async function saveQuestion() {
        let yearValid:boolean = yearValidation()
        let scoreValid:boolean = scoreValidation()
        let questionValid:boolean = questionValidation()
        let optionValid:boolean = optionValidation()

        if (!yearValid || !scoreValid || !questionValid || !optionValid) return

        setIsOnLoad(true)
        setIsOnLoadEdit(true)

        let answer:string[] = []

        for (let i = 0; i < 4; i++) {
            if (isOptionsSelected[i]) answer.push(optionsValue[i])
        }

        try {
            const response = await axios.put(`https://huawei-practice-web-backend.vercel.app/api/question/${params.id}`, 
                {question, year: parseInt(year), type, score, answer, options: optionsValue}
            )
            
            if (response.status === 200) {
                toast_success(response.data.message)
                navigate(`/question`)
            }
        }
        catch (err: any) {
            toast_error(err.response.data.message)
        }

        setIsOnLoad(false)
        setIsOnLoadEdit(false)
    }

    const clearInputs = () => {
        setYear(date.getFullYear().toString())
        setType("multiple-answer-multiple-choice")
        setScore(0)
        setQuestion("")
        setOptionsValue(["", "", "", ""])
        setIsOptionsSelected([false, false, false, false])
    }

    useEffect(() => {
        clearInputs()
    }, [currentActiveRoute])

    async function getQuestion() {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/question/${params.id}`)
            
            if (response.status === 200) {
                const question:QuestionModel = response.data
                setYear(question.year.toString())
                setType(question.type)
                setScore(question.score)
                setQuestion(question.question)
                setOptionsValue(question.options)

                let selectedOption = [false, false, false, false]
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < question.answer.length; j++) {
                        if (question.options[i] === question.answer[j]) {
                            selectedOption[i] = true
                        }
                    }
                }
                setIsOptionsSelected(selectedOption)
            }
        }
        catch (err: any) {console.log(params.id)
            toast_error(err.response.data.message)
        }
    }

    useEffect(() => {
        getQuestion()
    }, [params])

    return (
        <EditQuestionContext.Provider value={{year, typeOptions, type, score: score !== undefined ? score : 0, question, optionsValue, isOptionsSelected, isOnLoad, handleTypeChange, handleYearChange, handleScoreChange, handleQuestionChange, handleOptionValueChange, handleIsOptionsSelectedChange, saveQuestion, clearInputs}}>
            { children }
        </EditQuestionContext.Provider>
    )
}

export default EditQuestionProvider