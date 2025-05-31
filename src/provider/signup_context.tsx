import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

import { ErrorMessageContext } from "./error_message_context"
import toast_success from "../components/toast/toast_success"
import toast_error from "../components/toast/toast_error"

export const SignupContext = createContext({
    userId: "",
    username: "",
    password: "",
    confirmPassword: "",
    isOnLoad: false,

    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleStudentClassChange: (e: React.ChangeEvent<HTMLSelectElement>) => { console.log(e.target.value) },

    signup: () => { console.log("signup") }
})

function SignupProvider({ children } : {children : React.ReactNode} ) {
    const navigate = useNavigate()

    const { setUserIdErrMessage, setUsernameErrMessage, setPasswordErrMessage, setConfirmPasswordErrMessage, setStudentClassErrMessage } = useContext(ErrorMessageContext)

    const [userId, setUserId] = useState<string>("")
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUserId(e.target.value)

    const [username, setUsername] = useState<string>("")
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUsername(e.target.value)

    const [password, setPassword] = useState<string>("")
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>):void => setConfirmPassword(e.target.value)

    const [studentClass, setStudentClass] = useState<string>("IF-A Pagi")
    const handleStudentClassChange = (e: React.ChangeEvent<HTMLSelectElement>):void => setStudentClass(e.target.value)

    function validation():boolean {
        let valid:boolean = true

        if (userId === "") {
            setUserIdErrMessage("User ID is required")
            valid = false
        }
        else if (userId.length !== 9) {
            setUserIdErrMessage("User ID must be 8 characters long")
            valid = false
        }
        else setUserIdErrMessage("")

        if (username.trim() === "") {
            setUsernameErrMessage("Username is required")
            valid = false
        }
        else setUsernameErrMessage("")
        
        if (password === "") {
            setPasswordErrMessage("Password is required")
            valid = false
        }
        else if (password.length < 8) {
            setPasswordErrMessage("Password must be at least 8 characters long")
            valid = false
        }
        else setPasswordErrMessage("")

        if (confirmPassword === "") {
            setConfirmPasswordErrMessage("Confirm Password is required")
            valid = false
        }
        else if (confirmPassword !== password) {
            setConfirmPasswordErrMessage("Passwords do not match")
            valid = false
        }
        else setConfirmPasswordErrMessage("")

        if (studentClass === "none") {
            setStudentClassErrMessage("Student Class is required")
            valid = false
        }
        else setStudentClassErrMessage("")

        return valid
    }

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    async function signup():Promise<void> {
        let valid = validation()

        if (!valid) return;

        setIsOnLoad(true)

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/user/signup", 
                {userId, username, password, class: studentClass, role: "student"})
            
    
            if (response.status === 201) {
                toast_success(response.data.message)
    
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }
        }
        catch (err:any) {
            toast_error(err.response.data.message)
        }

        setIsOnLoad(false)
    }

    return (
        <SignupContext.Provider value={{ userId, username, password, confirmPassword, isOnLoad, handleUserIdChange, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange, handleStudentClassChange, signup }}>
            {children}
        </SignupContext.Provider>
    )
}

export default SignupProvider