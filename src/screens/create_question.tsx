import MultipleAnswerMultipleChoice from "../components/multiple_answer_multiple_choice"


function CreateQuestion() {
    return (
        <div className={`flex flex-col`}>
            <h1 className={`text-xl font-semibold mb-4`}>Create Question</h1>
            <div className={`flex flex-col space-y-6`}>
                <div className={`flex flex-row space-x-12`}>
                    <div className={`flex flex-col space-y-1.5`}>
                        <span className={`text-sm font-semibold`}>Question Type</span>
                        <select className={`text-sm pb-1 outline-none border-b-2 border-text`} title="question-type">
                            <option>Single Answer Multiple Choice</option>
                            <option>Multiple Answers Multiple Choice</option>
                            <option>True or False</option>
                            <option>Single Word Answer</option>
                        </select>
                    </div>
                    <div className={`flex flex-col space-y-1.5`}>
                        <span className={`text-sm font-semibold`}>Question Year</span>
                        <input type="text" minLength={4} maxLength={4} className={`text-sm px-1 pb-1 outline-none border-b-2 border-text`} id="question-year" placeholder="YYYY"/>
                    </div>
                </div>
                <div className={`flex flex-col space-y-1.5`}>
                    <span className={`text-sm font-semibold`}>Question</span>
                    <textarea rows={4} className={`text-sm resize-none outline-none border-b-2 border-text`} id="question" placeholder="Question"></textarea>
                </div>
                <MultipleAnswerMultipleChoice />
            </div>
        </div>
    )
}

export default CreateQuestion