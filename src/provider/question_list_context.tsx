import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast_success from "../components/toast/toast_success";
import toast_error from "../components/toast/toast_error";
import { useNavigate } from "react-router";

export const QuestionListContext = createContext({
    questionList: [{_id: "", question: "", year: 0, type: "", options: ["", "", "", ""], answer: ["", "", "", ""], score: 0}],
    currentItems: [{_id: "", question: "", year: 0, type: "", options: ["", "", "", ""], answer: ["", "", "", ""], score: 0}],
    pageCount: 0,
    startOffset: 0,
    isOnLoadDelete: "",
    
    deleteQuestion: (id: string) => { console.log(id) },
    handlePageClick: (e: {selected: number}) => { console.log(e) },
    editQuestion: (id: string) => { console.log(id) },
    setIsOnLoadEdit: (toggle: boolean) => { console.log(toggle) },
    setIsOnLoadCreate: (toggle: boolean) => { console.log(toggle) }
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

    const [isOnLoadCreate, setIsOnLoadCreate] = useState<boolean>(false)
    const [isOnLoadEdit, setIsOnLoadEdit] = useState<boolean>(false)

    const [questionList, setQuestionList] = useState<QuestionModel[]>([])
    useEffect(() => {
        getQuestionList()
    }, [isOnLoadCreate, isOnLoadEdit])

    // === React Paginate ===

    const itemsPerPage:number = 20
    const [startOffset, setStartOffset] = useState<number>(0)

    const endOffset:number = startOffset + itemsPerPage
    const currentItems:QuestionModel[] = questionList.slice(startOffset, endOffset)
    const pageCount:number = Math.ceil(questionList.length / itemsPerPage)

    const handlePageClick = (e: {selected: number}) => {
        const newOffset = (e.selected * itemsPerPage) % questionList.length
        setStartOffset(newOffset)
    }

    // ======================

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

    const [isOnLoadDelete, setIsOnLoadDelete] = useState<string>("false")

    async function deleteQuestion (id: string):Promise<void> {
        setIsOnLoadDelete(id)

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

        setIsOnLoadDelete("")
    }

    const navigate = useNavigate()

    function editQuestion (id: string) {
        navigate(`/question/edit/${id}`)
    }

    return (
        <QuestionListContext.Provider value={{questionList, currentItems, pageCount, startOffset, isOnLoadDelete, setIsOnLoadCreate, setIsOnLoadEdit, deleteQuestion, handlePageClick, editQuestion}}>
            {children}
        </QuestionListContext.Provider>
    )
}

export default QuestionListProvider