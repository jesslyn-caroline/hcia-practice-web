import checkIsOptionTheAnswer from "../func/check_is_option_the_answer"

interface Props {
    question: string
    answer: string[]
    options: string[]
    type: string,
    id: string
}

function QuestionCard({question, answer, options, type, id} : Props) {
    return (
        <div className={`flex flex-col space-y-4 mb-10`}>
            <h1>{question}</h1>
            <div className={`space-y-2`}>
            {
                type === "multiple-answer-multiple-choice"?
                <>
                {...options.map((option, index) => {
                    return (
                        <div className={`flex flex-row space-x-4`}>
                            <input type="checkbox" id={`option-${index}`} name={`option-${id}`} checked={checkIsOptionTheAnswer(option, answer)} className={`w-5`} disabled/> 
                            <label htmlFor={`option-${index}`} className={`w-full relative`}>{option}
                            </label>
                        </div>
                    )
                })}
                </>
                : null
            }
            {
                type === "single-answer-multiple-choice"?
                <>
                {...options.map((option, index) => {
                    return (
                        <div className={`flex flex-row space-x-4`}>
                            <input type="radio" id={`option-${index}`} name={`option-${id}`} checked={checkIsOptionTheAnswer(option, answer)} className={`w-5`} disabled/> 
                            <label htmlFor={`option-${index}`} className={`w-full relative`}>{option}
                            </label>
                        </div>
                    )
                })}
                </>
                : null
            }
            {
                type === "true-or-false"?
                <>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" id={`option-0`} name={`option-${id}`} checked={checkIsOptionTheAnswer("True", answer)} className={`w-5`} disabled/> 
                    <label htmlFor={`option-0`} className={`w-full relative`}>True
                    </label>
                </div>
                <div className={`flex flex-row space-x-4`}>
                    <input type="radio" id={`option-1`} name={`option-${id}`} checked={checkIsOptionTheAnswer("False", answer)} className={`w-5`} disabled/> 
                    <label htmlFor={`option-1`} className={`w-full relative`}>False
                    </label>
                </div>
                </>
                : null
            }
            {
                type === "single-word-answer"?
                <>
                <div className={`flex flex-row space-x-2`}>
                    <span className={`font-medium`}> Answer: </span>
                    <input type="text" id={`option-0`} name={`option-${id}`} value={answer[0]} className={`w-full`} disabled/> 
                </div>
                </>
                : null
            }
            </div>
            
        </div>
    )
}

export default QuestionCard