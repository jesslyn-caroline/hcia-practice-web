interface Props {
    id : number,
    isOptionsSelected: boolean[],
    handleIsOptionsSelectedChange: (index:number , e: React.ChangeEvent<HTMLInputElement>) => void
}

function TrueOrFalseOption({id, isOptionsSelected, handleIsOptionsSelectedChange} : Props) {
    return (
        <div className={`flex flex-col space-y-6`}>
            <div className={`flex flex-row space-x-4`}>
                <input type="radio" 
                    id="option-1"
                    name={`options-${id}`} 
                    onChange={(e) => {handleIsOptionsSelectedChange(0, e)}} 
                    className={`w-5`} 
                    checked={isOptionsSelected[0]}
                /> 
                <label htmlFor="option-1" className={`w-full`}>
                    <span className={`text-sm`}>True</span>
                </label>
            </div>
            <div className={`flex flex-row space-x-4`}>
                <input type="radio" 
                    id="option-2" 
                    name={`options-${id}`} 
                    onChange={(e) => {handleIsOptionsSelectedChange(1, e)}} 
                    className={`w-5`} 
                    checked={isOptionsSelected[1]}
                /> 
                <label htmlFor="option-2" className={`w-full`}>
                    <span className={`text-sm`}>False</span>
                </label>
            </div>
        </div>
    )
}

export default TrueOrFalseOption