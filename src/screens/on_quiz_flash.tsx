import MultipleAnswerMultipleChoiceOption from "../components/choices/multiple_answer_multiple_choice_option"
import SingleAnswerMultipleChoiceOption from "../components/choices/single_answer_multiple_choice_option"
import TrueOrFalseOption from "../components/choices/true-or-false-option"
import InputField from "../components/field/input_field"
import OnQuizFlashHooks from "../hooks/on_quiz_flash_hooks"

function OnQuizFlash() {

    const {currentQuestion, question, timeToNext, isAnswerAttemptSelected, answerAttemptValue, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer, score, submit} = OnQuizFlashHooks()

    const timePerQuestion = JSON.parse(localStorage.getItem("quizData")!).timePerQuestion || 0
    return (
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] w-full h-full bg-background`}>
                <div className={`flex flex-col`}>
                    <div className={`min-h-14 h-14 px-4 md:px-10 bg-primary flex justify-between items-center`}>
                        <span className={`text-white`}>Next Question in {timeToNext === 0? timePerQuestion : timeToNext} s </span>
                    </div>     
                    <div className={`px-4 md:px-10 py-10 space-y-4 overflow-y-scroll scroll-bar-hidden`}>
                        <div className={`w-10 h-10 flex justify-center items-center rounded-full bg-primary text-white text-xl`}>
                            {currentQuestion + 1}
                        </div>
                        <h2 className={`font-semibold`}>Current score: {score}</h2>
                        <h1>{question[currentQuestion].question}</h1>
                        <div className={`space-y-4`}>
                        {
                            Array.from({ length: question.length }, (_, i) => i).map((num) => {
                                return (
                                    num === currentQuestion? (
                                        question[currentQuestion].type === "single-answer-multiple-choice"? (
                                            <SingleAnswerMultipleChoiceOption options={question[currentQuestion].options} id={ num } isOptionsSelected={isAnswerAttemptSelected[currentQuestion]} handleIsOptionsSelectedChange={handleRadioAnswer}/>
                                        ) : question[currentQuestion].type === "multiple-answer-multiple-choice"? (
                                            <MultipleAnswerMultipleChoiceOption options={question[currentQuestion].options} id={ num } isOptionsSelected={isAnswerAttemptSelected[currentQuestion]} handleIsOptionsSelectedChange={handleCheckBoxAnswer}/>
                                        ) : question[currentQuestion].type === "single-word-answer"? (
                                            <InputField handleInputChange={handleEssayAnswer} inputType="text" errMessage="" placeholderValue="Answer" idValue={`answer-${num}`} labelValue="" value={answerAttemptValue[currentQuestion][0]} />
                                        ) : question[currentQuestion].type === "true-or-false"? (
                                            <TrueOrFalseOption id={num} isOptionsSelected={isAnswerAttemptSelected[currentQuestion]} handleIsOptionsSelectedChange={handleRadioAnswer}/>
                                        ) : null
                                    ) : null
                                )
                            })
                        }
                        </div>
                        <button className={`text-white bg-primary border border-1.5 border-primary rounded-md px-2 py-1 flex flex-row items-center space-x-2`} onClick={() => submit()}>
                            <span>Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnQuizFlash