import ClassViewHooks from "../provider/class_view_context"

function ClassView () {

    const { members } = ClassViewHooks()

    return (
        <div className={``}>
            <table className="divide-y divide-gray-200">
                <thead className="text-gray-500 uppercase">
                    <tr>
                        <th scope="col" className="w-12 font-medium">No.</th>
                        <th scope="col" className="max-w-90 px-6 py-3 font-medium text-start">Student ID</th>
                        <th scope="col" className="w-90 px-6 py-3 font-medium">Name</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    { ...members.map((member, index) => {
                        return (
                            <tr key={member.userId}>
                                <td className="py-3 text-center">{index + 1}</td>
                                <td className="px-6 py-3">{member.userId}</td>
                                <td className="py-3 text-center">{member.username}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ClassView