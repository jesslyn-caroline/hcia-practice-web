import { createContext, useState} from "react"
import axios from "axios"

export const UserContext = createContext({
    userId: "", 
    userName: "",
    password: "",
    studentClass: "",
    handleUserIdChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    login: () => {}
})

function UserProvider({children} : {children : React.ReactNode}) {
    const [userId, setUserId] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [studentClass, setStudentClass] = useState<string>("")

    function handleUserIdChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setUserId(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setPassword(e.target.value)
    }

    async function login() {
        console.log(userId)
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/user/${userId}`)
            setUserName(response.data.username)
            setStudentClass(response.data.class)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <UserContext.Provider value={{userId, userName, password, studentClass, handleUserIdChange, handlePasswordChange, login}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider