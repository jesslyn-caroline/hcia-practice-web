import { createContext, useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

import { ErrorMessageContext } from "./error_message_context"
import toast_error from "../components/toast/toast_error"
import toast_success from "../components/toast/toast_success"

export const UserContext = createContext({
    userId: "",
    password: "", 
    username: "",
    studentClass: "",
    role: "",

    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    login: () => {}
})

function UserProvider({children} : {children : React.ReactNode}) {
    const navigate = useNavigate()

    const { setUserIdErrMessage, setPasswordErrMessage } = useContext(ErrorMessageContext)

    const [userId, setUserId] = useState<string>(getDataFromSession("userId"))

    const [password, setPassword] = useState<string>("")

    const [username, setUsername] = useState<string>(getDataFromSession("username"))
    const [studentClass, setStudentClass] = useState<string>(getDataFromSession("studentClass"))
    const [role, setRole] = useState<string>(getDataFromSession("role"))

    function handleUserIdChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setUserId(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setPassword(e.target.value)
    }

    function getDataFromSession(data: string):string {
        return sessionStorage.getItem(data) || ""
    }

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

    async function login():Promise<void> {
        let valid:boolean = validation()

        if (!valid) return

        try {
            const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/user/login`, {userId, password})
            
            console.log(response)

            if (response.status === 200) {
                setUsername(response.data.user.username)
                setStudentClass(response.data.user.class)
                setRole(response.data.user.role)

                sessionStorage.setItem("userId", response.data.user.userId)
                sessionStorage.setItem("username", response.data.user.username)
                sessionStorage.setItem("studentClass", response.data.user.class)
                sessionStorage.setItem("role", response.data.user.role)

                setPassword("")

                toast_success(response.data.message)

                setTimeout(() => {
                    navigate("/")
                }, 3000)
                console.log(response.data.username)
            }
        }
        catch (err:any) {
            console.log(err)
            toast_error(err.response.data.message)
        }
    }

    return (
        <UserContext.Provider value={{userId, username, password, studentClass, role,  handleUserIdChange, handlePasswordChange, login}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider