import { useState, createContext } from "react"
import axios from "axios"
import { Bounce, toast } from "react-toastify"

export const CreateQuestionContext = createContext({
    year : "",
    type : "",
    question : "",
    optionsValue : ["", "", "", ""],
    isOptionsSelected : [false, false, false, false],

    handleTypeChange : (e: React.ChangeEvent<HTMLSelectElement>) => { console.log(e.target.value) },
    handleYearChange : (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleScoreChange : (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleQuestionChange : (e: React.ChangeEvent<HTMLTextAreaElement>) => { console.log(e.target.value) },
    handleOptionValueChange : (index:number, e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value, index) },
    handleIsOptionsSelectedChange : (index:number, e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value, index) },

    saveQuestion: () => { console.log("save") }
})

function CreateQuestionProvider ({children} : {children : React.ReactNode}) {

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

    async function saveQuestion() {
        let answer:string[] = []

        for (let i = 0; i < 4; i++) {
            if (isOptionsSelected[i]) answer.push(optionsValue[i])
        }

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/question", 
                {question, year, type, score, answer, options: optionsValue}
            )
            toast.success(response.data.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    return (
        <CreateQuestionContext.Provider value={{year, type, question, optionsValue, isOptionsSelected, handleTypeChange, handleYearChange, handleScoreChange, handleQuestionChange, handleOptionValueChange, handleIsOptionsSelectedChange, saveQuestion}}>
            { children }
        </CreateQuestionContext.Provider>
    )
}

export default CreateQuestionProvider