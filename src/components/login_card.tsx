import { Link } from "react-router"
import { useContext } from "react"

import { UserContext } from "../provider/user_context"
import { ErrorMessageContext } from "../provider/error_message_context"
import InputField from "./field/input_field"

function LoginCard() {

    const { userId, password, handleUserIdChange, handlePasswordChange, login } = useContext(UserContext)

    const { userIdErrMessage, passwordErrMessage, resetErrMessage } = useContext(ErrorMessageContext)

    return(
        <div className={`w-full h-full flex justify-center pt-14`}>
            <div className={`max-w-[400px] w-full h-fit border rounded-xl border-accent-2 py-8 px-6 lg:px-10 flex flex-col items-center`}>
                <h1 className={`text-lg font-semibold`}>Log In</h1>
                <div className={`w-full mt-10 flex flex-col space-y-8`}>
                    <InputField handleInputChange={handleUserIdChange} 
                        inputType="text"
                        errMessage={userIdErrMessage} 
                        placeholderValue={"Admin ID / Student ID"} 
                        idValue={"userId"} 
                        labelValue={"User ID"}
                        value={userId} />
                    <InputField handleInputChange={handlePasswordChange} 
                        inputType="password"
                        errMessage={passwordErrMessage} 
                        placeholderValue={"Enter your password"} 
                        idValue={"password"} 
                        labelValue={"Password"}
                        value={password} />
                    <button className={`w-full h-fit bg-primary py-2 rounded-md`} onClick={login}>
                        <span className={`text-white text-sm font-medium`}>Log In</span>
                    </button>
                </div>
                <div className={`w-full mt-6`}>
                    <h3>
                        Don't have an account? <Link to="/signup" className={`text-blue-600 underline`} onClick={resetErrMessage}>Sign up</Link>
                    </h3>
                </div>
            </div>
        </div>  
    )
}

export default LoginCard