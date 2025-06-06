import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router"

export const UserContext = createContext({
    userId: "",
    username: "",
    studentClass: "",
    role: "",
    userRoutes: [{link: "/", name: "Home", icon: "ri-home-2-line"}],
    currentActiveRoute: "",

    loginUser: (userId: string, username: string, studentClass: string, role: string) => { console.log(userId, username, studentClass, role) },
    logout: () => {},
})

interface RouteObject {
    link: string
    name: string
    icon: string
}

function UserProvider({children}: {children: React.ReactNode}) {
    const navigate = useNavigate()

    const [userId, setUserId] = useState<string>(getDataFromSession("userId"))
    const [username, setUsername] = useState<string>(getDataFromSession("username"))
    const [studentClass, setStudentClass] = useState<string>(getDataFromSession("class"))
    const [role, setRole] = useState<string>(getDataFromSession("role"))

    function loginUser(userId: string, username: string, studentClass: string, role: string):void {
        setUserId(userId)
        setUsername(username)
        setStudentClass(studentClass)
        setRole(role)

        sessionStorage.setItem("userId", userId)
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("class", studentClass)
        sessionStorage.setItem("role", role)
    }

    function logout():void {
        setUserId("")
        setUsername("")
        setStudentClass("")
        setRole("")

        sessionStorage.removeItem("userId")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("class")
        sessionStorage.removeItem("role")

        setTimeout(() => {
            navigate("/login")
        }, 3000)
    }

    const adminRoute: RouteObject[] = [
        {link: "/", name: "Home", icon: "ri-home-2-line"},
        {link: "/create-question", name: "Create Question", icon: "ri-list-check-2"},
        {link: "/question-list", name: "Question List", icon: "ri-list-check-2"},
    ]
    const userRoute: RouteObject[] = [
        {link: "/", name: "Home", icon: "ri-home-2-line"},
    ]

    const [userRoutes, setUserRoutes] = useState<RouteObject[]>([])

    const location = useLocation()
    const [currentActiveRoute, setCurrentActiveRoute] = useState<string>(location.pathname)
    useEffect(() => {
        setCurrentActiveRoute(location.pathname)

        if (location.pathname === "/login" && role !== "") navigate("/")
        else if (location.pathname === "/signup" && role !== "") navigate("/")
    }, [location])

    function getDataFromSession(data: string):string {
        return sessionStorage.getItem(data) || ""
    }

    useEffect(() => {
        if (role === "admin") setUserRoutes(adminRoute)
        else setUserRoutes(userRoute)
    }, [role])

    return (
        <UserContext.Provider value={{userId, username, studentClass, role, userRoutes, currentActiveRoute, loginUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider