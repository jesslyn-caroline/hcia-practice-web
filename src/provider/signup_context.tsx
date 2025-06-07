import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

import { ErrorMessageContext } from "./error_message_context"
import toast_success from "../components/toast/toast_success"
import toast_error from "../components/toast/toast_error"
import { UserContext } from "./user_context"

export const SignupContext = createContext({
    userId: "",
    username: "",
    password: "",
    confirmPassword: "",
    isOnLoadSignup: false,

    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleStudentClassChange: (e: React.ChangeEvent<HTMLSelectElement>) => { console.log(e.target.value) },

    signup: () => { console.log("signup") },
    clearInputs: () => { console.log("clearInputs") }
})

function SignupProvider({ children } : {children : React.ReactNode} ) {
    const navigate = useNavigate()

    const { setUserIdErrMessage, setUsernameErrMessage, setPasswordErrMessage, setConfirmPasswordErrMessage, setStudentClassErrMessage } = useContext(ErrorMessageContext)
    const { currentActiveRoute } = useContext(UserContext)

    const [userId, setUserId] = useState<string>("")
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUserId(e.target.value)
    function userIdValidation():boolean {
        let valid:boolean = true
        if (userId === "") {
            setUserIdErrMessage("User ID is required")
            valid = false
        }
        else if (userId.length !== 9) {
            setUserIdErrMessage("User ID must be 8 characters long")
            valid = false
        }
        else {
            setUserIdErrMessage("")
        }

        return valid
    }

    const [username, setUsername] = useState<string>("")
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUsername(e.target.value)
    function usernameValidation():boolean {
        let valid:boolean = true

        if (username.trim() === "") {
            setUsernameErrMessage("Username is required")
            valid = false
        }
        else {
            setUsernameErrMessage("")
        }

        return valid
    }

    const [password, setPassword] = useState<string>("")
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)
    function passwordValidation():boolean {
        let valid:boolean = true

        if (password === "") {
            setPasswordErrMessage("Password is required")
            valid = false
        }
        else if (password.length < 8) {
            setPasswordErrMessage("Password must be at least 8 characters long")
            valid = false
        }
        else {
            setPasswordErrMessage("")
        }

        return valid
    }

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>):void => setConfirmPassword(e.target.value)
    function confirmPasswordValidation():boolean {
        let valid:boolean = true

        if (confirmPassword === "") {
            setConfirmPasswordErrMessage("Confirm Password is required")
            valid = false
        }
        else if (confirmPassword !== password) {
            setConfirmPasswordErrMessage("Passwords do not match")
            valid = false
        }
        else {
            setConfirmPasswordErrMessage("")
        }

        return valid
    }

    const [studentClass, setStudentClass] = useState<string>("IF-A Pagi")
    const handleStudentClassChange = (e: React.ChangeEvent<HTMLSelectElement>):void => setStudentClass(e.target.value)
    function studentClassValidation():boolean {
        let valid:boolean = true

        if (studentClass === "none") {
            setStudentClassErrMessage("Student Class is required")
            valid = false
        }
        else {
            setStudentClassErrMessage("")
        }

        return valid
    }

    const [isOnLoadSignup, setIsOnLoadSignup] = useState<boolean>(false)

    async function signup():Promise<void> {
        let userIdValid:boolean = userIdValidation()
        let usernameValid:boolean = usernameValidation()
        let passwordValid:boolean = passwordValidation()
        let confirmPasswordValid:boolean = confirmPasswordValidation()
        let studentClassValid:boolean = studentClassValidation()

        if (!userIdValid || !usernameValid || !passwordValid || !confirmPasswordValid || !studentClassValid) return;

        setIsOnLoadSignup(true)

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/user/signup", 
                {userId, username, password, class: studentClass, role: "student"})
    
            if (response.status === 201) {
                toast_success(response.data.message)
    
                setTimeout(() => {
                    navigate("/login")
                    clearInputs()
                }, 3000)
            }
        }
        catch (err:any) {
            toast_error(err.response.data.message)
        }

        setIsOnLoadSignup(false)
    }

    function clearInputs() {
        setUserId("")
        setUsername("")
        setPassword("")
        setConfirmPassword("")
        setStudentClass("IF-A Pagi")
    }

    useEffect(() => {
        clearInputs()
    }, [currentActiveRoute])

    return (
        <SignupContext.Provider value={{ userId, username, password, confirmPassword, isOnLoadSignup, handleUserIdChange, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange, handleStudentClassChange, signup, clearInputs }}>
            {children}
        </SignupContext.Provider>
    )
}

export default SignupProvider