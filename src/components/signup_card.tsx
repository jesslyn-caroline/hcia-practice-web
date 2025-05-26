import { useContext } from "react"
import { Link } from "react-router"

import { SignupContext } from "../provider/signup_context"

function SignupCard() {
    const { userIdErrMessage, 
        usernameErrMessage, 
        passwordErrMessage, 
        confirmPasswordErrMessage, 
        studentClassErrMessage, 
        handleUserIdChange,
        handleUsernameChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleStudentClassChange,
        signup
     } = useContext(SignupContext)

    return(
        // <SignupProvider>
            <div className={`w-full h-full flex justify-center py-14`}>
            {/* Sign Up Card */}
            <div className={`max-w-[400px] w-full h-fit border rounded-xl border-greyist py-8 px-6 lg:px-10 flex flex-col items-center`}>
                <h1 className={`text-lg text-text font-semibold`}>Create Account</h1>

                <div className={`w-full mt-8 flex flex-col space-y-8`}>
                    <div className={`w-full text-sm text-text`}>
                        <label className={`font-medium`}>Student ID</label>
                        <input type="text" className={`w-full py-2 outline-none border-b-2 border-text`} id="studentID" placeholder="Enter your Student ID" onChange={handleUserIdChange}></input>
                        <div className={`${userIdErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{userIdErrMessage}</div>
                    </div>
                    <div className={`w-full text-sm text-text`}>
                        <label className={`font-medium`}>Name</label>
                        <input type="text" className={`w-full py-2 outline-none border-b-2 border-text`} id="studentName" placeholder="Enter your name" onChange={handleUsernameChange}></input>
                        <div className={`${usernameErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{usernameErrMessage}</div>
                    </div>
                    <div className={`w-full text-sm text-text`}>
                        <label className={`font-medium`}>Password</label>
                        <input type="password" className={`w-full py-2 outline-none border-b-2 border-text`} id="password" placeholder="Enter your password" onChange={handlePasswordChange}></input>
                        <div className={`${passwordErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{passwordErrMessage}</div>
                    </div>
                    <div className={`w-full text-sm text-text`}>
                        <label className={`font-medium`}>Confirm Password</label>
                        <input type="password" className={`w-full py-2 outline-none border-b-2 border-text`} id="confirmPassword" placeholder="Confirm your password" onChange={handleConfirmPasswordChange}></input>
                        <div className={`${confirmPasswordErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{confirmPasswordErrMessage}</div>
                    </div>
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
                    <h3 className={`text-sm`}>Already have account? <Link to="/login" className={`text-blue-600 underline`}>Log In</Link></h3>
                </div>
            </div>
        </div>
    // </SignupProvider>
    )
}

export default SignupCard