import { useContext, useEffect, useState } from "react";
import { UserContext } from "../provider/user_context";
import { ErrorMessageContext } from "../provider/error_message_context";
import toast_error from "../components/toast/toast_error";
import axios from "axios";
import toast_success from "../components/toast/toast_success";

function ClassEnterHooks() {

    const { user, currentActiveRoute } = useContext(UserContext)
    const { setClassCodeErrMessage } = useContext(ErrorMessageContext)

    const [isOnLoadClassEnter, setIsOnLoadClassEnter] = useState<boolean>(false);

    const [classCode, setClassCode] = useState<string>('');
    const handleClassCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setClassCode(e.target.value);

    async function enterClass():Promise<void> {
        if (classCode == "") {
            setClassCodeErrMessage("Please enter class code")
            return
        }

        setIsOnLoadClassEnter(true)

        try {
            const response = await axios.put("https://huawei-practice-web-backend.vercel.app/api/user/join-class", 
                {classId: classCode, userId: user.userId}
            )

            sessionStorage.setItem("user", JSON.stringify({...user, classId: classCode}))

            if (response.status === 200) {
                toast_success(response.data.message)
                window.location.reload()
            }
        }
        catch (err:any) {
            toast_error(err.response.data.message)
        }
        
        setIsOnLoadClassEnter(false)
    }

    useEffect(() => {
        setClassCode("")
    }, [currentActiveRoute])

    return {classCode, handleClassCodeChange, enterClass, isOnLoadClassEnter};
}

export default ClassEnterHooks