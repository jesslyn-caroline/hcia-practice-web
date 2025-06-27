import { useContext } from "react"
import { ClassViewContext } from "../provider/class_view_context"


function ClassView () {

    const { members, viewProfile } = useContext(ClassViewContext)

    return (
        <div className={``}>
            <table className="divide-y divide-gray-200">
                <thead className="text-gray-500 uppercase">
                    <tr>
                        <th scope="col" className="w-12 font-medium">No.</th>
                        <th scope="col" className="max-w-90 px-6 py-3 font-medium text-start">Student ID</th>
                        <th scope="col" className="w-90 px-6 py-3 font-medium">Name</th>
                        <th scope="col" className="px-6 py-3 font-medium"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    { ...members.map((member, index) => {
                        return (
                            <tr key={member.userId}>
                                <td className="py-3 text-center">{index + 1}</td>
                                <td className="px-6 py-3">{member.userId}</td>
                                <td className="py-3 text-center">{member.username}</td>
                                <td className="py-3 text-center"><span className={`cursor-pointer font-medium text-gray-600`} onClick={() => viewProfile(member.userId)}>VIEW</span></td>
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