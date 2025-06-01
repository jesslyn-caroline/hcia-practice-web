import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    userId: "",
    username: "",
    studentClass: "",
    role: "",
    userRoutes: [{link: "/", name: "Home", icon: "ri-home-2-line"}],
    currentActiveRoute: "",

    setUserId: (userId: string) => { console.log(userId) },
    setUsername: (username: string) => { console.log(username) },
    setStudentClass: (studentClass: string) => { console.log(studentClass) },
    setRole: (role: string) => { console.log(role) },
    setCurrentActiveRoute: (route: string) => { console.log(route) },
})

interface RouteObject {
    link: string
    name: string
    icon: string
}

function UserProvider({children}: {children: React.ReactNode}) {
    const [userId, setUserId] = useState<string>(getDataFromSession("userId"))
    const [username, setUsername] = useState<string>(getDataFromSession("username"))
    const [studentClass, setStudentClass] = useState<string>(getDataFromSession("class"))
    const [role, setRole] = useState<string>(getDataFromSession("role"))

    const adminRoute: RouteObject[] = [
        {link: "/", name: "Home", icon: "ri-home-2-line"},
        {link: "/create-question", name: "Create Question", icon: "ri-list-check-2"},
    ]
    const userRoute: RouteObject[] = [
        {link: "/", name: "Home", icon: "ri-home-2-line"},
    ]

    const [userRoutes, setUserRoutes] = useState<RouteObject[]>([])

    const [currentActiveRoute, setCurrentActiveRoute] = useState<string>(() => {
        const currentActiveRoute = sessionStorage.getItem("currentActiveRoute") || "/"
        return currentActiveRoute
    })

    function getDataFromSession(data: string):string {
        return sessionStorage.getItem(data) || ""
    }

    useEffect(() => {
        if (role === "admin") setUserRoutes(adminRoute)
        else setUserRoutes(userRoute)
    }, [role])

    return (
        <UserContext.Provider value={{userId, username, studentClass, role, userRoutes, currentActiveRoute, setUserId, setUsername, setStudentClass, setRole, setCurrentActiveRoute}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider