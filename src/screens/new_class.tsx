import { useContext } from "react"
import InputField from "../components/field/input_field"
import SelectField from "../components/field/select_field"
import NewClassHooks from "../hooks/new_class_hooks"
import { ErrorMessageContext } from "../provider/error_message_context"
import ActionButton from "../components/action_button"

function NewClass() {

    const { className, handleClassName, startYear, handleStartYear, endYear, handleEndYear, addNewClass, isOnLoadAddNewClass } = NewClassHooks()
    const { academicYearErrMessage } = useContext(ErrorMessageContext)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-function-add-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-6`}>New Class</h1>
            <div className={`space-y-3`}>
                <div className={`w-full md:w-80`}>
                    <SelectField handleSelectChange={handleClassName} 
                        optionsValue={["IF-A Sore", "IF-B Sore", "IF-C Sore"]} 
                        optionsLabel={["IF-A Sore", "IF-B Sore", "IF-C Sore"]}
                        labelValue="Class Name" 
                        titleValue="classname"
                        errMessage=""
                        value={className} />
                </div>
                <div className={``}>
                    <h2 className={`font-semibold`}>Academic Year</h2>
                    <div className={`flex flex-row space-x-3 items-center`}>
                        <div className={`w-10`}>
                            <InputField handleInputChange={handleStartYear} inputType="text" errMessage="" placeholderValue="YYYY" idValue="start-year" value={startYear}/>
                        </div>
                        <span>&#8213;</span>
                        <div className={`w-10`}>
                            <InputField handleInputChange={handleEndYear} inputType="text" errMessage="" placeholderValue="YYYY" idValue="end-year" value={endYear} />
                        </div>
                    </div>
                    <div className={`mt-2 ${academicYearErrMessage === "" ? "hidden" : "absolute"} text-xs text-red-500`}>{academicYearErrMessage}</div>
                </div>
            </div>
            <div className={`mt-14`}>
                <ActionButton action={addNewClass} text="Create" icon="" isOnLoad={isOnLoadAddNewClass}/>
            </div>
        </div>
    ) 
}

export default NewClass