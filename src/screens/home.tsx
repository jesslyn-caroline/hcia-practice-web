// import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../provider/user_context"

function Home() {
    const { user } = useContext(UserContext)

    return (
        <div>
            <i className={`text-5xl ri-robot-2-line`}></i>
            <div className={`mt-5 font-semibold`}>
                <h1 className={`text-xl`}>Hello, {user.username}</h1>
                <h2 className={`text-zinc-400`}>How are you today?</h2>
            </div>
        </div>
    )
}

export default Home
