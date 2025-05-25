import { Link } from "react-router"

function Login() {
    return(
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] max-h-[1040px] w-screen h-screen bg-background flex flex-col`}>
                
                {/* Header */}
                <div className={`w-full min-h-14 h-14 bg-accent border-b-1 border-greyist px-10 lg:px-20 flex items-center`}>
                    <h1 className={`text-xl text-primary font-semibold`}>HCIA Practice</h1>
                </div>

                
                <div className={`w-full h-full px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 lg:space-x-20`}>

                    <div className={`w-full h-full flex items-center justify-center`}>
                        {/* Login Card */}
                        <div className={`max-w-[400px] w-full h-fit border rounded-xl border-greyist py-8 px-6 lg:px-10 flex flex-col items-center`}>
                            <h1 className={`text-lg text-text font-semibold`}>Log In</h1>

                            <div className={`w-full mt-10 flex flex-col space-y-8`}>
                                <div className={`w-full text-sm text-text `}>
                                    <label className={`font-medium`}>Student ID</label>
                                    <input type="text" className={`w-full h-10 outline-none border-b-2 border-text`} id="studentID" placeholder="Enter your Student ID"></input>
                                </div>
                                <div className={`w-full text-sm text-text `}>
                                    <label className={`font-medium`}>Password</label>
                                    <input type="password" className={`w-full h-10 outline-none border-b-2 border-text`} id="password" placeholder="Enter your password"></input>
                                </div>
                                <button className={`w-full h-fit bg-primary py-2 rounded-md`}>
                                    <span className={`text-white text-sm font-medium`}>Log In</span>
                                </button>
                            </div>

                            <div className={`w-full mt-6`}>
                                <h3 className={`text-sm`}>Don't have an account? <Link to="/signup" className={`text-blue-600 underline`}>Sign up</Link></h3>
                            </div>
                        </div>
                    </div>

                    <div className={`hidden lg:flex items-center`}>
                        <img src="/images/data-extraction-pana.png" alt="" className={`w-md`}/>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default Login