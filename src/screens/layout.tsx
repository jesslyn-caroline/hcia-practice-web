import { useState } from "react"
import { Link, Outlet } from "react-router"

function Layout() {
    const [isClosedSideBar, setIsClosedSideBar] = useState<boolean>(true)

    function toggleSideBar(event: string) {
        if (event === "close") setIsClosedSideBar(true)
        else setIsClosedSideBar(false)
    }

    return(
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] w-full h-full bg-background`}>
                {/* Overlay */}
                <div className={`${isClosedSideBar? "hidden" : ""} md:hidden absolute w-full h-full bg-black opacity-50 z-10`} />

                {/* Sidebar */}
                <div className={`${isClosedSideBar? "hidden" : ""} absolute bg-background z-20 min-w-xs w-1/4 h-full transition-all`}>
                    <div className={`h-14 px-9 flex items-center`}>
                        <i className={`text-2xl ri-menu-fold-line`} onClick={() => toggleSideBar("close")}/>
                    </div>
                    <div className={`px-6 py-2 flex flex-col space-y-2 `}>
                        <Link to="/" className={`flex flex-row items-center space-x-4 px-3 py-2 hover:font-semibold hover:bg-gray-100 rounded-md transition-all`}>
                            <i className={`font-normal text-2xl ri-home-5-line`} />
                            <span className={`text-md`}>Home</span>
                        </Link>
                        <Link to="/create-question" className={`flex flex-row items-center space-x-4 px-3 py-2 hover:font-semibold hover:bg-gray-100 rounded-md transition-all`}>
                            <i className={`font-normal text-2xl ri-survey-line`}/>
                            <span className={`text-sm`}>Create question</span>
                        </Link>
                    </div>
                </div>

                {/* Content */}
                <div className={`flex flex-row`}>
                    <div className={`${isClosedSideBar? "hidden" : "md:block"} hidden min-w-xs w-1/4`} />
                    <div className={`w-full`}>
                        <div className={`w-full h-14 px-10 bg-primary flex items-center`}>
                            <i className={`text-2xl text-white ri-menu-line`} onClick={() => toggleSideBar("open")}/>
                        </div>
                        <div className={`px-10 py-6`}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout