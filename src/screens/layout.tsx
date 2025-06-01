import { useContext, useState } from "react"
import { Link, Outlet } from "react-router"
import { UserContext } from "../provider/user_context"

function Layout() {

    const { userRoutes, currentActiveRoute, setCurrentActiveRoute} = useContext(UserContext)

    const [isOpenedSideBar, setIsOpenedSideBar] = useState<boolean>(false)

    function toggleSideBar(event: string) {
        if (event === "close") setIsOpenedSideBar(false)
        else setIsOpenedSideBar(true)
    }

    function changeRoute(route: string) {
        setCurrentActiveRoute(route)
        sessionStorage.setItem("currentActiveRoute", route)

        toggleSideBar("close")
    }

    return(
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] w-full h-screen bg-background`}>
                {/* Overlay */}
                <div className={`${isOpenedSideBar? "" : "hidden"} md:hidden absolute w-full h-full bg-black opacity-50 z-10 transition-all`} />

                {/* SideBar */}
                <div className={`${isOpenedSideBar? "translate-x-0" : "-translate-x-full"} z-20 absolute left-0 w-2xs h-full bg-background ease-in-out duration-200 border-r-1 border-accent-2`}>
                    <div className={`h-14 px-7 md:px-9 flex items-center`}>
                        <i className={`text-2xl ri-menu-fold-line cursor-pointer`} onClick={() => toggleSideBar("close")}/>
                    </div>
                    <div className={`px-4 md:px-6 py-2 flex flex-col space-y-3 `}>
                        { 
                            ...userRoutes.map((route) => {
                                 return (
                                <Link to={route.link} className={`flex flex-row items-center space-x-4 px-3 py-2 ${currentActiveRoute === route.link? "bg-gray-100 font-semibold" : ""} hover:bg-gray-100 rounded-md transition-colors`} onClick={() => changeRoute(route.link)}>
                                    <i className={`font-normal text-2xl ${route.icon}`}/>
                                    <span className={`text-sm`}>{route.name}</span>
                                </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Content */}
                <div className={`w-full flex flex-row`}>
                    <div className={`hidden ${isOpenedSideBar? "md:block" : "hidden"} min-w-2xs w-2xs transition-discrete`} />
                    <div className={`w-full h-full flex flex-col`}>
                        <div className={`h-14 px-4 md:px-10 bg-primary flex items-center`}>
                            <i className={`${isOpenedSideBar? "opacity-0" : "opacity-100"} text-2xl text-white ri-menu-line cursor-pointer`} onClick={() => toggleSideBar("open")}/>
                        </div>
                        <div className={`px-4 md:px-10 py-6`}>
                           <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout