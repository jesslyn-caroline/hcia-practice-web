import { useContext } from "react"
import ReactPaginate from "react-paginate"

import { QuestionListContext } from "../provider/question_list_context"
import ActionButton from "../components/action_button"
import InputField from "../components/field/input_field"
import SelectField from "../components/field/select_field"

function QuestionList() {

    const {currentItems, pageCount, startOffset, isOnLoadDelete, questionSearch, yearSearch, typeSearch, deleteQuestion, handlePageClick, editQuestion, handleQuestionSearch, handleYearSearch, handleTypeSearch, search} = useContext(QuestionListContext)
    
    return (
        <div>
            <div className={`flex flex-col`}>
                <i className={`text-4xl ri-list-check-2 mb-2`}/>
                <h1 className={`text-xl font-semibold mb-8`}>Question List</h1>
                <div className={`space-y-4`}>
                    <div className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12`}>
                        <InputField handleInputChange={handleQuestionSearch} inputType="text" placeholderValue="Search" idValue="search" labelValue="Question Search" value={questionSearch} />
                        <div className={`flex flex-row space-x-12`}>
                            <InputField handleInputChange={handleYearSearch} inputType="text" placeholderValue="YYYY" idValue="year" labelValue="Year" value={yearSearch} />
                            <SelectField handleSelectChange={handleTypeSearch} 
                                optionsValue={["", "multiple-answer-multiple-choice", "single-answer-multiple-choice", "true-or-false", "single-word-answer"]} 
                                optionsLabel={["-", "Multiple Answers Multiple Choice", "Single Answer Multiple Choice", "True or False", "Single Word Answer"]}
                                labelValue="Question Type" 
                                titleValue="question-type"
                                errMessage=""
                                value={typeSearch} />
                        </div>
                        <div className={`md:mt-3`}>
                            <ActionButton action={search} text="Search" icon="ri-search-line" isOnLoad={false} />
                        </div>
                    </div>
                    <div className={``}>
                        <table className="mb-20 min-w-full divide-y divide-gray-200 overflow-x-auto">
                            <thead className="text-gray-500 uppercase">
                                <tr>
                                    <th scope="col" className="w-12 font-medium">No.</th>
                                    <th scope="col" className="w-90 px-6 py-3 font-medium text-start">Question</th>
                                    <th scope="col" className="px-6 py-3 font-medium">Year</th>
                                    <th scope="col" className="w-70 px-6 py-3 font-medium">Score</th>
                                    <th scope="col" className="w-70 font-medium">Type</th>
                                    <th scope="col" className="w-60 px-6 py-3 font-medium text-start">Answer</th>
                                    <th scope="col" className="px-6 py-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                { ...currentItems.map((question, index) => {
                                    return (
                                        <tr key={question._id}>
                                            <td className="py-3 text-center">{index + startOffset + 1}</td>
                                            <td className="px-6 py-3">{question.question}</td>
                                            <td className="py-3 text-center">{question.year}</td>
                                            <td className="px-6 py-3 text-center">{question.score}</td>
                                            <td className="py-3 text-center">{question.type.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</td>
                                            <td className="px-6 py-3">
                                                {...question.answer.map((answer) => {
                                                    return (
                                                        <p className={`mb-2`}>{answer}</p>
                                                    )
                                                })}
                                            </td>
                                            <td className="px-6 py-3 flex flex-col md:flex-row justify-center space-x-0 space-y-2 md:space-x-2 md:space-y-0">
                                                <ActionButton action={() => deleteQuestion(question._id)} 
                                                    text="Delete" icon="" isOnLoad={isOnLoadDelete === question._id} />
                                                <ActionButton action={() => { editQuestion(question._id) }}
                                                    text="Edit" icon="" isOnLoad={false}
                                                    bgColor="bg-yellow-400" hoverbgColor="hover:bg-yellow-500"
                                                    borderColor="border-yellow-400" hoverBorderColor="hover:border-yellow-400" 
                                                    textColor="text-white" hoverTextColor="hover:text-white"/>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className={`w-screen md:w-full flex justify-center overflow-x-auto scroll-bar-hidden`}>
                            <ReactPaginate
                                previousLabel={<i className="ri-arrow-left-s-line"/>}
                                breakLabel="..."
                                nextLabel={<i className="ri-arrow-right-s-line"/>}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                renderOnZeroPageCount={null}
                                className="flex flex-row justify-center items-center"
                                pageClassName="border-1 border-accent-2 w-8 h-8 flex justify-center items-center"
                                breakClassName="border-1 border-accent-2 w-8 h-8 flex justify-center items-center" 
                                previousClassName="text-2xl w-8 h-8 flex justify-center items-center"
                                nextClassName="text-2xl w-8 h-8 flex justify-center items-center"
                                activeClassName="text-blue-600 font-medium bg-gray-200"                   
                            />
                        </div>
                    </div>
                </div>       
            </div>
        </div>
    )
}

export default QuestionList
