import { useContext } from "react"
import ReactPaginate from "react-paginate"

import { QuestionListContext } from "../provider/question_list_context"
import ActionButton from "../components/action_button"

function QuestionList() {

    const {currentItems, pageCount, startOffset, isOnLoadDelete, deleteQuestion, handlePageClick} = useContext(QuestionListContext)

    return (
        <div>
            <div className={`flex flex-col`}>
                <i className={`text-4xl ri-list-check-2 mb-2`}/>
                <h1 className={`text-xl font-semibold mb-8`}>Question List</h1>
                <div className={``}>
                    <table className="mb-20 min-w-full divide-y divide-gray-200 overflow-x-auto">
                        <thead className="text-gray-500 uppercase">
                            <tr>
                                <th scope="col" className="w-12 font-medium">No.</th>
                                <th scope="col" className="w-90 px-6 py-3 font-medium text-start">Question</th>
                                <th scope="col" className="px-6 py-3 font-medium">Year</th>
                                <th scope="col" className="w-70 font-medium">Type</th>
                                <th scope="col" className="w-50 px-6 py-3 font-medium text-start">Answer</th>
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
                                        <td className="py-3 text-center">{question.type.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</td>
                                        <td className="px-6 py-3">
                                            {...question.answer.map((answer) => {
                                                return (
                                                    <p className={`mb-2`}>{answer}</p>
                                                )
                                            })}
                                        </td>
                                        <td className="px-6 py-3 flex flex-row justify-center space-x-2">
                                            <ActionButton action={() => deleteQuestion(question._id)} text="" icon="ri-delete-bin-line" isOnLoad={isOnLoadDelete}/>
                                            <ActionButton action={() => deleteQuestion(question._id)} text="" icon="ri-delete-bin-line" isOnLoad={isOnLoadDelete}/>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className={`w-full flex justify-center overflow-x-auto scroll-bar-hidden`}>
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
    )
}

export default QuestionList
