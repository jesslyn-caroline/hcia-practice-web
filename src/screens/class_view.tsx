import { useContext } from "react"
import { ClassViewContext } from "../provider/class_view_context"


function ClassView () {

    const { id } = useContext(ClassViewContext)

    return (
        <>
            {id}
        </>
    )
}

export default ClassView