import { useContext } from "react"
import { Link } from "react-router"

import { SignupContext } from "../provider/signup_context"
import { ErrorMessageContext } from "../provider/error_message_context"
import InputField from "./field/input_field"
// import SelectField from "./field/select_field"
import ActionButton from "./action_button"

function SignupCard() {
    const { userId, 
        username, 
        password, 
        confirmPassword,
        isOnLoadSignup, 
        handleUserIdChange,
        handleUsernameChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        signup,
    } = useContext(SignupContext)

    const {
        userIdErrMessage,
        usernameErrMessage,
        passwordErrMessage,
        confirmPasswordErrMessage,
    } = useContext(ErrorMessageContext)

    return(
        <div className={`w-full h-full flex justify-center py-14`}>
            <div className={`max-w-[400px] w-full h-fit border rounded-xl border-accent-2 py-8 px-6 lg:px-10 flex flex-col items-center`}>
                <h1 className={`text-lg text-text font-semibold`}>Create Account</h1>
                <div className={`w-full mt-8 flex flex-col space-y-8`}>
                    <InputField handleInputChange={handleUserIdChange} 
                        inputType="text"
                        errMessage={userIdErrMessage} 
                        placeholderValue={"Enter your Student ID"} 
                        idValue={"userId"} 
                        labelValue={"Student ID"}
                        value={userId} />
                    <InputField handleInputChange={handleUsernameChange} 
                        inputType="text"
                        errMessage={usernameErrMessage} 
                        placeholderValue={"Enter your name"} 
                        idValue={"studentName"}
                        labelValue="Name"
                        value={username} />
                    <InputField handleInputChange={handlePasswordChange} 
                        inputType="password"
                        errMessage={passwordErrMessage} 
                        placeholderValue={"Enter your password"} 
                        idValue={"password"}
                        labelValue="Password"
                        value={password} />
                    <InputField handleInputChange={handleConfirmPasswordChange}
                        inputType="password"
                        errMessage={confirmPasswordErrMessage}
                        placeholderValue={"Confirm your password"}
                        idValue={"confirmPassword"}
                        labelValue="Confirm Password"
                        value={confirmPassword} />
                    <ActionButton action={signup} 
                        text={"Sign Up"} icon={""} isOnLoad={isOnLoadSignup} />
                </div>
                <div className={`w-full mt-6`}>
                    <h3>Already have account? <Link to="/login" className={`text-blue-600 underline`}>Log In</Link></h3>
                </div>
            </div>
        </div>
    )
}

export default SignupCard