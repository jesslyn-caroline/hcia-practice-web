import { Outlet } from 'react-router'

function LoginSignupLayout() {
    return(
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] max-h-[1040px] h-full w-full bg-background flex flex-col`}>
                
                {/* Header */}
                <div className={`w-full min-h-14 h-14 bg-accent border-b-1 border-greyist px-10 lg:px-20 flex items-center`}>
                    <h1 className={`text-xl text-primary font-semibold`}>HCIA Practice</h1>
                </div>

                <div className={`w-full h-full px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 lg:space-x-20`}>
                    <Outlet />
                    <div className={`hidden lg:block pt-12`}>
                        <img src="/images/data-extraction-pana.png" alt="" className={`w-md`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignupLayout