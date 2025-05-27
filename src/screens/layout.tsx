import { Link, Outlet } from "react-router"

function Layout() {
    return(
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] max-h-[1040px] w-full h-screen bg-background flex flex-row`}>
                {/* Left SideBar */}
                <div className={`w-1/4 h-full border-r-1 border-greyist`}>
                    <div className={`w-full min-h-14 h-14 px-6 flex items-center`}>
                        <h1 className={`text-xl text-primary font-semibold`}>HCIA Practice</h1>
                    </div>
                    <div className={`pl-6 flex flex-col py-2`}>
                        <div className={`border-l-2 border-greyist hover:border-primary transition-all`}>
                            <Link to="/" className={`w-full px-6 py-1 flex items-center hover:font-semibold transition-all`}>Home</Link>
                        </div>
                        <div className={`border-l-2 border-greyist hover:border-primary transition-all`}>
                            <Link to="/home" className={`w-full px-6 py-1 flex items-center hover:font-semibold transition-all`}>Home</Link>
                        </div>
                        <div className={`border-l-2 border-greyist hover:border-primary transition-all`}>
                            <Link to="/home" className={`w-full px-6 py-1 flex items-center hover:font-semibold transition-all`}>Home</Link>
                        </div>
                        <div className={`border-l-2 border-greyist hover:border-primary transition-all`}>
                            <Link to="/home" className={`w-full px-6 py-1 flex items-center hover:font-semibold transition-all`}>Home</Link>
                        </div>
                    </div>
                </div>

                <div className={`w-full`}>
                    <div className={`w-full min-h-14 h-14 px-6 bg-accent border-b-1 border-greyist flex items-center`}>
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