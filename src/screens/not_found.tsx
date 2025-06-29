import { useNavigate } from "react-router"
import { useContext, useState } from "react"

import { UserContext } from "../provider/user_context"

function NotFound() {
    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    const [second, setSecond] = useState<number>(5)

    setInterval(() => {
        setSecond(second - 1)
    }, 1000)

    setTimeout(() => {
        if (user.role === "") navigate("/login")
        else navigate("/")
    }, 6000)

    return (
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] w-full h-screen bg-background`}>
                <div className={`w-full min-h-14 h-14 bg-accent border-b-1 border-accent-2 px-6 lg:px-20 flex items-center justify-between`}>
                    <h1 className={`text-xl text-primary font-semibold`}>HCIA Practice</h1>
                </div>
                <div className={`w-full h-full place-items-center`}>
                    <img src="/images/404-error-rafiki.png" alt="" className={`w-sm`}/>
                    <h1 className={`-mt-5 text-md font-semibold`}>We will send you back to the {user.role === ""? "Login" : "Home"} in {second} s</h1>
                </div>
            </div>
        </div>
    )
}

export default NotFound