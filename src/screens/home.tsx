import { Link } from "react-router"

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/create-question">Create Question</Link>
        </div>
    )
}

export default Home