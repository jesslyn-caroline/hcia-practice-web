interface Props {
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    optionsValue: string[]
    optionsLabel: string[]
    labelValue: string
    titleValue: string
    errMessage: string
    value?: string
}

function SelectField({handleSelectChange, optionsValue, optionsLabel, labelValue, titleValue, errMessage, value} : Props) {
    return (
        <div className={`w-full flex flex-col space-y-2`}>
            <div className={`font-semibold`}>{labelValue}</div>
            <select value={value} onChange={handleSelectChange} className={`pb-1 outline-none border-b-2 border-accent-2`} title={titleValue}>
                {
                    ...optionsValue.map((value, index) => 
                        <option value={value}>{optionsLabel[index]}</option>
                    )
                }
            </select>
            <div className={`${errMessage === "" ? "hidden" : ""} text-xs text-red-500`}>{errMessage}</div>
        </div>
    )
}

export default SelectField