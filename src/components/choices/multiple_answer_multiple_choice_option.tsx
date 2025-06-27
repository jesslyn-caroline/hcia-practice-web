
interface Props { options: string[] , id : number, isOptionsSelected: boolean[], handleIsOptionsSelectedChange: (index:number , e: React.ChangeEvent<HTMLInputElement>) => void }

function MultipleAnswerMultipleChoiceOption({options, id, isOptionsSelected, handleIsOptionsSelectedChange} : Props) {
    return options.map((choice, index) => (
        <div className={`flex flex-row space-x-4`}>
            <input type="checkbox" 
                id={`option-${index}`} 
                name={`option-${id}`}
                checked={isOptionsSelected[index]} 
                onChange={(e) => {handleIsOptionsSelectedChange(index, e)}} 
                className={`w-5`} /> 
            <label htmlFor={`option-${index}`} className={`w-full relative`}>
                {choice}
            </label>
        </div>
    ))
}

export default MultipleAnswerMultipleChoiceOption