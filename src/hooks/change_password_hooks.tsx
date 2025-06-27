import { useState } from "react"
import { useParams } from "react-router"

function ChangePasswordHooks() {

    const studentId = useParams()

    const [password, setPassword] = useState<string>("")
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)

    function changePassword() {
        alert(password)
        alert(studentId)
    }

    return { password, handlePasswordChange, changePassword }
}

export default ChangePasswordHooks