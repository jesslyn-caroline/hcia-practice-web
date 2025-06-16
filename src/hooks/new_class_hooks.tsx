import { useContext, useState } from "react";
import { ErrorMessageContext } from "../provider/error_message_context";
import axios from "axios";
import toast_success from "../components/toast/toast_success";
import toast_error from "../components/toast/toast_error";

function NewClassHooks() {

    const { setAcademicYearErrMessage } = useContext(ErrorMessageContext)

    const [className, setClassName] = useState<string>("IF-A Sore")
    const handleClassName = (e: React.ChangeEvent<HTMLSelectElement>) => setClassName(e.target.value)

    const [startYear, setStartYear] = useState<string>("")
    const handleStartYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 4) return
        setStartYear(e.target.value)
    }

    const [endYear, setEndYear] = useState<string>("")
    const handleEndYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 4) return
        setEndYear(e.target.value)
    }

    function academicYearValidation ():boolean {
        if (startYear.length !== 4 || endYear.length !== 4) {
            setAcademicYearErrMessage("Please enter a valid academic year")
            return false
        }
        else if (startYear.toLowerCase() != startYear.toUpperCase() || endYear.toLowerCase() != endYear.toUpperCase()) {
            setAcademicYearErrMessage("Academic year must be a number")
            return false
        }
        else if (parseInt(startYear) > parseInt(endYear)) {
            setAcademicYearErrMessage("Start year must be less than end year")
            return false
        }
        return true
    }

    const [isOnLoadAddNewClass, setIsOnLoadAddNewClass] = useState<boolean>(false)

    async function addNewClass():Promise<void> {
        let valid:boolean = academicYearValidation()

        if (!valid) return 

        setIsOnLoadAddNewClass(true)

        try {
            const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/class", 
                {name: className, academicYear: `${startYear}-${endYear}`}
            )
            
            if (response.status === 201) {
                toast_success(response.data.message)
            }
        }
        catch (err: any) {
            toast_error(err.response.data.message)
        }

        setIsOnLoadAddNewClass(false)
    }

    return { className, handleClassName, startYear, handleStartYear, endYear, handleEndYear, addNewClass, isOnLoadAddNewClass }
}

export default NewClassHooks