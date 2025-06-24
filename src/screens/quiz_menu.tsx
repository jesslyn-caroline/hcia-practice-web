import { Link } from "react-router"
import ActionButton from "../components/action_button"

function QuizMenu() {
    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-shapes-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Quiz Menu</h1>
            <Link to="/quiz/new">
                <ActionButton action={() => {}} text="Start Quiz" icon="ri-lightbulb-flash-fill" />
            </Link>
        </div>
    )
}

export default QuizMenu