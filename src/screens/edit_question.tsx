import { useContext } from "react"

import MultipleAnswerMultipleChoice from "../components/choices/multiple_answer_multiple_choice"
import { EditQuestionContext } from "../provider/edit_question_context"
import SingleAnswerMultipleChoice from "../components/choices/single_answer_multiple_choice"
import SingleWordAnswer from "../components/choices/single_word_answer"
import TrueOrFalse from "../components/choices/true-or-false"
import { ErrorMessageContext } from "../provider/error_message_context"
import InputField from "../components/field/input_field"
import SelectField from "../components/field/select_field"
import ActionButton from "../components/action_button"


function EditQuestion() {

    const { year, score, typeOptions, type, question, isOnLoad, handleYearChange, handleTypeChange, handleScoreChange, handleQuestionChange, saveQuestion } = useContext(EditQuestionContext)
    const { yearErrMessage, scoreErrMessage, questionErrMessage } = useContext(ErrorMessageContext)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-edit-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Edit Question</h1>
            <div className={`space-y-8`}>
                <div className={`flex flex-col md:flex-row md:space-x-12`}>
                    <div>
                        <SelectField handleSelectChange={handleTypeChange} 
                            optionsValue={typeOptions} 
                            optionsLabel={["Multiple Answers Multiple Choice", "Single Answer Multiple Choice", "True or False", "Single Word Answer"]}
                            labelValue="Question Type" 
                            titleValue="question-type"
                            errMessage=""
                            value={type} />
                    </div>
                    <div className={`flex flex-row space-x-12`}>
                        <InputField handleInputChange={handleYearChange}
                            inputType="text" 
                            errMessage={yearErrMessage} 
                            placeholderValue="YYYY" 
                            idValue="question-year" 
                            labelValue="Year"
                            value={year} />
                        <InputField handleInputChange={handleScoreChange} 
                            inputType="number" 
                            errMessage={scoreErrMessage} 
                            placeholderValue="Score" 
                            idValue="question-score" 
                            labelValue="Score" 
                            value={score} />
                    </div>
                </div>

                <div className={`relative`}>
                    <div className={`font-semibold`}>Question Type</div>
                    <textarea value={question} onChange={handleQuestionChange} rows={4} className={`w-full mt-2 resize-none outline-none p-2 border-2 border-accent-2 rounded-sm`} id="question" placeholder="Enter your question"></textarea>
                    <div className={`${questionErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{questionErrMessage}</div>
                </div>

                <div>
                    { type === "multiple-answer-multiple-choice"? <MultipleAnswerMultipleChoice mode="edit"/> : null }
                    { type === "single-answer-multiple-choice"? <SingleAnswerMultipleChoice mode="edit"/> : null }
                    { type === "single-word-answer"? <SingleWordAnswer mode="edit"/> : null }
                    { type === "true-or-false"? <TrueOrFalse mode="edit"/> : null }
                </div>
                <ActionButton action={saveQuestion} 
                    text={"Save"} icon={"ri-save-fill"} isOnLoad={isOnLoad} />
            </div>
        </div>
    )
}

export default EditQuestion