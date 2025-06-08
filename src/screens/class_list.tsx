import { useContext } from "react"
import { ClassListContext } from "../provider/class_list_context"
import ClassCard from "../components/class_card"


function ClassList() {
    const {classList, viewClass} = useContext(ClassListContext)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-group-3-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Classes</h1>

            {
                ...classList.map((value) => { 
                    return (
                        <ClassCard name={value.name} academicYear={value.academicYear} classId={value._id} viewClass={viewClass}/>
                    )
                })
            }
        </div>
    )
}

export default ClassList