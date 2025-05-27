import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../provider/user_context"

function Home() {
    const { username } = useContext(UserContext)

    return (
        <div>
            <h1>Hello {username}</h1>
        </div>
    )
}

export default Home