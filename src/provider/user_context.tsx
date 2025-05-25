import { createContext, useState} from "react"

export const UserContext = createContext({
    studentID: "", 
    studentName: "",
    password: "",
    studentClass: "",
    handleStudentIDchange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value) },
    login: () => {}
})

function UserProvider({children} : {children : React.ReactNode}) {
    const [studentID, setStudentID] = useState<string>("")
    const [studentName, setStudentName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [studentClass, setStudentClass] = useState<string>("")

    function handleStudentIDchange(e: React.ChangeEvent<HTMLInputElement>):void {
        setStudentID(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setPassword(e.target.value)
    }

    function login() {
        setStudentName("") // dummy
        setStudentClass("") // dummy
        // fetch process

        return
    }

    return (
        <UserContext.Provider value={{studentID, studentName, password, studentClass, handleStudentIDchange, handlePasswordChange, login}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider