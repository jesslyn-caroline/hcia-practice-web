interface Props {
    name: string
    academicYear: string
    classId: string
    viewClass: (classId: string) => void
}

function ClassCard({name, academicYear, classId, viewClass} :Props) {
    return (
        <div className={`w-fit px-5 py-3 rounded-lg border border-accent-2 flex flex-col space-y-2 cursor-pointer`} onClick={() => viewClass(classId)}>
            <div className={`flex flex-row justify-between`}>
                <div className={`w-10 h-10 text-2xl opacity-50 flex justify-center items-center bg-accent-2 rounded-md`}>
                    {name[3]}
                </div>
                <div className={`relative`}>
                    <i className={`text-lg ri-more-2-line`}/>
                    {/* <div className={`absolute px-2 py-1 bg-gray-100 rounded-md flex flex-row space-x-2 items-center origin-top-right top-0 right-7`}>
                        <i className={`text-xl ri-search-eye-line `}/>
                        <span className={``}>Hide</span>
                    </div> */}
                </div>
            </div>
            <div className={`flex flex-col`}>
                <h2 className={`text-lg font-medium`}>{name} {academicYear}</h2>
                <h3 className={`text-gray-400`}>
                    <span>Members: 40</span>
                </h3>
                <h3 className={` text-gray-400`}>Class ID: {classId}</h3>
            </div>
        </div>
    )
}

export default ClassCard