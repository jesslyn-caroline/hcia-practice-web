import { createContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import { toast, Bounce } from "react-toastify"

export const UserContext = createContext({
    userId: "", 
    username: "",
    studentClass: "",
    role: "",
    userIdErrMessage: "",
    passwordErrMessage: "",
    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    login: () => {}
})

function UserProvider({children} : {children : React.ReactNode}) {
    const navigate = useNavigate()

    const [userId, setUserId] = useState<string>("")
    const [userIdErrMessage, setUserIdErrMessage] = useState<string>("")

    const [password, setPassword] = useState<string>("")
    const [passwordErrMessage, setPasswordErrMessage] = useState<string>("")

    const [username, setUsername] = useState<string>("")
    const [studentClass, setStudentClass] = useState<string>("")
    const [role, setRole] = useState<string>("")

    function handleUserIdChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setUserId(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setPassword(e.target.value)
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

            if (response.status === 200) {
                setUsername(response.data.username)
                setStudentClass(response.data.studentClass)
                setRole(response.data.role)

                setPassword("")

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })

                setTimeout(() => {
                    navigate("/")
                }, 3000)
            }
        }
        catch (err:any) {
            console.log(err)
            toast.error(err.response.data.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    return (
        <UserContext.Provider value={{userId, username, studentClass, role, userIdErrMessage, passwordErrMessage, handleUserIdChange, handlePasswordChange, login}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider