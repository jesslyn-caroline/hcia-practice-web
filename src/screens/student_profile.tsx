import StudentProfileHooks from "../hooks/student_profile_hooks"

function StudentProfile () {

    const {name, studentId} = StudentProfileHooks()
    console.log(studentId)

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-profile-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Student Profile</h1>
            {name} 
        </div>
    )
}

export default StudentProfile