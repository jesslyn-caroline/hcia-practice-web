interface Props {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputType: string
    errMessage?: string
    placeholderValue: string
    idValue: string
    labelValue?: string
    value: string | number
}

function InputField({handleInputChange, inputType, errMessage, placeholderValue, idValue, labelValue, value} : Props) {
    return (
        <div className={`relative`}>
            <label className={`font-medium`}>{labelValue}</label>
            <input type={inputType} 
                onChange={handleInputChange} 
                className={`w-full h-9 outline-none border-b-2 border-accent-2`} 
                id={idValue}
                placeholder={placeholderValue} 
                value={value} 
                autoComplete="off"/>
            <div className={`${errMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{errMessage}</div>
        </div>
    )
}

export default InputField

// == Usage ==
// <InputField handleInputChange={() => {}} 
//     inputType=""
//     errMessage={} 
//     placeholderValue={} 
//     idValue={} 
//     labelValue={}
//     value={} /> 