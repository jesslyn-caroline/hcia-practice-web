import { useContext } from "react"

import MultipleAnswerMultipleChoice from "../components/create_answer_choices/multiple_answer_multiple_choice"
import { CreateQuestionContext } from "../provider/create_question_context"
import SingleAnswerMultipleChoice from "../components/create_answer_choices/single_answer_multiple_choice"
import SingleWordAnswer from "../components/create_answer_choices/single_word_answer"
import TrueOrFalse from "../components/create_answer_choices/true-or-false"
import { Bounce, ToastContainer } from "react-toastify"
import { ErrorMessageContext } from "../provider/error_message_context"


function CreateQuestion() {

    const { year, type, question, handleYearChange, handleTypeChange, handleScoreChange, handleQuestionChange, saveQuestion } = useContext(CreateQuestionContext)

    const { yearErrMessage, scoreErrMessage, questionErrMessage } = useContext(ErrorMessageContext)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-menu-add-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-4`}>Create Question</h1>
            <div className={`flex flex-col space-y-8`}>

                <div className={`flex flex-row space-x-12`}>
                    <div className={`flex flex-col space-y-1.5`}>
                        <span className={`text-sm font-semibold`}>Question Type</span>
                        <select value={type} onChange={handleTypeChange} className={`text-sm pb-1 outline-none border-b-2 border-text`} title="question-type">
                            <option value="multiple-answer-multiple-choice">Multiple Answers Multiple Choice</option>
                            <option value="single-answer-multiple-choice">Single Answer Multiple Choice</option>
                            <option value="true-or-false">True or False</option>
                            <option value="single-word-answer">Single Word Answer</option>
                        </select>
                    </div>
                    <div className={`flex flex-col space-y-1.5`}>
                        <span className={`text-sm font-semibold`}>Question Year</span>
                        <input type="text" value={year} onChange={handleYearChange} minLength={4} maxLength={4} className={`text-sm px-1 pb-1 outline-none border-b-2 border-text`} id="question-year" placeholder="YYYY"/>
                        <span className={`${yearErrMessage === "" ? "hidden" : ""}`}>
                            <div className={`absolute text-xs text-red-500`}>{yearErrMessage}</div>
                        </span>
                    </div>
                    <div className={`flex flex-col space-y-1.5`}>
                        <span className={`text-sm font-semibold`}>Score</span>
                        <input type="number"  onChange={handleScoreChange} className={`text-sm px-1 pb-1 outline-none border-b-2 border-text`} id="question-score" placeholder="Score"/>
                        <span className={`${scoreErrMessage === "" ? "hidden" : ""}`}>
                            <div className={`absolute text-xs text-red-500`}>{scoreErrMessage}</div>
                        </span>
                    </div>
                </div>

                <div className={`flex flex-col space-y-1.5`}>
                    <span className={`text-sm font-semibold`}>Question</span>
                    <textarea value={question} onChange={handleQuestionChange} rows={4} className={`text-sm resize-none outline-none p-2 border-2 border-greyist rounded-sm`} id="question" placeholder="Enter your question"></textarea>
                    <span className={`${questionErrMessage === "" ? "hidden" : ""}`}>
                        <div className={`absolute text-xs text-red-500`}>{questionErrMessage}</div>
                    </span>
                </div>

                <div>
                    { type === "multiple-answer-multiple-choice"? <MultipleAnswerMultipleChoice /> : null }
                    { type === "single-answer-multiple-choice"? <SingleAnswerMultipleChoice /> : null }
                    { type === "single-word-answer"? <SingleWordAnswer /> : null }
                    { type === "true-or-false"? <TrueOrFalse /> : null }
                </div>
                
                <button className={`w-fit h-fit bg-primary px-4 py-1.5 rounded-md flex flex-row items-center space-x-1`} onClick={saveQuestion}>
                    <i className={`text-background text-xl ri-save-fill`}/>
                    <span className={`text-background text-sm font-medium`}>Save</span>
                </button>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    )
}

export default CreateQuestion