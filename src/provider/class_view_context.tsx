import { createContext } from "react";
import { useParams } from "react-router";


export const ClassViewContext = createContext({
    id : ""
})

function ClassViewProvider ({children} : {children : React.ReactNode}) {

    const { id } = useParams()

    // const [members, setMembers] = useState<string>()

    return (
        <ClassViewContext.Provider value={{id : (id === undefined ? "" : id)}}>
            {children}
        </ClassViewContext.Provider>
    )
}

export default ClassViewProvider