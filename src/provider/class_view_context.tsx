import { createContext } from "react";
import { useParams } from "react-router";
import type { UserModel } from "../model/user_model";
import axios from "axios";
import toast_error from "../components/toast/toast_error";


export const ClassViewContext = createContext({
    id : "",
    members : [{userId: "", username: "", classId: "", role: ""}]
})

async function ClassViewProvider ({children} : {children : React.ReactNode}) {

    const { id } = useParams()

    const members:UserModel[] = await getMembers()

    
    async function getMembers():Promise<UserModel[]> {
        try {
            const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/user?classId=${id}`)

            if (response.status === 200) {
                return response.data
            }
        }
        catch (err: any) {
            toast_error(err.response.data.message)
        }
        return []
    }

    return (
        <ClassViewContext.Provider value={{id : (id === undefined ? "" : id), members}}>
            {children}
        </ClassViewContext.Provider>
    )
}

export default ClassViewProvider