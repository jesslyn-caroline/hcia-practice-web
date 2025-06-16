import { useContext } from "react"
import { ClassListContext } from "../provider/class_list_context"
import ClassCard from "../components/class_card"
import ActionButton from "../components/action_button"


function ClassList() {
    const {classList, viewClass, newClass} = useContext(ClassListContext)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-group-3-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-6`}>Classes</h1>
            <div className={`mb-4`}>
                <ActionButton action={newClass} text="New Class" icon="ri-add-line" />
            </div>
            <div className={`flex flex-wrap space-x-4`}>
            {
                ...classList.map((value) => { 
                    return (
                        <ClassCard name={value.name} academicYear={value.academicYear} classId={value._id} viewClass={viewClass}/>
                    )
                })
            }
            </div>

            
        </div>
    )
}

export default ClassList