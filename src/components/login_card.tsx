import { Link } from "react-router"
import { useContext } from "react"

import { UserContext } from "../provider/user_context"

function LoginCard() {

    const { handleUserIdChange, handlePasswordChange, login } = useContext(UserContext)

    return(
        <div className={`w-full h-full flex justify-center pt-14`}>
            {/* Login Card */}
            <div className={`max-w-[400px] w-full h-fit border rounded-xl border-greyist py-8 px-6 lg:px-10 flex flex-col items-center`}>
                <h1 className={`text-lg text-text font-semibold`}>Log In</h1>

                <div className={`w-full mt-10 flex flex-col space-y-8`}>
                    <div className={`w-full text-sm text-text `}>
                        <label className={`font-medium`}>Student ID</label>
                        <input type="text" onChange={handleUserIdChange} className={`w-full h-10 outline-none border-b-2 border-text`} id="userId" placeholder="Admin ID / Student iD"></input>
                    </div>
                    <div className={`w-full text-sm text-text `}>
                        <label className={`font-medium`}>Password</label>
                        <input type="password"  onChange={handlePasswordChange} className={`w-full h-10 outline-none border-b-2 border-text`} id="password" placeholder="Enter your password"></input>
                    </div>
                    <button className={`w-full h-fit bg-primary py-2 rounded-md`} onClick={login}>
                        <span className={`text-white text-sm font-medium`}>Log In</span>
                    </button>
                </div>

                <div className={`w-full mt-6`}>
                    <h3 className={`text-sm`}>Don't have an account? <Link to="/signup" className={`text-blue-600 underline`}>Sign up</Link></h3>
                </div>
            </div>
        </div>  
    )
}

export default LoginCard