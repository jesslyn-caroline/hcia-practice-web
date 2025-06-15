import { useContext } from "react"
import ActionButton from "../../components/action_button"
import InputField from "../../components/field/input_field"
import ClassEnterHooks from "../../hooks/class_enter_hooks"
import { ErrorMessageContext } from "../../provider/error_message_context"

function ClassEnter() {

    const { classCode, handleClassCodeChange, enterClass, isOnLoadClassEnter } = ClassEnterHooks()
    const { classCodeErrMessage } = useContext(ErrorMessageContext)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-link mb-2`}/>
            <h1 className={`text-xl font-semibold`}>Join a Class</h1>
            <h2 className={`text-gray-400 font-semibold`}>Get code from your teacher</h2>
            <div className={`mt-4 flex flex-row space-x-4`}>
                <div className={`w-70`}>
                    <InputField handleInputChange={handleClassCodeChange} inputType="text" errMessage={classCodeErrMessage} placeholderValue="Code" idValue="class-code" value={classCode} />
                </div>
                <ActionButton action={enterClass} text="Enter" icon="" isOnLoad={isOnLoadClassEnter}/>
            </div>
        </div>
    )
}

export default ClassEnter