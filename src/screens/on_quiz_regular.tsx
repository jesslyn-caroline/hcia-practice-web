import { useState } from 'react'
import OnQuizRegularHooks from '../hooks/on_quiz_regular_hooks'
import SingleAnswerMultipleChoiceOption from '../components/choices/single_answer_multiple_choice_option'
import MultipleAnswerMultipleChoiceOption from '../components/choices/multiple_answer_multiple_choice_option'
import InputField from '../components/field/input_field'
import TrueOrFalseOption from '../components/choices/true-or-false-option'

function OnQuizRegular() {

    const { timeLeft, question, currentQuestion, answerAttemptValue, handleCurrentQuestionChange, isAnswerAttemptSelected, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer, submit } = OnQuizRegularHooks()
   
    
    const [isOpenedSideBar, setIsOpenedSideBar] = useState<boolean>(true)

    function toggleSideBar(event: string) {
        if (event === "close") setIsOpenedSideBar(false)
        else setIsOpenedSideBar(true)
    }

    const time = () => {
        const hours = Math.floor(timeLeft / 3600)
        const minutes = Math.floor((timeLeft % 3600) / 60)
        const seconds = timeLeft % 60
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    return (
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] w-full h-full bg-background`}>
                {/* Overlay */}
                <div className={`${isOpenedSideBar? "" : "hidden"} md:hidden absolute w-full h-screen bg-black opacity-50 z-10 transition-allzz`} onClick={() => toggleSideBar("close")}/>

                {/* SideBar */}
                <div className={`${isOpenedSideBar? "translate-x-0" : "-translate-x-full"} z-20 absolute left-0 w-2xs h-screen bg-background ease-in-out duration-200`}>
                    <div className={`h-14 px-7 md:px-9 flex items-center`}>
                        <i className={`text-2xl ri-menu-fold-line cursor-pointer`} onClick={() => toggleSideBar("close")}/>
                    </div>
                    <div className={`px-4 md:px-6 py-2 flex flex-col space-y-3 overflow-y-scroll scroll-bar-hidden cursor-pointer`}>
                        {
                            ...question.map((_, index) => {
                                return (
                                    <div className={`flex flex-row items-center space-x-4 px-3 py-2 ${currentQuestion === index? "bg-gray-100 font-semibold" : ""} hover:bg-gray-100 rounded-md transition-colors`} onClick={() => handleCurrentQuestionChange(index)}>
                                        <span className={`text-sm`}>Question {index + 1}</span>
                                    </div> 
                                )
                            })

                        }
                    </div>
                </div>

                {/* Content */}
                <div className={`w-full h-full flex flex-row`}>
                    <div className={`hidden ${isOpenedSideBar? "md:block" : "hidden"} min-w-2xs w-2xs transition-discrete`} />
                    <div className={`min-h-screen w-full h-screen border-l-1 border-accent-2 flex flex-col`}>
                        <div className={`min-h-14 h-14 px-4 md:px-10 bg-primary flex justify-between items-center`}>
                            <i className={`${isOpenedSideBar? "opacity-0" : "opacity-100"} text-2xl text-white ri-list-ordered-2 cursor-pointer`} onClick={() => toggleSideBar("open")}/>
                            <span className={`text-white`}>Time Left: {time()} </span>
                        </div>
                        <div className={`px-4 md:px-10 py-10 space-y-4 overflow-y-scroll scroll-bar-hidden`}>
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
                            <div className={`flex flex-row space-x-4 mt-4`}>
                                <button className={`text-primary bg-background border border-1.5 border-primary rounded-md px-2 py-1 flex flex-row items-center space-x-2 cursor-pointer`} onClick={() => handleCurrentQuestionChange(currentQuestion - 1)}>
                                    <i className="text-xl ri-arrow-left-line"/>
                                    <span>Previous</span>
                                </button>
                                <button className={`text-primary bg-background border border-1.5 border-primary rounded-md px-2 py-1 flex flex-row items-center space-x-2 cursor-pointer`} onClick={() => handleCurrentQuestionChange(currentQuestion + 1)}>
                                    <span>Next</span>
                                    <i className="text-xl ri-arrow-right-line"/>
                                </button>
                                {
                                    currentQuestion === question.length - 1? (
                                        <button className={`text-white bg-primary border border-1.5 border-primary rounded-md px-2 py-1 flex flex-row items-center space-x-2`} onClick={() => submit()}>
                                            <span>Submit</span>
                                        </button>
                                    ) : null
                                }
                            </div>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnQuizRegular