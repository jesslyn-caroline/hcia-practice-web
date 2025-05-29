import { createContext, useState } from "react";

export const ErrorMessageContext = createContext({
    userIdErrMessage: "", 
    usernameErrMessage: "", 
    passwordErrMessage: "", 
    confirmPasswordErrMessage: "", 
    studentClassErrMessage: "",

    setUserIdErrMessage: (message: string) => { console.log(message) },
    setUsernameErrMessage: (message: string) => { console.log(message) },
    setPasswordErrMessage: (message: string) => { console.log(message) },
    setConfirmPasswordErrMessage: (message: string) => { console.log(message) },
    setStudentClassErrMessage: (message: string) => { console.log(message) },

    resetErrMessage: () => { console.log("reset") }
})

function ErrorMessageProvider({children} : {children: React.ReactNode}) {
    
    // === login and signup ===
    const [userIdErrMessage, setUserIdErrMessage] = useState<string>("")
    const [usernameErrMessage, setUsernameErrMessage] = useState<string>("")
    const [passwordErrMessage, setPasswordErrMessage] = useState<string>("")

    const [confirmPasswordErrMessage, setConfirmPasswordErrMessage] = useState<string>("")
    const [studentClassErrMessage, setStudentClassErrMessage] = useState<string>("")

    // =======================

    // === create question ===

    // =======================

    function resetErrMessage () {
        setUserIdErrMessage("")
        setUsernameErrMessage("")
        setPasswordErrMessage("")
        setConfirmPasswordErrMessage("")
        setStudentClassErrMessage("")
    }

    return (
        <ErrorMessageContext.Provider 
            value={{
                userIdErrMessage, 
                usernameErrMessage, 
                passwordErrMessage, 
                confirmPasswordErrMessage, 
                studentClassErrMessage, 
                setUserIdErrMessage, 
                setUsernameErrMessage, 
                setPasswordErrMessage, 
                setConfirmPasswordErrMessage, 
                setStudentClassErrMessage,
                resetErrMessage
            }}>
            { children }
        </ErrorMessageContext.Provider>
    )
}

export default ErrorMessageProvider