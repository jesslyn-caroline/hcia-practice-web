import { createContext, useState } from "react";

export const ErrorMessageContext = createContext({
    userIdErrMessage: "", 
    usernameErrMessage: "", 
    passwordErrMessage: "", 
    confirmPasswordErrMessage: "", 
    studentClassErrMessage: "",

    questionErrMessage: "", 
    yearErrMessage: "", 
    scoreErrMessage: "", 
    optionsErrMessage: ["", "", "", ""], 
    noAnswerErrMessage: "",

    setUserIdErrMessage: (message: string) => { console.log(message) },
    setUsernameErrMessage: (message: string) => { console.log(message) },
    setPasswordErrMessage: (message: string) => { console.log(message) },
    setConfirmPasswordErrMessage: (message: string) => { console.log(message) },
    setStudentClassErrMessage: (message: string) => { console.log(message) },

    setQuestionErrMessage: (message: string) => { console.log(message) },
    setYearErrMessage: (message: string) => { console.log(message) },
    setScoreErrMessage: (message: string) => { console.log(message) },
    setOptionsErrMessage: (message: string[]) => { console.log(message) },
    setNoAnswerErrMessage: (message: string) => { console.log(message) },

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
    const [questionErrMessage, setQuestionErrMessage] = useState<string>("")
    const [yearErrMessage, setYearErrMessage] = useState<string>("")
    const [scoreErrMessage, setScoreErrMessage] = useState<string>("")
    const [optionsErrMessage, setOptionsErrMessage] = useState<string[]>(["", "", "", ""])
    const [noAnswerErrMessage, setNoAnswerErrMessage] = useState<string>("")

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

                questionErrMessage, 
                yearErrMessage, 
                scoreErrMessage, 
                optionsErrMessage, 
                noAnswerErrMessage, 
                setUserIdErrMessage, 
                setUsernameErrMessage, 
                setPasswordErrMessage, 
                setConfirmPasswordErrMessage, 
                setStudentClassErrMessage,
                setQuestionErrMessage,
                setYearErrMessage,
                setScoreErrMessage,
                setOptionsErrMessage,
                setNoAnswerErrMessage,
                resetErrMessage
            }}>
            { children }
        </ErrorMessageContext.Provider>
    )
}

export default ErrorMessageProvider