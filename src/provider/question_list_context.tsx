import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CreateQuestionContext } from "./create_question_context";
import toast_success from "../components/toast/toast_success";
import toast_error from "../components/toast/toast_error";

export const QuestionListContext = createContext({
    questionList: [{_id: "", question: "", year: 0, type: "", options: ["", "", "", ""], answer: ["", "", "", ""], score: 0}],
    
    deleteQuestion: (id: string) => { console.log(id) }
})

interface QuestionModel {
    _id: string,
    question: string,
    year: number,
    type: string,
    options: string[],
    answer: string[],
    score: number
}

function QuestionListProvider ({children} : {children: React.ReactNode}) {

    const { isOnLoad } = useContext(CreateQuestionContext)

    const [questionList, setQuestionList] = useState<QuestionModel[]>([])

    useEffect(() => {
        getQuestionList()
    }, [isOnLoad])
    
    // const [filterByYear, setFilterByYear] = useState<number>(-1)

    async function getQuestionList():Promise<void> {
        try {
            const response = await axios.get("https://huawei-practice-web-backend.vercel.app/api/question")
            
            if (response.status === 200) {
                setQuestionList(response.data)
            }
        }
        catch (err: any) {
            console.log(err)
        }
    }

    async function deleteQuestion (id: string):Promise<void> {
        try {
            const response = await axios.delete(`https://huawei-practice-web-backend.vercel.app/api/question/${id}`)

            if (response.status === 200) {
                getQuestionList()
                toast_success(response.data.message)
            }
        }
        catch (err: any) {
            toast_error(err.response.data.message)
        }
    }

    return (
        <QuestionListContext.Provider value={{questionList, deleteQuestion}}>
            {children}
        </QuestionListContext.Provider>
    )
}

export default QuestionListProvider