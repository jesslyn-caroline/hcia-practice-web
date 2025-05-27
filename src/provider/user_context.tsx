import { createContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export const UserContext = createContext({
    userId: "", 
    message: "",
    username: "",
    studentClass: "",
    role: "",
    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    login: () => {}
})

function UserProvider({children} : {children : React.ReactNode}) {
    const navigate = useNavigate()

    const [userId, setUserId] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [message, setMessage] = useState<string>("")

    const [username, setUsername] = useState<string>("")
    const [studentClass, setStudentClass] = useState<string>("")
    const [role, setRole] = useState<string>("")

    function handleUserIdChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setUserId(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setPassword(e.target.value)
    }

    async function login():Promise<void> {
        try {
            const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/user/login`, {userId, password})

            if (response.status === 200) {
                setUsername(response.data.username)
                setStudentClass(response.data.studentClass)
                setRole(response.data.role)

                setPassword("")

                navigate("/")
            }
            
            setMessage(response.data.message)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <UserContext.Provider value={{userId, message, username, studentClass, role, handleUserIdChange, handlePasswordChange, login}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider