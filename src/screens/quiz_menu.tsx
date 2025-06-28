import { Link } from "react-router"
import ActionButton from "../components/action_button"
import QuizMenuHooks from "../hooks/quiz_menu_hooks"

function QuizMenu() {

    const {history} = QuizMenuHooks()

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-shapes-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Quiz Menu</h1>
            <Link to="/quiz/new">
                <ActionButton action={() => {}} text="Start Quiz" icon="ri-lightbulb-flash-fill" />
            </Link>
            <h1 className={`text-md font-semibold my-6`}>Recently Taken</h1>
            <div className={`max-w-screen mb-20 overflow-x-scroll scroll-bar-hidden`}>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-gray-500 uppercase">
                    <tr>
                        <th scope="col" className="w-12 font-medium">No.</th>
                        <th scope="col" className="w-60 px-6 py-3 font-medium text-start">Quiz Title</th>
                        <th scope="col" className="px-6 py-3 font-medium">Time</th>
                        <th scope="col" className="px-6 py-3 font-medium">Type</th>
                        <th scope="col" className="font-medium">Score</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        ...history.map((quiz, index) => { 
                            return (
                            <tr>
                                <td className="px-6 py-3">{index + 1}</td>
                                <td className="px-6 py-3">{quiz.title}</td>
                                <td className="px-6 py-3 text-center">{quiz.time}</td>
                                <td className="px-6 py-3 text-center">{quiz.type}</td>
                                <td className="px-6 py-3 text-center">{quiz.score}</td>
                                <td className="px-6 py-3 text-center">
                                    <Link to={`/quiz/result/${quiz.quizId}`}>
                                        VIEW
                                    </Link>
                                </td>
                            </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>

            </div>
        </div>
    )
}

export default QuizMenu