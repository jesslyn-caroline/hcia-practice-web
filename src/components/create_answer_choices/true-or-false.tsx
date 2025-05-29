import { useContext } from "react"
import { CreateQuestionContext } from "../../provider/create_question_context"
import { ErrorMessageContext } from "../../provider/error_message_context"


function TrueOrFalse() {

    const { handleIsOptionsSelectedChange } = useContext(CreateQuestionContext)

    const { noAnswerErrMessage } = useContext(ErrorMessageContext)

    return (
        <div>
            <div className={`flex flex-col mb-5`}>
                <span className={`text-sm font-semibold`}>Question Choices</span>
                <span className={`text-sm text-gray-500`}>Select the correct answer</span>
                <span className={`${noAnswerErrMessage === "" ? "hidden" : ""}`}>
                    <div className={`absolute text-xs text-red-500`}>{noAnswerErrMessage}</div>
                </span>
            </div>
            <div className={`flex flex-col space-y-6`}>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" 
                        id="option-1"
                        name="option" 
                        onChange={(e) => {handleIsOptionsSelectedChange(0, e)}} 
                        className={`w-5`} /> 
                    <label htmlFor="option-1" className={`w-full`}>
                        <span className={`text-sm`}>True</span>
                    </label>
                </div>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" 
                        id="option-2" 
                        name="option" 
                        onChange={(e) => {handleIsOptionsSelectedChange(1, e)}} 
                        className={`w-5`} /> 
                    <label htmlFor="option-2" className={`w-full`}>
                        <span className={`text-sm`}>False</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default TrueOrFalse