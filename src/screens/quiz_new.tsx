import ActionButton from "../components/action_button"
import InputField from "../components/field/input_field"
import NewQuizHooks from "../hooks/new_quiz_hooks"

function QuizNew() {

    const { questionCount, handleQuestionCountChange, quizType, handleQuizType, timePerQuestion, handleTimePerQuestionChange, timeLimit, handleTimeLimitChange, startQuiz, isOnLoad } = NewQuizHooks()

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-equalizer-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>New Quiz</h1>
            <div className={`space-y-4`}>
                <div className={`max-w-50 w-full`}>
                    <InputField handleInputChange={handleQuestionCountChange} inputType="number" placeholderValue="Number" idValue="number-of-questions" labelValue="Number of Questions" value={questionCount}/>
                </div>
                <div className={`flex flex-col sm:flex-row space-y-4 space-x-0 sm:space-y-0 sm:space-x-4`}>
                    <button onClick={() => handleQuizType(0)} className={`w-full max-w-70 h-30 border border-1.5 border-primary rounded-md px-5 py-3 flex flex-col items-start ${quizType === 0 ? "text-white bg-primary" : "text-primary bg-background"} cursor-pointer transition-all`}>
                        <i className="text-2xl ri-timer-line"/>
                        <span className={`text-md font-semibold`}>Timed Quiz</span>
                        <span className={`text-xs text-start`}>Take your time to think the answers!</span>
                    </button>
                    <button onClick={() => handleQuizType(1)} className={`w-full max-w-70 h-30 border border-1.5 border-primary rounded-md px-5 py-3 flex flex-col items-start ${quizType === 1 ? "text-white bg-primary" : "text-primary bg-background"} cursor-pointer transition-all`}>
                        <i className="text-2xl ri-timer-flash-line"/>
                        <span className={`text-md font-semibold`}>Flash Quiz</span>
                        <span className={`text-xs text-start`}>Finish as fast as you can to gain more points!</span>
                    </button>
                </div>
                <div className={`flex flex-row space-x-1 items-end`}>
                    <div className={`max-w-40 w-full`}>
                        {
                            quizType === 0 ?
                            <InputField handleInputChange={handleTimeLimitChange} inputType="number" placeholderValue="" idValue="time-limit" labelValue="Time Limit" value={timeLimit}/>
                            :
                            <InputField handleInputChange={handleTimePerQuestionChange} inputType="number" placeholderValue="" idValue="time-limit" labelValue="Time per Question" value={timePerQuestion}/>
                        }
                    </div>
                    <span className={`mb-1`}>minutes</span>
                </div>
            </div>
            <div className={`mt-10 flex flex-col text-gray-400`}>
                <div className={`flex flex-row items-center space-x-2`}>
                    <i className={`text-2xl ri-pushpin-fill`}/>
                    <span className={`font-semibold`}>Note!</span>
                </div>
                <span>
                    The timer will still run even if you leave the page.
                </span>
                <span>
                    Your answers will be saved automatically.
                </span>
            </div>
            <div className={`mt-6`}>
                <ActionButton action={startQuiz} text="Start Quiz" icon="" isOnLoad={isOnLoad} /> 
            </div>
        </div>
    )
}

export default QuizNew