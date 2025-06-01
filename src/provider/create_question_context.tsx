import { useState, createContext, useContext, useEffect } from "react"
import axios from "axios"

import { ErrorMessageContext } from "./error_message_context"
import toast_success from "../components/toast/toast_success"
import toast_error from "../components/toast/toast_error"
import { UserContext } from "./user_context"

export const CreateQuestionContext = createContext({
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

function CreateQuestionProvider ({children} : {children : React.ReactNode}) {

    const { setQuestionErrMessage, setYearErrMessage, setScoreErrMessage, setOptionsErrMessage, setNoAnswerErrMessage } = useContext(ErrorMessageContext)
    const { currentActiveRoute } = useContext(UserContext)

    const typeOptions: string[] = ["multiple-answer-multiple-choice", "single-answer-multiple-choice", "true-or-false", "single-word-answer"]
    const [type, setType] = useState<string>("multiple-answer-multiple-choice")
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value)

        // reset options value and isSelected
        setOptionsValue(["", "", "", ""])
        setIsOptionsSelected([false, false, false, false])

        if (e.target.value === "single-word-answer") setIsOptionsSelected([true, false, false, false])
        
        if (e.target.value === "true-or-false") setOptionsValue(["True", "False", "", ""])
    }

    const date = new Date()
    const [year, setYear] = useState<string>(date.getFullYear().toString())
    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>):void => setYear(e.target.value)

    const [score, setScore] = useState<number>()
    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>):void => setScore(parseInt(e.target.value))

    const [question, setQuestion] = useState<string>("")
    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>):void => setQuestion(e.target.value)
    
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

    function validation ():boolean {
        let valid:boolean = true

        if (question === "") {
            setQuestionErrMessage("Please fill the question")
            valid = false
        }
        else setQuestionErrMessage("")

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


        if (isNaN(score!) || score === undefined) {
            setScoreErrMessage("Please fill the score")
            valid = false
        }
        else if (score < 0) {
            setScoreErrMessage("Score may not be negative")
            valid = false
        }
        else setScoreErrMessage("")

        if (question === "") {
            setQuestionErrMessage("Please fill the question")
            valid = false
        }
        else setQuestionErrMessage("")

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
        let valid:boolean = validation()

        if (!valid) return

        setIsOnLoad(true)

        let answer:string[] = []

        for (let i = 0; i < 4; i++) {
            if (isOptionsSelected[i]) answer.push(optionsValue[i])
        }

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/question", 
                {question, year: parseInt(year), type, score, answer, options: optionsValue}
            )
            
            if (response.status === 201) {
                toast_success(response.data.message)
            }
        }
        catch (err: any) {
            toast_error(err.response.data.message)
        }

        setIsOnLoad(false)
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

    return (
        <CreateQuestionContext.Provider value={{year, typeOptions, type, score: score !== undefined ? score : 0, question, optionsValue, isOptionsSelected, isOnLoad, handleTypeChange, handleYearChange, handleScoreChange, handleQuestionChange, handleOptionValueChange, handleIsOptionsSelectedChange, saveQuestion, clearInputs}}>
            { children }
        </CreateQuestionContext.Provider>
    )
}

export default CreateQuestionProvider