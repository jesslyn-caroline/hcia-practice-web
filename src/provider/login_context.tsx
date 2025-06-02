import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

import { ErrorMessageContext } from "./error_message_context"
import toast_error from "../components/toast/toast_error"
import toast_success from "../components/toast/toast_success"
import { UserContext } from "./user_context"

export const LoginContext = createContext({
    userId: "",
    password: "", 
    isOnLoad: false,

    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    login: () => {},
})

function LoginProvider({children} : {children : React.ReactNode}) {
    const navigate = useNavigate()

    const { setUserId, setUsername, setStudentClass, setRole, currentActiveRoute } = useContext(UserContext)
    const { setUserIdErrMessage, setPasswordErrMessage } = useContext(ErrorMessageContext)

    const [userId, setUserIdVal] = useState<string>("")
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUserIdVal(e.target.value)

    const [password, setPassword] = useState<string>("")
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)

    function validation():boolean {
        let valid:boolean = true

        if (userId === "") {
            setUserIdErrMessage("User ID is required")
            valid = false
        }
        else setUserIdErrMessage("")

        if (password.length === 0) {
            setPasswordErrMessage("Password is required")
            valid = false
        }
        else setPasswordErrMessage("")

        return valid
    }

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)
    async function login():Promise<void> {
        let valid:boolean = validation()

        if (!valid) return

        setIsOnLoad(true)

        try {
            const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/user/login`, {userId, password})

            if (response.status === 200) {
                setUserId(response.data.user.userId)
                setUsername(response.data.user.username)
                setStudentClass(response.data.user.class)
                setRole(response.data.user.role)

                sessionStorage.setItem("userId", response.data.user.userId)
                sessionStorage.setItem("username", response.data.user.username)
                sessionStorage.setItem("class", response.data.user.class)
                sessionStorage.setItem("role", response.data.user.role)

                toast_success(response.data.message)
                
                setTimeout(() => {
                    navigate("/")
                    clearInputs()
                }, 3000)
            }
        }
        catch (err:any) {
            toast_error(err.response.data.message)
        }

        setIsOnLoad(false)
    }

    function clearInputs():void {
        setUserId("")
        setPassword("")
    } 

    useEffect(() => {
        clearInputs()
    }, [currentActiveRoute])

    return (
        <LoginContext.Provider value={{userId, password, isOnLoad, handleUserIdChange, handlePasswordChange, login}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider