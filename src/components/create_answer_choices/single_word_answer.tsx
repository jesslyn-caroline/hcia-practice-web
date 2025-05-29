import { useContext } from "react"
import { CreateQuestionContext } from "../../provider/create_question_context"


function SingleWordAnswer() {

    const {handleOptionValueChange} = useContext(CreateQuestionContext)

    return (
        <div className={`flex flex-row space-x-4 items-center`}>
            <h3 className={`text-sm font-semibold`}>Answer: </h3>
            <input type="text" onChange={(e) => {handleOptionValueChange(0, e)}}  className={`w-full text-sm py-2 outline-none border-b-2 border-text`} placeholder="Enter Answer"/>
        </div>
    )
}

export default SingleWordAnswer