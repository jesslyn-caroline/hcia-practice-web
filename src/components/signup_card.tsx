import { useState } from "react"
import { Link } from "react-router"

function SignupCard() {

    const [studentID, setStudentID] = useState<string>("")
    const [studentIDErrMessage, setStudentIDErrMessage] = useState<string>("")
    const handleStudentIDchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentID(e.target.value)
    }

    const [studentName, setStudentName] = useState<string>("")
    const [studentNameErrMessage, setStudentNameErrMessage] = useState<string>("")
    const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentName(e.target.value)
    }

    const [password, setPassword] = useState<string>("")
    const [passwordErrMessage, setPasswordErrMessage] = useState<string>("")
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [confirmPasswordErrMessage, setConfirmPasswordErrMessage] = useState<string>("")
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const [studentClass, setStudentClass] = useState<string>("none")
    const [studentClassErrMessage, setStudentClassErrMessage] = useState<string>("")
    const handleStudentClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStudentClass(e.target.value)
    }

    const authentication = () => {
        if (studentID === "") setStudentIDErrMessage("Please enter your student ID")
        else if (studentID.length !== 9) setStudentIDErrMessage("Invalid Student ID")
        else setStudentIDErrMessage("")

        if (studentName.trim() === "") setStudentNameErrMessage("Please enter your name")
        else setStudentNameErrMessage("")
        
        if (password === "") setPasswordErrMessage("Please enter your password")
        else if (password.length < 8) setPasswordErrMessage("Password should be at least 8 characters long")
        else setPasswordErrMessage("")

        if (confirmPassword === "") setConfirmPasswordErrMessage("Please confirm your password")
        else if (confirmPassword !== password) setConfirmPasswordErrMessage("Password doesn't not match")
        else setConfirmPasswordErrMessage("")

        if (studentClass === "none") setStudentClassErrMessage("Please select a class")
        else setStudentClassErrMessage("")

        // auth process
    }

    return(
        <div className={`w-full h-full flex items-center justify-center py-14`}>
        {/* Sign Up Card */}
        <div className={`max-w-[400px] w-full h-fit border rounded-xl border-greyist py-8 px-6 lg:px-10 flex flex-col items-center`}>
            <h1 className={`text-lg text-text font-semibold`}>Create Account</h1>

            <div className={`w-full mt-8 flex flex-col space-y-8`}>
                <div className={`w-full text-sm text-text`}>
                    <label className={`font-medium`}>Student ID</label>
                    <input type="text" className={`w-full py-2 outline-none border-b-2 border-text`} id="studentID" placeholder="Enter your Student ID" onChange={handleStudentIDchange}></input>
                    <div className={`${studentIDErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{studentIDErrMessage}</div>
                </div>
                <div className={`w-full text-sm text-text`}>
                    <label className={`font-medium`}>Name</label>
                    <input type="text" className={`w-full py-2 outline-none border-b-2 border-text`} id="studentName" placeholder="Enter your name" onChange={handleStudentNameChange}></input>
                    <div className={`${studentNameErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{studentNameErrMessage}</div>
                </div>
                <div className={`w-full text-sm text-text`}>
                    <label className={`font-medium`}>Password</label>
                    <input type="password" className={`w-full py-2 outline-none border-b-2 border-text`} id="password" placeholder="Enter your password" onChange={handlePasswordChange}></input>
                    <div className={`${passwordErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{passwordErrMessage}</div>
                </div>
                <div className={`w-full text-sm text-text`}>
                    <label className={`font-medium`}>Confirm Password</label>
                    <input type="confirmPassword" className={`w-full py-2 outline-none border-b-2 border-text`} id="confirmPassword" placeholder="Confirm your password" onChange={handlePasswordChange}></input>
                    <div className={`${confirmPasswordErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{confirmPasswordErrMessage}</div>
                </div>
                <div className={`w-full text-sm text-text`}>
                    <label className={`font-medium`}>Class</label>
                    <select id="class" className={`w-full py-2 outline-none border-b-2 border-text`} title="Select your class" onChange={handleStudentClassChange}>
                        <option selected value="none">Select your class</option>
                        <option value="IF-A Pagi">IF-A Pagi</option>
                        <option value="IF-B Pagi">IF-B Pagi</option>
                        <option value="IF-C Pagi">IF-C Pagi</option>
                        <option value="IF-A Sore">IF-A Sore</option>
                        <option value="IF-B Sore">IF-B Sore</option>
                        <option value="IF-C Sore">IF-C Sore</option>
                    </select>
                    <div className={`${studentClassErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{studentClassErrMessage}</div>
                </div>
                <button className={`w-full h-fit bg-primary py-2 rounded-md`} onClick={authentication}>
                    <span className={`text-white text-sm font-medium`}>Sign up</span>
                </button>
            </div>

            <div className={`w-full mt-6`}>
                <h3 className={`text-sm`}>Already have account? <Link to="/login" className={`text-blue-600 underline`}>Log In</Link></h3>
            </div>
        </div>
    </div>
    )
}

export default SignupCard