import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router"
import type { RouteObject } from "../model/route_object";
import type { UserModel } from "../model/user_model";

export const UserContext = createContext({
    user: { userId: "", username: "", classId: "", role: ""},
    userRoutes: [{link: "/", name: "Home", icon: "ri-home-2-line"}],
    currentActiveRoute: "",

    loginUser: (user: UserModel) => { console.log(user) },
    logout: () => {},
})

function UserProvider({children}: {children: React.ReactNode}) {
    const navigate = useNavigate()

    const [user, setUser] = useState<UserModel>(() => {
        const user = sessionStorage.getItem("user")
        return user? JSON.parse(user) : { userId: "", username: "", classId: "", role: ""}
    })

    function loginUser(user: UserModel):void {
       setUser(user)
       sessionStorage.setItem("user", JSON.stringify(user))
    }

    function logout():void {
        setUser({ userId: "", username: "", classId: "", role: ""})
        sessionStorage.removeItem("user")
        
        setTimeout(() => {
            navigate("/login")
        }, 3000)
    }

    const adminRoute: RouteObject[] = [
        {link: "/", name: "Home", icon: "ri-home-2-line"},
        {link: "/question/new", name: "Create Question", icon: "ri-menu-add-line"},
        {link: "/question", name: "Question List", icon: "ri-list-check-2"},
        {link: "/classes", name: "Classes", icon: "ri-group-3-line"},
    ]
    const userRoute: RouteObject[] = [
        {link: "/", name: "Home", icon: "ri-home-2-line"},
        {link: "/class", name: "Class", icon: "ri-group-3-line"},
    ]

    const [userRoutes, setUserRoutes] = useState<RouteObject[]>([])

    const location = useLocation()
    const [currentActiveRoute, setCurrentActiveRoute] = useState<string>(location.pathname)
    useEffect(() => {
        setCurrentActiveRoute(location.pathname)

        if (location.pathname === "/login" && user.role !== "") navigate("/")
        else if (location.pathname === "/signup" && user.role !== "") navigate("/")
    }, [location])

    useEffect(() => {
        if (user.role === "admin") setUserRoutes(adminRoute)
        else setUserRoutes(userRoute)
    }, [user.role])

    return (
        <UserContext.Provider value={{user, userRoutes, currentActiveRoute, loginUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider