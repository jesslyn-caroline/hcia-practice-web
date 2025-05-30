import { useContext } from "react"
import { Link } from "react-router"

import { SignupContext } from "../provider/signup_context"
import { ErrorMessageContext } from "../provider/error_message_context"
import InputField from "./input_field"

function SignupCard() {
    const { 
        handleUserIdChange,
        handleUsernameChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleStudentClassChange,
        signup
    } = useContext(SignupContext)

    const {
        userIdErrMessage,
        usernameErrMessage,
        passwordErrMessage,
        confirmPasswordErrMessage,
        studentClassErrMessage,
        resetErrMessage
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
                        labelValue={"Student ID"}/>
                    <InputField handleInputChange={handleUsernameChange} 
                        inputType="text"
                        errMessage={usernameErrMessage} 
                        placeholderValue={"Enter your name"} 
                        idValue={"studentName"}
                        labelValue="Name" />
                    <InputField handleInputChange={handlePasswordChange} 
                        inputType="password"
                        errMessage={passwordErrMessage} 
                        placeholderValue={"Enter your password"} 
                        idValue={"password"}
                        labelValue="Password" />
                    <InputField handleInputChange={handleConfirmPasswordChange}
                        inputType="password"
                        errMessage={confirmPasswordErrMessage}
                        placeholderValue={"Confirm your password"}
                        idValue={"confirmPassword"}
                        labelValue="Confirm Password" />
                    <div className={`w-full text-sm text-text`}>
                        <label className={`font-medium`}>Class</label>
                        <select id="class" className={`w-full py-2 outline-none border-b-2 border-text`} title="Select your class" onChange={handleStudentClassChange}>
                            <option value="none" selected>Select your class</option>
                            <option value="IF-A Pagi">IF-A Pagi</option>
                            <option value="IF-B Pagi">IF-B Pagi</option>
                            <option value="IF-C Pagi">IF-C Pagi</option>
                            <option value="IF-A Sore">IF-A Sore</option>
                            <option value="IF-B Sore">IF-B Sore</option>
                            <option value="IF-C Sore">IF-C Sore</option>
                        </select>
                        <div className={`${studentClassErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{studentClassErrMessage}</div>
                    </div>
                    <button className={`w-full h-fit bg-primary py-2 rounded-md`} onClick={signup}>
                        <span className={`text-white text-sm font-medium`}>Sign up</span>
                    </button>
                </div>

                <div className={`w-full mt-6`}>
                    <h3>Already have account? <Link to="/login" className={`text-blue-600 underline`} onClick={resetErrMessage}>Log In</Link></h3>
                </div>
            </div>
        </div>
    )
}

export default SignupCard