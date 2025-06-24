import axios from "axios";
import { createContext, useState } from "react";

export const OnQuizContext = createContext({
    isOnLoadQuestion: false,

    loadQuestion: (questionCount: number) => { console.log(questionCount) }
})

function OnQuizProvider({children} : {children: React.ReactNode}) {

    const [isOnLoadQuestion, setIsOnLoadQuestion] = useState(false)

    async function loadQuestion (questionCount: number):Promise<void> {
        setIsOnLoadQuestion(true)

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/quiz", {
                title: "",
                questionCount
            })

            if (response.status === 200) {
                console.log(response.data)
            }
        } 
        catch (err: any) {
            console.log(err)
        }

        setIsOnLoadQuestion(false)
    }

    return (
        <OnQuizContext.Provider value={{isOnLoadQuestion, loadQuestion}}>
            {children}
        </OnQuizContext.Provider>
    )
}

export default OnQuizProvider