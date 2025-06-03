import { useContext } from "react"
import ReactPaginate from "react-paginate"

import { QuestionListContext } from "../provider/question_list_context"

function QuestionList() {

    const { questionList, deleteQuestion } = useContext(QuestionListContext)

    return (
        <div>
            <div className={`flex flex-col`}>
                <i className={`text-4xl ri-list-check-2 mb-2`}/>
                <h1 className={`text-xl font-semibold mb-8`}>Question List</h1>
                <div className={`overflow-x-auto`}>
                    <ReactPaginate 
                        pageCount={Math.ceil(questionList.length / 20)}
                        pageRangeDisplayed={20}
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        marginPagesDisplayed={2}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        className={`text-3xl`}
                    />
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="text-gray-500 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">No.</th>
                                <th scope="col" className="px-6 py-3 font-medium text-start">Question</th>
                                <th scope="col" className="px-6 py-3 font-medium">Year</th>
                                <th scope="col" className="px-6 py-3 font-medium">Type</th>
                                <th scope="col" className="px-6 py-3 font-medium text-start">Answer</th>
                                <th scope="col" className="px-6 py-3 font-medium">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            { ...questionList.map((question, index) => {
                                return (
                                    <tr key={question._id}>
                                        <td className="px-6 py-4 text-center">{index + 1}</td>
                                        <td className="px-6 py-4">{question.question}</td>
                                        <td className="px-6 py-4">{question.year}</td>
                                        <td className="px-6 py-4">{question.type.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</td>
                                        <td className="px-6 py-4">{question.answer}</td>
                                        <td className="px-6 py-4"><i className={`ri-delete-bin-2-line`} onClick={() => deleteQuestion(question._id)}/></td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>       
            </div>
        </div>
    )
}

export default QuestionList