import { Link, Outlet } from "react-router"

function Layout() {
    return(
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] w-full h-full bg-background flex flex-row`}>
                {/* Left SideBar */}
                <div className={`w-1/4 border-r-1 border-greyist`}>
                    <div className={`w-full min-h-14 h-14 px-6 flex items-center`}>
                        <h1 className={`text-xl text-primary font-semibold`}>HCIA Practice</h1>
                    </div>
                    <div className={`px-6 flex flex-col py-2 space-y-2 `}>
                        <Link to="/" className={`flex flex-row items-center space-x-4 px-3 py-2 hover:font-semibold hover:bg-gray-100 rounded-md transition-all`}>
                            <i className={`font-normal text-xl ri-home-5-line`} />
                            <span className={`text-md`}>Home</span>
                        </Link>
                        <Link to="/create-question" className={`flex flex-row items-center space-x-4 px-3 py-2 hover:font-semibold hover:bg-gray-100 rounded-md transition-all`}>
                            <i className={`font-normal text-xl ri-survey-line`}/>
                            <span className={`text-md`}>Create question</span>
                        </Link>
                    </div>
                </div>

                <div className={`min-h-screen w-full h-full`}>
                    <div className={`w-full min-h-14 h-14 px-6 bg-primary border-b-1 border-greyist flex items-center`}>
                    </div>
                    <div className={`px-10 py-6`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout