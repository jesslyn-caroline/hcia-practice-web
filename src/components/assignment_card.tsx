interface Props {
    title: string,
    type: string,
    time: number,
    questionCount: number
}


function AssignmentCard({title, type, time, questionCount} : Props) {
    
    return (
        <div className={`w-full h-fit bg-gray-100 rounded-lg px-8 py-5 space-y-2`}>
            <h1 className={`text-md font-semibold`}>{title}</h1>
            <div className={`text-gray-500`}>
                <h2>
                    <span className={`font-medium`}>Quiz Type: </span>
                    <span className={`capitalize`}>{type}</span>
                </h2>
                <h2>{questionCount} questions</h2>
                <h2>{type === "regular"? `${time} minutes` : `${time} seconds per question`}</h2>
            </div>
            
        </div>
    )
}

export default AssignmentCard