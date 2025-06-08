import { createContext } from "react";

export const ClassListContext = createContext({
    
})


function ClassListProvider({children} : {children : React.ReactNode}) {

    return (
        <ClassListContext.Provider value={``}>
            {children}
        </ClassListContext.Provider>
    )
}

export default ClassListProvider