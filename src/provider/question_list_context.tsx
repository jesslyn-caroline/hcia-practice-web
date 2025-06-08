import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast_success from "../components/toast/toast_success";
import toast_error from "../components/toast/toast_error";
import { useNavigate } from "react-router";
import { UserContext } from "./user_context";

export const QuestionListContext = createContext({
    questionList: [{_id: "", question: "", year: 0, type: "", options: ["", "", "", ""], answer: ["", "", "", ""], score: 0}],
    currentItems: [{_id: "", question: "", year: 0, type: "", options: ["", "", "", ""], answer: ["", "", "", ""], score: 0}],
    pageCount: 0,
    startOffset: 0,
    isOnLoadDelete: "",

    questionSearch: "",
    yearSearch: "",
    typeSearch: "",

    handleQuestionSearch: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleYearSearch: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleTypeSearch: (e: React.ChangeEvent<HTMLSelectElement>) => { console.log(e.target.value) },
    
    deleteQuestion: (id: string) => { console.log(id) },
    handlePageClick: (e: {selected: number}) => { console.log(e) },
    editQuestion: (id: string) => { console.log(id) },
    setIsOnLoadEdit: (toggle: boolean) => { console.log(toggle) },
    setIsOnLoadCreate: (toggle: boolean) => { console.log(toggle) },

    search: () => { console.log("search") }
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

    const { currentActiveRoute } = useContext(UserContext)

    const [isOnLoadCreate, setIsOnLoadCreate] = useState<boolean>(false)
    const [isOnLoadEdit, setIsOnLoadEdit] = useState<boolean>(false)

    const [questionList, setQuestionList] = useState<QuestionModel[]>([])
    useEffect(() => {
        getQuestionList()
    }, [isOnLoadCreate, isOnLoadEdit])

    const [filteredQuestionList, setFilteredQuestionList] = useState<QuestionModel[]>([])

    // === React Paginate ===

    const itemsPerPage:number = 20
    const [startOffset, setStartOffset] = useState<number>(0)

    const endOffset:number = startOffset + itemsPerPage
    const currentItems:QuestionModel[] = filteredQuestionList.slice(startOffset, endOffset)
    const pageCount:number = Math.ceil(questionList.length / itemsPerPage)

    const handlePageClick = (e: {selected: number}) => {
        const newOffset = (e.selected * itemsPerPage) % questionList.length
        setStartOffset(newOffset)
    }

    // =======================

    // === Filter Question ===

    const [questionSearch, setQuestionSearch] = useState<string>("")
    const handleQuestionSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQuestionSearch(e.target.value)

    const [yearSearch, setYearSearch] = useState<string>("")
    const handleYearSearch = (e: React.ChangeEvent<HTMLInputElement>) => setYearSearch(e.target.value)

    const [typeSearch, setTypeSearch] = useState<string>("")
    const handleTypeSearch = (e: React.ChangeEvent<HTMLSelectElement>) => setTypeSearch(e.target.value)

    function search():void {
        console.log(questionSearch, yearSearch, typeSearch)

        let filterArr = questionList.filter((item: QuestionModel) => {
            return item.question.toLowerCase().includes(questionSearch.toLowerCase()) && 
                (item.year.toString() === yearSearch || yearSearch === "") && 
                (item.type === typeSearch || typeSearch === "")
        })

        setFilteredQuestionList(filterArr)
    }

    function resetSearch():void {
        setQuestionSearch("")
        setYearSearch("")
        setTypeSearch("")
        setFilteredQuestionList(questionList)
    }

    useEffect(() => {
        resetSearch()
    }, [currentActiveRoute])

    // ========================

    async function getQuestionList():Promise<void> {
        try {
            const response = await axios.get("https://huawei-practice-web-backend.vercel.app/api/question")
            
            if (response.status === 200) {
                setQuestionList(response.data)
                setFilteredQuestionList(response.data)
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
        <QuestionListContext.Provider value={{questionList, currentItems, pageCount, startOffset, isOnLoadDelete, questionSearch, yearSearch, typeSearch, handleQuestionSearch, handleYearSearch, handleTypeSearch, setIsOnLoadCreate, setIsOnLoadEdit, deleteQuestion, handlePageClick, editQuestion, search}}>
            {children}
        </QuestionListContext.Provider>
    )
}

export default QuestionListProvider