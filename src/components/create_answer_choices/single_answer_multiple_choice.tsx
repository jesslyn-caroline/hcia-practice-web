import { useContext } from "react"

import { CreateQuestionContext } from "../../provider/create_question_context"


function SingleAnswerMultipleChoice() {

    const { optionsValue, handleOptionValueChange, handleIsOptionsSelectedChange } = useContext(CreateQuestionContext)

    return (
        <div>
            <div className={`flex flex-col mb-5`}>
                <span className={`text-sm font-semibold`}>Question Choices</span>
                <span className={`text-sm text-gray-500`}>Select the correct answer</span>
            </div>
            <div className={`flex flex-col space-y-6`}>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" 
                        id="option-1" 
                        name="option" 
                        onChange={(e) => {handleIsOptionsSelectedChange(0, e)}} 
                        className={`w-5`} /> 
                    <label htmlFor="option-1" className={`w-full`}>
                        {``}
                        <input type="text" value={optionsValue[0]} onChange={(e) => {handleOptionValueChange(0, e)}} className={`w-full text-sm py-2 outline-none border-b-2 border-text`} placeholder="Enter Option 1"/>
                    </label>
                </div>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" 
                        id="option-2"
                        name="option" 
                        onChange={(e) => {handleIsOptionsSelectedChange(1, e)}} 
                        className={`w-5`} /> 
                    <label htmlFor="option-2" className={`w-full`}>
                        {``}
                        <input type="text" value={optionsValue[1]} onChange={(e) => {handleOptionValueChange(1, e)}} className={`w-full text-sm py-2 outline-none border-b-2 border-text`} placeholder="Enter Option 2"/>
                    </label>
                </div>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" 
                        id="option-3" 
                        name="option" 
                        onChange={(e) => {handleIsOptionsSelectedChange(2, e)}} 
                        className={`w-5`} /> 
                    <label htmlFor="option-3" className={`w-full`}>
                        {``}
                        <input type="text" value={optionsValue[2]} onChange={(e) => {handleOptionValueChange(2, e)}} className={`w-full text-sm  py-2 outline-none border-b-2 border-text`} placeholder="Enter Option 3"/>
                    </label>
                </div>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" 
                        id="option-4" 
                        name="option" 
                        onChange={(e) => {handleIsOptionsSelectedChange(3, e)}} 
                        className={`w-5`} /> 
                    <label htmlFor="option-4" className={`w-full`}>
                        {``}
                        <input type="text" value={optionsValue[3]} onChange={(e) => {handleOptionValueChange(3, e)}} className={`w-full text-sm  py-2 outline-none border-b-2 border-text`} placeholder="Enter Option 4"/>
                    </label>
                </div>       
            </div>
        </div>
        
    )
}

export default SingleAnswerMultipleChoice