// import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../provider/user_context"

function Home() {
    const { username } = useContext(UserContext)

    return (
        <div>
            <i className={`text-5xl ri-robot-2-line`}></i>
            <h1 className={`text-xl font-semibold mt-5`}>Hello, {username}</h1>
        </div>
    )
}

export default Home
