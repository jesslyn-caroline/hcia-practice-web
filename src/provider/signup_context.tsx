import { createContext, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

export const SignupContext = createContext({
    message: "",

    userIdErrMessage: "",
    usernameErrMessage: "",
    passwordErrMessage: "",
    confirmPasswordErrMessage: "",
    studentClassErrMessage: "",

    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handleStudentClassChange: (e: React.ChangeEvent<HTMLSelectElement>) => { console.log(e.target.value) },

    signup: () => { console.log("signup") }
})

function SignupProvider({ children } : {children : React.ReactNode} ) {
    const navigate = useNavigate()

    const [message, setMessage] = useState<string>("")

    const [userId, setUserId] = useState<string>("")
    const [userIdErrMessage, setUserIdErrMessage] = useState<string>("")
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUserId(e.target.value)
    }

    const [username, setUsername] = useState<string>("")
    const [usernameErrMessage, setUsernameErrMessage] = useState<string>("")
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUsername(e.target.value)
    }

    const [password, setPassword] = useState<string>("")
    const [passwordErrMessage, setPasswordErrMessage] = useState<string>("")
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [confirmPasswordErrMessage, setConfirmPasswordErrMessage] = useState<string>("")
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setConfirmPassword(e.target.value)
    }

    const [studentClass, setStudentClass] = useState<string>("none")
    const [studentClassErrMessage, setStudentClassErrMessage] = useState<string>("")
    const handleStudentClassChange = (e: React.ChangeEvent<HTMLSelectElement>):void => {
        setStudentClass(e.target.value)
    }

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

    async function signup():Promise<void> {
        let valid = validation()

        if (!valid) return;

        const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/user", 
            {userId, username, password, class: studentClass, role: "student"})
        
        setMessage(response.data.message)

        if (response.status === 201) navigate("/login")
    }

    return (
        <SignupContext.Provider value={{ message, userIdErrMessage, usernameErrMessage, passwordErrMessage, confirmPasswordErrMessage, studentClassErrMessage, handleUserIdChange, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange, handleStudentClassChange, signup }}>
            {children}
        </SignupContext.Provider>
    )
}

export default SignupProvider