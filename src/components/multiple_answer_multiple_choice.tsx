

function MultipleAnswerMultipleChoice() {
    return (
        <div>
            <div className={`flex flex-col space-y-6`}>
                <div className={`flex flex-row space-x-2`}>
                    <input type="checkbox" className={`w-5`} title="" id="1" /> <label htmlFor="1" className={`text-sm`}>Option 1</label>
                </div>
                <div className={`flex flex-row space-x-2`}>
                    <input type="checkbox" className={`w-5`} title="" id="2" /> <label htmlFor="2" className={`text-sm`}>Option 2</label>
                </div>
                <div className={`flex flex-row space-x-2`}>
                    <input type="checkbox" className={`w-5`} title="" id="3" /> <label htmlFor="3" className={`text-sm`}>Option 2</label>
                </div>
                <div className={`flex flex-row space-x-2`}>
                    <input type="checkbox" className={`w-5`} title="" id="4" /> <label htmlFor="4" className={`text-sm`}>Option 4</label>
                </div>       
            </div>
        </div>
        
    )
}

export default MultipleAnswerMultipleChoice