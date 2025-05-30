interface Props {
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    optionsValue: string[]
    optionsLabel: string[]
    labelValue: string
    titleValue: string
    errMessage: string
}

function SelectField({handleSelectChange, optionsValue, optionsLabel, labelValue, titleValue, errMessage} : Props) {
    return (
        <div className={`w-full flex flex-col space-y-2`}>
            <div className={`font-semibold`}>{labelValue}</div>
            <select onChange={handleSelectChange} className={` pb-1 outline-none border-b-2 border-text`} title={titleValue}>
                {
                    ...optionsValue.map((value, index) => 
                        <option value={value}>{optionsLabel[index]}</option>
                    )
                }
            </select>
            <div className={`${errMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{errMessage}</div>
        </div>
    )
}

export default SelectField