import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { UserModel } from "../model/user_model";
import axios from "axios";
import toast_error from "../components/toast/toast_error";
import { UserContext } from "./user_context";


export const ClassViewContext = createContext({
    id : "",
    members : [{userId: "", username: "", classId: "", role: ""}],
    viewProfile : (studentId:string) => {console.log(studentId)}
})

function ClassViewProvider ({children} : {children : React.ReactNode}) {

    const { id } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [members, setMembers] = useState<UserModel[]>([])
    useEffect(() => { getMembers() }, [])

    async function getMembers():Promise<void> {
        let classId:string = (id === undefined ? user.classId : id)
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/user?classId=${classId}`)

            if (response.status === 200) {
                setMembers(response.data)
            }
        }
        catch (err: any) {
            toast_error(err.response.data.message)
        }
    }

    function viewProfile(studentId:string) {
        navigate(`/profile/${studentId}`)
    }

    return (
        <ClassViewContext.Provider value={{id : (id === undefined ? "" : id), members, viewProfile}}>
            {children}
        </ClassViewContext.Provider>
    )
}

export default ClassViewProvider