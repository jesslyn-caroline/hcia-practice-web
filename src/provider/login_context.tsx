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
    isOnLoadLogin: false,

    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    login: () => {},
})

function LoginProvider({children} : {children : React.ReactNode}) {
    const navigate = useNavigate()

    const { loginUser, currentActiveRoute } = useContext(UserContext)
    const { setUserIdErrMessage, setPasswordErrMessage } = useContext(ErrorMessageContext)

    const [userId, setUserId] = useState<string>("")
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUserId(e.target.value)
    function userIdValidation():boolean {
        let valid:boolean = true

        if (userId === "") {
            setUserIdErrMessage("User ID is required")
            valid = false
        }
        else {
            setUserIdErrMessage("")
        }

        return valid
    }

    const [password, setPassword] = useState<string>("")
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)
    function passwordValidation():boolean {
        let valid:boolean = true

        if (password.length === 0) {
            setPasswordErrMessage("Password is required")
            valid = false
        }
        else {
            setPasswordErrMessage("")
        }

        return valid
    }

    const [isOnLoadLogin, setIsOnLoadLogin] = useState<boolean>(false)

    async function login():Promise<void> {
        let userIdValid:boolean = userIdValidation()
        let passwordValid:boolean = passwordValidation()

        if (!userIdValid || !passwordValid) return

        setIsOnLoadLogin(true)

        try {
            const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/user/login`, {userId, password})

            if (response.status === 200) {
                loginUser(response.data.user.userId, response.data.user.username, response.data.user.class, response.data.user.role)
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

        setIsOnLoadLogin(false)
    }

    function clearInputs():void {
        setUserId("")
        setPassword("")
    } 

    useEffect(() => {
        clearInputs()
    }, [currentActiveRoute])

    return (
        <LoginContext.Provider value={{userId, password, isOnLoadLogin, handleUserIdChange, handlePasswordChange, login}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider