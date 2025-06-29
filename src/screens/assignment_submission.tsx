import AssignmentSubmissionHooks from "../hooks/assignment_submission_hooks"

function AssignmentSubmission() {

    const { submissions } = AssignmentSubmissionHooks()

    return (
        <div className={``}>
            <table className="divide-y divide-gray-200">
                <thead className="text-gray-500 uppercase">
                    <tr>
                        <th scope="col" className="w-12 font-medium">No.</th>
                        <th scope="col" className="max-w-90 px-6 py-3 font-medium text-start">Student ID</th>
                        <th scope="col" className="w-90 px-6 py-3 font-medium">Score</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    { ...submissions.map((submission, index) => {
                        return (
                            <tr key={submission._id}>
                                <td className="py-3 text-center">{index + 1}</td>
                                <td className="px-6 py-3">{submission.userId}</td>
                                <td className="py-3 text-center">{submission.score}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AssignmentSubmission