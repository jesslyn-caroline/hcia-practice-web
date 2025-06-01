import { createContext, useState } from "react";

export const UserContext = createContext({
    userId: "",
    username: "",
    studentClass: "",
    role: "",

    setUserId: (userId: string) => { console.log(userId) },
    setUsername: (username: string) => { console.log(username) },
    setStudentClass: (studentClass: string) => { console.log(studentClass) },
    setRole: (role: string) => { console.log(role) },
})

function UserProvider({children}: {children: React.ReactNode}) {
    const [userId, setUserId] = useState<string>(getDataFromSession("userId"))
    const [username, setUsername] = useState<string>(getDataFromSession("username"))
    const [studentClass, setStudentClass] = useState<string>(getDataFromSession("class"))
    const [role, setRole] = useState<string>(getDataFromSession("role"))

    function getDataFromSession(data: string):string {
        return sessionStorage.getItem(data) || ""
    }

    return (
        <UserContext.Provider value={{userId, username, studentClass, role, setUserId, setUsername, setStudentClass, setRole}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider